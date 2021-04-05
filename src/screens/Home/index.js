import React, { useEffect } from "react";
import Stories from "../../components/Stories";
import Posts from "../../components/Posts";
import UploadForm from "../../components/UploadForm";
import Aside from "../../components/Aside";
import Loader from "../../components/Loader";
import { useAuth } from "../../utils/authProvider";

const Home = ({ history }) => {
  const { loading, authUser } = useAuth();

  useEffect(() => {
    if (!authUser || !authUser.uid) {
      history.push("/login");
    }
  }, [authUser, history]);

  return loading ? (
    <Loader />
  ) : (
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
