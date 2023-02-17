import React from "react";
import Counter from "../../UI/Counter/Counter";
import classes from "./Meal.module.css";

export default function Meal(props) {
  return (
    <div className={classes.Meal}>
      <div className={classes.ImgBox}>
        <img src={props.meal.img} alt="汉堡图片"></img>
      </div>

      <div className={classes.TextContainer}>
        <h2 className={classes.Title}>{props.meal.title}</h2>
        {props.noDesc ? null : (
          <p className={classes.Desc}>{props.meal.desc}</p>
        )}

        <div className={classes.PriceWrapper}>
          <span className={classes.Price}>{props.meal.price}</span>

          <Counter meal={props.meal} />
        </div>
      </div>
    </div>
  );
}
