import React from "react";
import { Chat } from "../../components/chat";
import { SimpleTabs } from "../../components/tab";
import { makeStyles } from "@material-ui/core";
import { NavBar } from "../../components/navBar/index";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    marginTop: "64px",
  },
});

export function Dashboard() {
  const css = useStyles();

  return (
    <>
      <NavBar />
      <div className={css.mainContainer}>
        <SimpleTabs />
        <Chat />
      </div>
      <div></div>
    </>
  );
}
