import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../../../contexts/authProvider";
import ProfileSettingsFormGroup from "../ProfileSettingsFormGroup";
import ProfileHeaderImageModal from "../ProfileHeaderImageModal";
import requester from "../../../firebase/requester";

function ProfileEdit() {
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [profileWebsite, setProfileWebsite] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePhoneNumber, setProfilePhoneNumber] = useState("");
  const [profileGender, setProfileGender] = useState("");
  const { authUser } = useAuth();

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
      .update("instagramUsers", authUser && authUser.uid, {
        fullName: profileName,
        username: profileUsername,
        email: profileEmail,
      })
      .then(() => {
        authUser.fullName = profileName;
      })
      .catch(console.error);
  };

  return (
    <>
      <div className="edit-profile__tab-pane-header">
        <div className="edit-profile__image-wrapper">
          <img
            src={authUser && authUser.profileImage}
            alt="profile"
            className="edit-profile__image"
            onClick={showProfileImageOptions}
          />
        </div>
        <div className="edit-profile__tab-pane-text">
          <h4 className="edit-profile__tab-pane-title">
            {authUser && authUser.username}
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
          fieldValue={authUser && authUser.fullName}
          handleChange={(e) => setProfileName(e.target.value)}
        />
        <ProfileSettingsFormGroup
          labelText="Username"
          fieldType="text"
          fieldValue={authUser && authUser.username}
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
          fieldValue={authUser && authUser.email}
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
        <div className="edit-profile__actions">
          <Button type="submit">Submit</Button>
          <div>
            <a href="#disable-account" style={{ textDecoration: "none" }}>
              Temporary disable my account
            </a>
          </div>
        </div>
      </Form>

      <ProfileHeaderImageModal
        showProfileImage={showProfileImage}
        hideProfileImageOptions={hideProfileImageOptions}
        userId={authUser && authUser.uid}
      />
    </>
  );
}

export default ProfileEdit;
