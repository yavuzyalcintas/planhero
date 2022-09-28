/* eslint-disable no-unused-vars */
import React from "react";

import fullLogo from "../../assets/logo-full.svg";
import mascotLogo from "../../assets/logo-mascot.svg";
import textLogo from "../../assets/logo-text.svg";

type LogoProps = {
  type: LogoType;
  size: LogoSize;
};

export enum LogoType {
  Full = "full",
  Mascot = "mascot",
  Text = "text",
}

export enum LogoSize {
  XSmall = 80,
  Small = 110,
  Medium = 280,
  Large = 500,
}

const Logo: React.FC<LogoProps> = ({ type, size }) => {
  let logo = null;

  if (type) {
    switch (type) {
      case LogoType.Full: {
        logo = fullLogo;
        break;
      }
      case LogoType.Mascot: {
        logo = mascotLogo;
        break;
      }
      case LogoType.Text: {
        logo = textLogo;
        break;
      }
      default: {
        logo = mascotLogo;
        break;
      }
    }
  }
  return (
    <>{logo && <img src={logo} alt="PlanHero Logo" style={{ height: size, width: size }} />}</>
  );
};

export default Logo;
