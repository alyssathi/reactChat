//taken from material UI tabs panel

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box, Tabs, Tab, Typography } from "@material-ui/core";
import { Contacts } from "./contacts";
import { Conversations } from "./conversations";

const useStyles = makeStyles({
  tabsContainer: {
    position: "fixed",
    width: "320px",
    borderRight: "1px lightgray solid",
    height: "100%",
  },
});

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function SimpleTabs({
  handleConversation,
  filteredConversations,
  contacts,
}) {
  const [value, setValue] = React.useState(0);
  const css = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={css.tabsContainer}>
      <Paper position="static">
        <Tabs
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Conversations" {...a11yProps(0)} />
          <Tab label="Contacts" {...a11yProps(1)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Conversations
          handleConversation={handleConversation}
          filteredConversations={filteredConversations}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Contacts contacts={contacts} />
      </TabPanel>
    </div>
  );
}
