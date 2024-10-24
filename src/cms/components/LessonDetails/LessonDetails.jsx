import React from 'react'
import { Tabs, TabList, Tab, TabPanel, Typography, Card } from '@mui/joy';
import { Home, Person, Settings } from '@mui/icons-material';
import WordsCom from '../WordsCom/WordsCom';
import { useLocation } from 'react-router-dom';
export default function LessonDetails() {
    const [iconTab, setIconTab] = React.useState(0);
    const location = useLocation();

    const lessonid = location.pathname.split("/").pop();
    const levelidd = location.pathname.split("/");



console.log(lessonid,"pathId",levelidd[3])
  return (
    <>
    <br/>
    <br/>

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
              Words
            </Tab>
            <Tab>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Tab>
            <Tab>
              <Person className="mr-2 h-4 w-4" />
              Profile
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <div className="p-4">
              <Typography>
                <WordsCom lessonid={lessonid} levelidd={levelidd[3]}/>
              </Typography>
            </div>
          </TabPanel>
          <TabPanel value={1}>
            <div className="p-4">
              <Typography>Settings content goes here</Typography>
            </div>
          </TabPanel>
          <TabPanel value={2}>
            <div className="p-4">
              <Typography>Profile content goes here</Typography>
            </div>
          </TabPanel>
        </Tabs>
      </Card>
    </>
  )
}
