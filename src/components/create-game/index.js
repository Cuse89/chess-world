import React from "react";
import SelectGameType from "components/select-game-type";

const CreateGame = ({ onSubmit, useCompact }) => {
  return (
    <div>
      <SelectGameType onSubmit={onSubmit} useSwiper={!useCompact} />
      other settings go here
    </div>
  );
};

export default CreateGame;
