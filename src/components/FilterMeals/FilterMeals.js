import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import classes from "./FilterMeals.module.css";

export default function FilterMeals(props) {
  const inputChangeHandler = (e) => {
    const keyword = e.target.value.trim();
    props.onFilter(keyword);
  };
  return (
    <div className={classes.FilterMeals}>
      <div className={classes.InputOuter}>
        <input
          onChange={inputChangeHandler}
          type="text"
          placeholder={"输入汉堡名称进行搜索"}
          className={classes.SearchInput}
        ></input>
        <FontAwesomeIcon icon={faSearch} className={classes.SearchIcon} />
      </div>
    </div>
  );
}
