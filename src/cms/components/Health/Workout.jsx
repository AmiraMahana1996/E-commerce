import { Dropdown, MenuButton } from "@mui/joy";
import React from "react";

export default function Workout() {
  const [open, setOpen] = React.useState({ status: false, levelid: "" });
  return (
    <>
      <Dropdown
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          mt: 2,
        }}
      >
        <MenuButton
          variant="solid"
          color="primary"
          onClick={() => setOpen({ status: true })}
        >
          Add Content
        </MenuButton>
      </Dropdown>
      <br />
    </>
  );
}
