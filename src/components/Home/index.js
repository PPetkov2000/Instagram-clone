import React from "react";
import Stories from "../Stories";
import Posts from "../Posts";
import UploadForm from "../UploadForm";
import Aside from "../Aside";
import { useGlobalContext } from "../../utils/context";

const Home = () => {
  const context = useGlobalContext();

  return (
    <div className="main-container">
      <div className="main-container-content">
        <UploadForm />
        <Stories />
        {context && <Posts uid={context.uid} />}
      </div>
      <Aside />
    </div>
  );
};

export default Home;
