import { Container } from "@mantine/core";
import React from "react";

import { ReactComponent as PrivacyMD } from "../../docs/privacy.md";

const PrivacyPage: React.FC = () => {
  return (
    <Container>
      <PrivacyMD />
    </Container>
  );
};

export default PrivacyPage;
