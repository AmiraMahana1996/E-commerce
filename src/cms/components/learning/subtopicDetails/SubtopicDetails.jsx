import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Typography,
  Card,
  Dropdown,
  MenuButton,
} from "@mui/joy";
import { Home, Person, Settings } from "@mui/icons-material";
import React from "react";
import Explaination from "../explanation/Explaination";
import Implementation from "../implementation/Implementation";
import Steps from "../steps/Steps";

export default function SubtopicDetails() {
  const [open, setOpen] = React.useState({ status: false, levelid: "" });
  const [iconTab, setIconTab] = React.useState(0);

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
          Add Explaination
        </MenuButton>
      </Dropdown>

      <br />
      <br />

      <Card className="p-4">
        <Typography className="mb-2 font-semibold">Lesson</Typography>
        <Tabs
          value={iconTab}
          onChange={(event, value) => setIconTab(value)}
          className="bg-white"
        >
          <TabList>
            <Tab>
              <Home className="mr-2 h-4 w-4" />
              Explaination
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Implementation
            </Tab>
            <Tab>
              <Person className="mr-2 h-4 w-4" />
              Steps
            </Tab>
           
          </TabList>
          <TabPanel value={0}>
            <div className="p-4">
              <Typography>
                <Explaination />
              </Typography>
            </div>
          </TabPanel>
          <TabPanel value={1}>
            <div className="p-4">
              <Typography>
                <Implementation />
              </Typography>
            </div>
          </TabPanel>
          <TabPanel value={2}>
            <div className="p-4">
              <Typography>
                <Steps />
              </Typography>
            </div>
          </TabPanel>
        
        </Tabs>
      </Card>
    </>
  );
}
