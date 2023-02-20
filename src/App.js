import React, { useState, useReducer } from "react";
import Meals from "./components/Meals/Meals";
import CartContext from "./store/cart-context";
import FilterMeals from "./components/FilterMeals/FilterMeals";
import Cart from "./components/Cart/Cart";

// 模拟一组事物数据
const MEALS_DATA = [
  {
    id: "1",
    title: "皇堡",
    desc: "又大又好吃，超级鲜美爽口大汉堡",
    price: 18,
    img: "img/meals/1.png",
  },
  {
    id: "2",
    title: "蟹堡王至尊大汉堡",
    desc: "海绵宝宝同款大汉堡",
    price: 90,
    img: "img/meals/2.png",
  },
  {
    id: "3",
    title: "双层巨无霸",
    desc: "好吃好吃",
    price: 12,
    img: "img/meals/3.png",
  },
  {
    id: "4",
    title: "劲脆鸡腿堡",
    desc: "肯德基同款大汉堡，无敌爽口鲜香",
    price: 32,
    img: "img/meals/4.png",
  },
  {
    id: "5",
    title: "秘制小汉堡",
    desc: "爱吃不吃",
    price: 108,
    img: "img/meals/5.png",
  },
  {
    id: "6",
    title: "旋风超辣堡",
    desc: "牛奶配辣宝，赛过活神仙",
    price: 5,
    img: "img/meals/6.png",
  },
  {
    id: "7",
    title: "地雷",
    desc: "小心爆炸",
    price: 150,
    img: "img/meals/7.png",
  },
];

const cartReducer = (state, action) => {
  //复制购物车
  const newCart = { ...state };

  switch (action.type) {
    default:
      return state;
    case "ADD":
      if (newCart.items.indexOf(action.meal) === -1) {
        newCart.items.push(action.meal);

        // change amount
        action.meal.amount = 1;
      } else {
        // increase the amount of meal
        action.meal.amount += 1;
      }

      // increase total
      newCart.totalAmount += 1;
      newCart.totalPrice += action.meal.price;

      // 重新设置购物车
      return newCart;

    case "REMOVE":
      // change amount
      action.meal.amount -= 1;

      if (action.meal.amount === 0) {
        newCart.items.splice(newCart.items.indexOf(action.meal), 1);
      }

      // increase total
      newCart.totalAmount -= 1;
      newCart.totalPrice -= action.meal.price;
      // 重新设置购物车
      return newCart;

    case "CLEAR":
      newCart.items.forEach((item) => delete item.amount);
      newCart.items = [];
      newCart.totalAmount = 0;
      newCart.totalPrice = 0;
      return newCart;
  }
};

function App() {
  const [mealsData, setMealsData] = useState(MEALS_DATA);

  /* 创建一个state存储购物车数据
    1.商品[];
    2.商品总数（totalAmount）
    3.商品总价（totalPrice）
  
  */

  const [cartData, cartDispatch] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
    totalPrice: 0,
  });

  // 创建一个过滤meals的函数
  const filterHandler = (keyword) => {
    const newMealsData = MEALS_DATA.filter(
      (item) => item.title.indexOf(keyword) !== -1
    );
    setMealsData(newMealsData);
  };

  return (
    <CartContext.Provider value={{ ...cartData, cartDispatch }}>
      {/* <Confirm /> */}
      <div className="App">
        <FilterMeals onFilter={filterHandler} />
        <Meals mealsData={mealsData} />
        <Cart />
      </div>
    </CartContext.Provider>
  );
}

export default App;
