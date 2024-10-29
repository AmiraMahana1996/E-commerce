import { Home, Settings } from "@mui/icons-material";
import { Card, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import React from "react";
import Linkedin from "../Social/Linkedin/Linkedin";
import MarketingPlan from "../Social/marketingplan/marketingplan/MarketingPlan";

export default function Marketing() {
  const [iconTab, setIconTab] = React.useState(0);

  return (
    <>
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
              Linkedin
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Facebook
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Tiktok
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Instgram
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Youtube
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Marketing Plan
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <div className="p-4">
              <Typography>
                <Linkedin />
              </Typography>
            </div>
          </TabPanel>
          <TabPanel value={1}>
            <div className="p-4">
              <Typography>00</Typography>
            </div>
          </TabPanel>
          <TabPanel value={2}>
            <div className="p-4">
              <Typography>ss</Typography>
            </div>
          </TabPanel>
          <TabPanel value={3}>
            <div className="p-4">
              <Typography>ss</Typography>
            </div>
          </TabPanel>
          <TabPanel value={4}>
            <div className="p-4">
              <Typography>ss</Typography>
            </div>
          </TabPanel>
          <TabPanel value={5}>
            <div className="p-4">
              <Typography>
<MarketingPlan/>

              </Typography>
            </div>
          </TabPanel>
        </Tabs>
      </Card>
    </>
  );
}
