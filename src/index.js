import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//设置移动端的适配, 设置视口的总宽度为750rem
document.documentElement.style.fontSize = 100 / 750 + "vw";

// 将App组件在root下渲染
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
