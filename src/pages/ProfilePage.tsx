import { Container, Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import { Profiles, ProfilesTable } from "../models/supabaseEntities";
import { supabase } from "../utilities/supabase";

const ProfilePage: React.FC = () => {
  const { userID } = useParams();
  const [profile, setProfile] = useState<Profiles | null>(null);

  const getProfile = async () => {
    const profile = await supabase
      .from<Profiles>(ProfilesTable)
      .select("*")
      .eq("id", userID!)
      .single();

    setProfile(profile.data);
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
          <Text>
            <b>Full Name:</b> {profile?.full_name}
          </Text>
        </Stack>
      </Container>
    </>
  );
};

export default ProfilePage;
