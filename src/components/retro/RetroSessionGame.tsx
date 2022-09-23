import React from "react";

interface RetroSessionGameProps {
  sessionID: string;
}

const RetroSessionGame: React.FC<RetroSessionGameProps> = ({ sessionID }) => {
  return (
    <>
      <h1>{sessionID}</h1>
    </>
  );
};

export default RetroSessionGame;
