create table "public"."profiles" (
    "id" uuid not null,
    "updated_at" timestamp with time zone,
    "username" text,
    "avatar_url" text,
    "website" text,
    "full_name" text not null
);


create table "public"."scrum_poker_session" (
    "id" uuid not null default uuid_generate_v4(),
    "created_by" uuid not null,
    "created_at" timestamp with time zone default now(),
    "name" text not null
);


create table "public"."scrum_poker_session_users" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "session_id" uuid not null,
    "user_id" uuid not null,
    "vote" text default '0'::text,
    "is_voted" boolean default false,
    "user_full_name" text not null
);


CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX scrum_poker_session_pkey ON public.scrum_poker_session USING btree (id);

CREATE UNIQUE INDEX scrum_poker_session_users_pkey ON public.scrum_poker_session_users USING btree (user_id, session_id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."scrum_poker_session" add constraint "scrum_poker_session_pkey" PRIMARY KEY using index "scrum_poker_session_pkey";

alter table "public"."scrum_poker_session_users" add constraint "scrum_poker_session_users_pkey" PRIMARY KEY using index "scrum_poker_session_users_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";

alter table "public"."scrum_poker_session" add constraint "scrum_poker_session_created_by_fkey" FOREIGN KEY (created_by) REFERENCES profiles(id) not valid;

alter table "public"."scrum_poker_session" validate constraint "scrum_poker_session_created_by_fkey";

alter table "public"."scrum_poker_session_users" add constraint "scrum_poker_session_users_session_id_fkey" FOREIGN KEY (session_id) REFERENCES scrum_poker_session(id) not valid;       

alter table "public"."scrum_poker_session_users" validate constraint "scrum_poker_session_users_session_id_fkey";

alter table "public"."scrum_poker_session_users" add constraint "scrum_poker_session_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."scrum_poker_session_users" validate constraint "scrum_poker_session_users_user_id_fkey";

create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));