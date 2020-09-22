import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { GlobalStateContext } from "../../utils/context";
import ProfileSettingsFormGroup from "../ProfileSettingsFormGroup";
import ProfileHeaderImageModal from "../ProfileHeaderImageModal";
import requester from "../../firebase/requester";

function ProfileEdit() {
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [profileWebsite, setProfileWebsite] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePhoneNumber, setProfilePhoneNumber] = useState("");
  const [profileGender, setProfileGender] = useState("");
  const context = useContext(GlobalStateContext);

  const showProfileImageOptions = () => setShowProfileImage(true);
  const hideProfileImageOptions = () => setShowProfileImage(false);

  const handleEditProfile = (e) => {
    e.preventDefault();
    console.log(`Name: ${profileName}`);
    console.log(`Username: ${profileUsername}`);
    console.log(`Website: ${profileWebsite}`);
    console.log(`Email: ${profileEmail}`);
    console.log(`Phone Number: ${profilePhoneNumber}`);
    console.log(`Gender: ${profileGender}`);

    requester
      .update("instagramUsers", context && context.uid, {
        fullName: profileName,
        username: profileUsername,
        email: profileEmail,
      })
      .then(() => {
        context.fullName = profileName;
      })
      .catch(console.error);
  };

  return (
    <>
      <div className="edit-profile-tab-pane-header">
        <div className="edit-profile-img-container">
          <img
            src={context && context.profileImage}
            alt="edit-profile"
            className="edit-profile-img"
            onClick={showProfileImageOptions}
          />
        </div>
        <div className="edit-profile-tab-pane-text">
          <h4 className="edit-profile-tab-pane-title">
            {context && context.username}
          </h4>
          <a
            href="#profile-photo"
            onClick={showProfileImageOptions}
            style={{ fontWeight: "bold", textDecoration: "none" }}
          >
            Change Profile Photo
          </a>
        </div>
      </div>
      <Form onSubmit={handleEditProfile}>
        <ProfileSettingsFormGroup
          labelText="Name"
          fieldType="text"
          fieldValue={context && context.fullName}
          handleChange={(e) => setProfileName(e.target.value)}
        />
        <ProfileSettingsFormGroup
          labelText="Username"
          fieldType="text"
          fieldValue={context && context.username}
          handleChange={(e) => setProfileUsername(e.target.value)}
        />
        <ProfileSettingsFormGroup
          labelText="Website"
          fieldType="text"
          handleChange={(e) => setProfileWebsite(e.target.value)}
        />
        <ProfileSettingsFormGroup
          labelText="Email"
          fieldType="email"
          fieldValue={context && context.email}
          handleChange={(e) => setProfileEmail(e.target.value)}
        />
        <ProfileSettingsFormGroup
          labelText="Phone Number"
          fieldType="number"
          handleChange={(e) => setProfilePhoneNumber(e.target.value)}
        />
        <ProfileSettingsFormGroup
          labelText="Gender"
          fieldType="text"
          handleChange={(e) => setProfileGender(e.target.value)}
        />
        <div className="edit-profile-buttons-container">
          <aside style={{ flex: "0.3" }}></aside>
          <div className="edit-profile-buttons">
            <Button type="submit">Submit</Button>
            <div>
              <a href="#disable-account" style={{ textDecoration: "none" }}>
                Temporary disable my account
              </a>
            </div>
          </div>
        </div>
      </Form>

      <ProfileHeaderImageModal
        showProfileImage={showProfileImage}
        hideProfileImageOptions={hideProfileImageOptions}
        userId={context && context.uid}
      />
    </>
  );
}

export default ProfileEdit;
