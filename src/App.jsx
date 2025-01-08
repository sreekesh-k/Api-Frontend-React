import { useState } from "react";
import "./App.css";
import { APP_NAME } from "./constants";
import { Button } from 'antd';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Hello Welcome to {APP_NAME}</h1>
        <Button type="primary">Primary Button</Button>
      </div>
    </>
  );
}

export default App;
