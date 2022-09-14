import React from "react";
import { Anchor, Breadcrumbs, Text } from "@mantine/core";

type Breadcrumb = {
  href?: string;
  title: string;
};

type IPageHeaderProps = {
  text: string;
  breadcrumbItems?: Breadcrumb[];
};

const PageHeader: React.FC<IPageHeaderProps> = ({ text, breadcrumbItems }) => (
  <>
    <h1>
      <Text component="span" variant="gradient" gradient={{ from: "yellow", to: "cyan" }} inherit>
        {text}
      </Text>
    </h1>
    <hr color="gray" />

    {breadcrumbItems && (
      <Breadcrumbs mb={35}>
        {breadcrumbItems?.map((item, idx) => {
          return (
            <Anchor color="cyan" href={item.href} key={idx}>
              {idx == breadcrumbItems?.length - 1 ? <b>{item.title}</b> : <>{item.title}</>}
            </Anchor>
          );
        })}
      </Breadcrumbs>
    )}
  </>
);

export default PageHeader;
