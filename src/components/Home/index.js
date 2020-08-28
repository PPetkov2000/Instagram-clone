import React from "react";
import Stories from "../Stories";
import Posts from "../Posts";
import UploadForm from "../UploadForm";
import Aside from "../Aside";
import Context from "../../context";

const Home = () => {
  return (
    <Context>
      <div className="main-container">
        <div className="main-container-content">
          <UploadForm />
          <Stories />
          <Posts />
        </div>
        <Aside />
      </div>
    </Context>
  );
};

export default Home;
