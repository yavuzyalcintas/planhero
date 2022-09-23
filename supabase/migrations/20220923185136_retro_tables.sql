create table "public"."retro_session" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "is_completed" boolean not null default false,
    "created_by" uuid not null,
    "created_at" timestamp with time zone default now()
);


create table "public"."retro_session_actions" (
    "id" uuid not null default uuid_generate_v4(),
    "session_id" uuid not null,
    "user_id" uuid not null,
    "message" text not null,
    "is_completed" boolean default false,
    "created_at" timestamp with time zone default now()
);


create table "public"."retro_session_messages" (
    "id" uuid not null default uuid_generate_v4(),
    "user_id" uuid not null,
    "type" text not null,
    "message" text not null,
    "like_count" bigint default '0'::bigint,
    "created_at" timestamp with time zone default now(),
    "session_id" uuid not null
);


CREATE UNIQUE INDEX retro_session_actions_pkey ON public.retro_session_actions USING btree (id);

CREATE UNIQUE INDEX retro_session_messages_pkey ON public.retro_session_messages USING btree (id);

CREATE UNIQUE INDEX retro_session_pkey ON public.retro_session USING btree (id);

alter table "public"."retro_session" add constraint "retro_session_pkey" PRIMARY KEY using index "retro_session_pkey";

alter table "public"."retro_session_actions" add constraint "retro_session_actions_pkey" PRIMARY KEY using index "retro_session_actions_pkey";

alter table "public"."retro_session_messages" add constraint "retro_session_messages_pkey" PRIMARY KEY using index "retro_session_messages_pkey";

alter table "public"."retro_session" add constraint "retro_session_created_by_fkey" FOREIGN KEY (created_by) REFERENCES profiles(id) not valid;

alter table "public"."retro_session" validate constraint "retro_session_created_by_fkey";

alter table "public"."retro_session_actions" add constraint "retro_session_actions_session_id_fkey" FOREIGN KEY (session_id) REFERENCES retro_session(id) not valid;

alter table "public"."retro_session_actions" validate constraint "retro_session_actions_session_id_fkey";

alter table "public"."retro_session_actions" add constraint "retro_session_actions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."retro_session_actions" validate constraint "retro_session_actions_user_id_fkey";

alter table "public"."retro_session_messages" add constraint "retro_session_messages_session_id_fkey" FOREIGN KEY (session_id) REFERENCES retro_session(id) not valid;

alter table "public"."retro_session_messages" validate constraint "retro_session_messages_session_id_fkey";

alter table "public"."retro_session_messages" add constraint "retro_session_messages_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."retro_session_messages" validate constraint "retro_session_messages_user_id_fkey";