import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { GlobalStateContext } from "../../utils/context";
import ProfileSettingsFormGroup from "../ProfileSettingsFormGroup";
import { projectAuth } from "../../firebase/config";

function ProfileChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const context = useContext(GlobalStateContext);

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
      <div className="change-password-tab-pane-header">
        <div className="change-password-img-container">
          <img
            src={context && context.profileImage}
            alt="change-password"
            className="change-password-img"
          />
        </div>
        <div className="change-password-tab-pane-text">
          <h4 className="change-password-tab-pane-title">
            {context && context.username}
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
        <div className="change-password-buttons-container">
          <aside style={{ flex: "0.3" }}></aside>
          <div className="change-password-buttons">
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
        </div>
      </Form>
    </>
  );
}

export default ProfileChangePassword;
