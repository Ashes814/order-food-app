import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import classes from "./FilterMeals.module.css";

export default function FilterMeals(props) {
  const [keyword, setKeyword] = useState("");

  // 通过Effect来改造联系
  useEffect(() => {
    const Timer = setTimeout(() => props.onFilter(keyword), 1000);

    return clearTimeout(Timer);
  }, [keyword]);

  // 需要降低数据过滤的次数,提高用户体验,用户输入完之后再过滤
  // 当用户停止输入动作1秒后,我们才做查询
  // 在开启一个定时器的同时,应该关掉上一次
  // 在Effect的回调函数中可以指定一个函数作为返回值, 这个函数称为清理函数,它会在下次Effect执行前被调用
  // 可以在这个函数中做一些工作,来清除上一次Effect执行所带来的影响

  // 非受控组件
  const inputChangeHandler = (e) => {
    setKeyword(e.target.value.trim());
  };
  return (
    <div className={classes.FilterMeals}>
      <div className={classes.InputOuter}>
        <input
          value={keyword}
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
