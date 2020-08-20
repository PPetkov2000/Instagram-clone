import React from "react";
import Stories from "../Stories";
import Posts from "../Posts";
import UploadForm from "../UploadForm";
import Context from "../../context";

const Home = () => {
  return (
    <Context>
      <UploadForm />
      <Stories />
      <Posts />
    </Context>
  );
};

export default Home;
