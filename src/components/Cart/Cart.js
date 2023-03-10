import React, { useContext, useState, useEffect } from "react";
import classes from "./Cart.module.css";
import IconImg from "../../asset/bag.png";
import CartContext from "../../store/cart-context";
import CartDetails from "./CartDetails/CartDetails";
import Checkout from "./Checkout/Checkout";

export default function Cart() {
  const ctx = useContext(CartContext);

  // 添加一个state来设置详情是否显示
  const [showDetails, setShowDetails] = useState(false);
  // 添加一个state设置结账页的显示与隐藏
  const [showCheckout, setShowCheckout] = useState(false);

  // 单独执行以下代码会造成死循环re-render
  const checkAmount = () => {
    if (ctx.totalAmount === 0) {
      // 购物车已经被清空
      setShowDetails(false);
      setShowCheckout(false);
    }
  };
  /* 默认情况下useEffect中的函数,会在组件渲染完成后调用,并且是每次渲染完成后都会调用
      - 在useEffect中,可以传递第二个参数
          此参数为数组,可指定Effect的依赖项
          仅当依赖变化时Effect才会被触发
          通常将Effect中使用的所有的局部变量都设置为其依赖项
            此操作可确保这些变量发生变化时,Effect会被触发执行
          像setState是由钩子函数useState()生成的,useState会确保组件的每次渲染都会获取到相同的setState对象
            所以如setState之类的可以不设置到依赖中
          如果依赖项:设置为空数组
            意味着Effect只会在组件初始化时出发一次
  */

  useEffect(checkAmount);

  // 在组件每次重新渲染的时候,检查一下商品的总数量,如果数量为0,则修改showDetails为false
  // 组件每次重新渲染,组件的函数体就会执行

  /* if (ctx.totalAmount === 0) {
   // 购物车已经被清空
   setShowDetails(false);
 }
 error:Too Many re-renders
 console.log("re render !!!");

  */

  // if (ctx.totalAmount === 0) {
  //   setTimeout(() => {
  //     setShowDetails(false);
  //   }, 0);
  // 成功解决
  // }

  // 添加一个显示详情页的函数
  const toggleDetailsHandler = () => {
    // debugger;
    // console.log(showDetails);
    if (ctx.totalAmount === 0) {
      setShowDetails(false);
      return;
    }
    setShowDetails((preState) => !preState);
  };

  const showCheckoutHandler = () => {
    // 如果购物车总数为0，就不显示
    if (ctx.totalAmount === 0) return;
    setShowCheckout(true);
  };

  const hideCheckoutHandler = () => {
    setShowCheckout(false);
  };

  return (
    <div className={classes.Cart} onClick={toggleDetailsHandler}>
      {showCheckout && <Checkout onHide={hideCheckoutHandler} />}

      {/* 引入购物车的详情 */}
      {showDetails && ctx.totalAmount !== 0 ? (
        <CartDetails setShowDetails={setShowDetails} />
      ) : null}

      <div className={classes.Icon}>
        <img src={IconImg} alt="bag pic" />
        {ctx.totalAmount === 0 ? null : (
          <span className={classes.TotalAmount}>{ctx.totalAmount}</span>
        )}
      </div>

      {ctx.totalAmount === 0 ? (
        <p className={classes.NoMeal}>未选购商品</p>
      ) : (
        <p className={classes.Price}>{ctx.totalPrice}</p>
      )}

      <button
        onClick={showCheckoutHandler}
        className={`${classes.Button} ${
          ctx.totalAmount === 0 ? classes.Disable : null
        }`}
      >
        去结算
      </button>
    </div>
  );
}
