import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ImageSlider from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImageSlider  url={"https://picsum.photos/v2/list"} page={1} limit={10}/>
  </StrictMode>
);