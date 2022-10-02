import { Container } from "@mantine/core";
import React from "react";

import { ReactComponent as TermsMD } from "../../docs/terms.md";

const TermsPage: React.FC = () => {
  return (
    <Container>
      <TermsMD />
    </Container>
  );
};

export default TermsPage;
