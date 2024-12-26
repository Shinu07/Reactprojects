import { useState, useEffect, useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  const increment =useCallback(() => {
    setCount(count + 1);
  },[count])

  useEffect(() => {
    console.log("Increment function is getting recreated");
  }, [increment]);

  return (
    <div>
      <h2>Count: {count}</h2>
      <h2>Other Count : {otherCount}</h2>

      <button onClick={() => setOtherCount(otherCount + 1)}>otherCount</button>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// import { useEffect, useState, useCallback } from "react";

// import "./App.css";

// function App() {
//   const [typeOfColor, setTypeOfColor] = useState("HEX");
//   const [color, setColor] = useState("#000000");

//   const randomColorUtility = useCallback((length) => {
//     return Math.floor(Math.random() * length);
//   }, []);

//   const handleCreateRgbColor = useCallback(() => {
//     const R = randomColorUtility(256);
//     const G = randomColorUtility(256);
//     const B = randomColorUtility(256);

//     setColor(`${R},${G},${B}`);
//   }, [randomColorUtility]);

//   const handleCreateHexColor = useCallback(() => {
//     const hexChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
//     let hexColor = "#";

//     for (let i = 0; i < 6; i++) {
//       hexColor += hexChars[randomColorUtility(hexChars.length)];
//     }
//     setColor(hexColor);
//   }, [randomColorUtility]);

//   useEffect(() => {
//     if(typeOfColor === "RGB") {
//       handleCreateRgbColor();
//     } else {
//       handleCreateHexColor();
//     }
//   }, [typeOfColor, handleCreateRgbColor, handleCreateHexColor]);

//   return (
//     <div className="wrapper">
//       <div style={{ width: "100vw", height: "100vh", background: typeOfColor === "RGB" ? `rgb(${color})` : color }}>
//         <div className="button-container">
//           <button onClick={() => setTypeOfColor("RGB")}>
//             Create RGB color
//           </button>
//           <button onClick={() => setTypeOfColor("HEX")}>
//             Create HEX color
//           </button>
//           <button
//             onClick={
//               typeOfColor === "RGB"
//                 ? handleCreateRgbColor
//                 : handleCreateHexColor
//             }
//           >
//             Generate Random Color
//           </button>
//         </div>
//         <h1>{typeOfColor === "RGB" ? `RGB (${color})`: `HEX ${color}`}</h1>
//       </div>
//     </div>
//   );
// }
export default App;
