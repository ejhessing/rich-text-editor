import React from "react";
import { Layout, Button } from "antd";
import "./App.css";

import MyEditor from "./MyEditor";
const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Content style={{ padding: "200px" }}>
      <MyEditor />
      <Button type="primary">Button</Button>
    </Content>
  );
};

export default App;
