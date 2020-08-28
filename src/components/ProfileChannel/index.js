import React from "react";
import { Button } from "react-bootstrap";
import { BsTv } from "react-icons/bs";

const ProfileChannel = () => {
  return (
    <div
      className="user-profile-activities-content"
      style={{ marginTop: "4rem", marginBottom: "2rem" }}
    >
      <div className="profile-channel-icon-container">
        <BsTv className="profile-channel-icon" />
      </div>
      <h3>Upload a Video</h3>
      <p>Videos must be between 1 and 60 minutes long.</p>
      <Button className="profile-channel-button">Upload</Button>
    </div>
  );
};

export default ProfileChannel;
