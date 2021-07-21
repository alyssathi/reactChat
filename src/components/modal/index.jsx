import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      border: "lightgray 1px solid",
    },
  })
);

export function SimpleModal({ children, modalName, onSubmit, color }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit();
    handleClose();
  };

  return (
    <div>
      <Button
        type="button"
        className={classes.button}
        color={color}
        onClick={handleOpen}
      >
        {modalName}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form onSubmit={submitForm}>
            {children}
            <Button type="submit">{modalName}</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
