import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Stories from "./components/Stories";
import Posts from "./components/Posts";
import UploadForm from "./components/UploadForm";
import Context from "./context";

const App = () => {
  return (
    <Context>
      <Navbar />
      <UploadForm />
      <Stories />
      <Posts />
    </Context>
  );
};

export default App;
