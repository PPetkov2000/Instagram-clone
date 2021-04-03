import React, { useEffect } from "react";
import Stories from "../../components/Stories";
import Posts from "../../components/Posts";
import UploadForm from "../../components/UploadForm";
import Aside from "../../components/Aside";
import { useGlobalContext } from "../../utils/context";

const Home = ({ history }) => {
  const authUser = useGlobalContext();

  useEffect(() => {
    if (!authUser || !authUser.uid) {
      history.push("/login");
    }
  }, [authUser, history]);

  return (
    <div className="home">
      <div className="home__content">
        <UploadForm />
        <Stories />
        <Posts />
      </div>
      <Aside />
    </div>
  );
};

export default Home;
