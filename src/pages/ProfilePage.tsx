import { Center, Container, Stack, Text } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import { Profiles, ProfilesTable } from "../models/supabaseEntities";
import { supabase } from "../utilities/supabase";

const ProfilePage: React.FC = () => {
  const { userID } = useParams();
  const [profile, setProfile] = useState<Profiles | null>(null);

  const getProfile = async () => {
    const profile = await supabase.from(ProfilesTable).select("*").eq("id", userID!).single();

    setProfile(profile.data as Profiles);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <PageHeader
        text="Profile"
        breadcrumbItems={[{ href: "/", title: "Home" }, { title: "Profile" }]}
      />
      <Container>
        <Stack>
          <Center>
            <IconUserCircle size={300} />
          </Center>
          <Text>
            <b>Full Name:</b> {profile?.full_name}
          </Text>
        </Stack>
      </Container>
    </>
  );
};

export default ProfilePage;
