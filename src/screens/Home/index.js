import React, { useEffect } from "react";
import Stories from "../../components/Stories";
import Posts from "../../components/Posts";
import UploadForm from "../../components/UploadForm";
import Aside from "../../components/Aside";
import { useGlobalContext } from "../../utils/context";
import { useHistory } from "react-router-dom";

const Home = () => {
  const context = useGlobalContext();
  const history = useHistory();

  useEffect(() => {
    if (!context || !context.uid) {
      history.push("/login");
    }
  }, [context, history]);

  return (
    <div className="home">
      <div className="home__content">
        <UploadForm />
        <Stories />
        {context && <Posts uid={context.uid} />}
      </div>
      <Aside />
    </div>
  );
};

export default Home;
