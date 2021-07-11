import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../../../contexts/authProvider";
import ProfileSettingsFormGroup from "../ProfileSettingsFormGroup";
import { projectAuth } from "../../../firebase/config";

function ProfileChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { authUser } = useAuth();

  const handleChangePassword = (e) => {
    e.preventDefault();

    const user = projectAuth.currentUser;

    if (newPassword === confirmPassword) {
      user
        .updatePassword(newPassword)
        .then(() => {
          console.log("Password changed!");
        })
        .catch(console.error);
    }
  };

  return (
    <>
      <div className="change-password__tab-pane-header">
        <div className="change-password__image-wrapper">
          <img
            src={authUser && authUser.profileImage}
            alt="change-password"
            className="change-password__image"
          />
        </div>
        <div className="change-password__tab-pane-text">
          <h4 className="change-password__tab-pane-title">
            {authUser && authUser.username}
          </h4>
        </div>
      </div>
      <Form onSubmit={handleChangePassword}>
        <ProfileSettingsFormGroup
          labelText="Old Password"
          fieldType="password"
          handleChange={(e) => setOldPassword(e.target.value)}
        />
        <ProfileSettingsFormGroup
          labelText="New Password"
          fieldType="password"
          handleChange={(e) => setNewPassword(e.target.value)}
        />
        <ProfileSettingsFormGroup
          labelText="Confirm New Password"
          fieldType="password"
          handleChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="change-password__actions">
          <Button
            type="submit"
            disabled={!oldPassword || !newPassword || !confirmPassword}
            style={{ fontSize: "0.9rem" }}
          >
            Change Password
          </Button>
          <div>
            <a href="#forgot-password" style={{ textDecoration: "none" }}>
              Forgot password?
            </a>
          </div>
        </div>
      </Form>
    </>
  );
}

export default ProfileChangePassword;
