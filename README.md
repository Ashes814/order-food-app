# [React App]第一期：汉堡到家(组件设计)

**来源：**尚硅谷超哥React系列课程（lilichao.com）

**源码:** [https://github.com/Ashes814/order-food-app/](https://github.com/Ashes814/order-food-app/tree/main/src/store)

# 功能展示

- 模仿快餐店下单程序制作的一个小程序,功能简单,但实现细节有一点小小的复杂.
- 本文将拆解这个小程序中的各个组件,理清其编码结构及数据传递过程

![20230217_154222.gif](%5BReact%20App%5D%E7%AC%AC%E4%B8%80%E6%9C%9F%EF%BC%9A%E6%B1%89%E5%A0%A1%E5%88%B0%E5%AE%B6(%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1)%2018a24b1ec46d40b8aa5363074f6a987b/20230217_154222.gif)

# 知识盘点

- react脚手架-`create-react-app`
- props传递数据(父组件给子组件传递数据:层数不能过度)
- createPortal(用于创建模态窗口)
- 钩子Hooks
    - useState (联动数据更改与DOM渲染)
    - useContext (存储数据,用于父组件为多层子孙组件传递)
    - useEffect (避免直接在函数组件中setState所产生的副作用:如无限render)
    - useReducer (整合需要进行传递的函数,避免混乱)

# 准备工作

- 准备目录`order-food-app`
- 利用`create-react-app`创建项目

```bash
npx create-react-app order-food-app
```

- 删除暂时不需要的文件,清洗后的文件结构如下
    
    ![Untitled](%5BReact%20App%5D%E7%AC%AC%E4%B8%80%E6%9C%9F%EF%BC%9A%E6%B1%89%E5%A0%A1%E5%88%B0%E5%AE%B6(%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1)%2018a24b1ec46d40b8aa5363074f6a987b/Untitled.png)
    

# 组件拆解

![汉堡到家组件拆解.jpg](%5BReact%20App%5D%E7%AC%AC%E4%B8%80%E6%9C%9F%EF%BC%9A%E6%B1%89%E5%A0%A1%E5%88%B0%E5%AE%B6(%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1)%2018a24b1ec46d40b8aa5363074f6a987b/%25E6%25B1%2589%25E5%25A0%25A1%25E5%2588%25B0%25E5%25AE%25B6%25E7%25BB%2584%25E4%25BB%25B6%25E6%258B%2586%25E8%25A7%25A3.jpg)

![B335396C-C1C5-4FFC-A678-309D4557716F_4_5005_c.jpeg](%5BReact%20App%5D%E7%AC%AC%E4%B8%80%E6%9C%9F%EF%BC%9A%E6%B1%89%E5%A0%A1%E5%88%B0%E5%AE%B6(%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1)%2018a24b1ec46d40b8aa5363074f6a987b/B335396C-C1C5-4FFC-A678-309D4557716F_4_5005_c.jpeg)

![19B1932B-52A3-43D5-8805-922CF29BF93F_1_201_a.jpeg](%5BReact%20App%5D%E7%AC%AC%E4%B8%80%E6%9C%9F%EF%BC%9A%E6%B1%89%E5%A0%A1%E5%88%B0%E5%AE%B6(%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1)%2018a24b1ec46d40b8aa5363074f6a987b/19B1932B-52A3-43D5-8805-922CF29BF93F_1_201_a.jpeg)

![Untitled](%5BReact%20App%5D%E7%AC%AC%E4%B8%80%E6%9C%9F%EF%BC%9A%E6%B1%89%E5%A0%A1%E5%88%B0%E5%AE%B6(%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1)%2018a24b1ec46d40b8aa5363074f6a987b/Untitled%201.png)

![Untitled](%5BReact%20App%5D%E7%AC%AC%E4%B8%80%E6%9C%9F%EF%BC%9A%E6%B1%89%E5%A0%A1%E5%88%B0%E5%AE%B6(%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1)%2018a24b1ec46d40b8aa5363074f6a987b/Untitled%202.png)

- App(最外层容器)
- Components
    - Meals (呈现汉堡全部种类的容器)
        - Meal (单个汉堡)
    - Cart (购物车)
        - CartDetails (详细购物车界面)
        - Checkout (结算页面)
            - Bar (支付按钮)
            - CheckoutItem (结算页面详情)
    - FilterMeals (搜索功能)
    - UI
        - BackDrop (背景遮罩,防止在购物车弹出时误触)
        - Confirm (确认是否清空购物车窗口)
        - Counter (增减购物车商品功能)
- store (利用useContext存储数据,以便父组件向子孙组件传递)

# 处理index.html

- 除了添加root根标签之外，还需要为`porta`l增加两个根节点，使得`modal窗口`不渲染在root下，避免一些样式可能出现的问题
- 详情：[https://beta.reactjs.org/reference/react-dom/createPortal](https://beta.reactjs.org/reference/react-dom/createPortal)

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- app简介 -->
    <meta name="description" content="超级酷应用之汉堡到家app" />

    <!-- app标题 -->
    <title>汉堡到家</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>

    <!-- 设置root用于存放组件 -->
    <div id="root"></div>

    <!-- 设置portal渲染modal的位置 -->
    <!-- backdrop遮罩层 -->
    <div id="backdrop-root"></div>

    <!-- 购物车结算页面 -->
    <div id="checkout-root"></div>
  </body>
</html>
```

# 处理index.js

```jsx
// index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; 

// 设置移动端的适配, 设置视口的总宽度为750rem
document.documentElement.style.fontSize = 100 / 750 + "vw";

// 将App组件在root下渲染
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

# 结语

- 本项目使用最基础的React组件设计,用于练习基本的组件编写方式
- 理清本项目的组件间通信方式有助于进一步学习React组件间通信方式
- 通过本项目能够巩固基本的JavaScript数组方法以及CSS技能