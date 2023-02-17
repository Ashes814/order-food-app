import React from "react";
import BackDrop from "../BackDrop/BackDrop";
import classes from "./Confirm.module.css";
export default function Confirm(props) {
  return (
    <BackDrop className={classes.ConfirmOuter}>
      <div className={classes.Confirm}>
        <p>{props.confirmText}</p>
        <div>
          <button
            onClick={(e) => {
              props.onCancel(e);
            }}
            className={classes.Cancel}
          >
            取消
          </button>
          <button
            onClick={(e) => {
              props.onOk(e);
            }}
            className={classes.Ok}
          >
            确认
          </button>
        </div>
      </div>
    </BackDrop>
  );
}
