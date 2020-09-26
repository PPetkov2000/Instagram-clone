import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Suggestions from "../Suggestions";
import { useGlobalContext } from "../../utils/context";
import { projectFirestore } from "../../firebase/config";

const Aside = () => {
  const [profileImage, setProfileImage] = useState();
  const context = useGlobalContext();
  const uid = context && context.uid;

  useEffect(() => {
    if (uid == null) return;

    const unsub = projectFirestore
      .collection("instagramUsers")
      .doc(uid)
      .onSnapshot((snapshot) => {
        setProfileImage(snapshot.data().profileImage);
      });

    return () => unsub();
  }, [uid]);

  return (
    <aside className="aside">
      <div className="aside-profile">
        <Link to={`/profile/${uid}`}>
          <img
            src={profileImage}
            alt="user_icon"
            className="aside-profile-img"
          />
        </Link>
        <div className="aside-profile-content">
          <strong>{context && context.username}</strong>
          <p className="text-muted" style={{ margin: "0" }}>
            {context && context.fullName}
          </p>
        </div>
      </div>
      <div className="aside-suggestions">
        <div className="aside-suggestions-header">
          <h6 className="text-muted">Suggestions For You</h6>
          <small>
            <strong>See All</strong>
          </small>
        </div>
        <div className="aside-suggestions-body">
          <Suggestions />
        </div>
      </div>
      <div className="aside-footer text-center">
        <p className="text-muted">@Instagram 2020</p>
      </div>
    </aside>
  );
};

export default Aside;
