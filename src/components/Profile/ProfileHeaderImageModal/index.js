import React, { useState, useEffect } from "react";
import { Modal, ListGroup, FormControl } from "react-bootstrap";
import { projectStorage } from "../../../firebase/config";
import requester from "../../../firebase/requester";
import { useGlobalContext } from "../../../utils/context";

const ProfileHeaderImageModal = ({
  showProfileImage,
  hideProfileImageOptions,
}) => {
  const [file, setFile] = useState(null);
  const authUser = useGlobalContext();

  useEffect(() => {
    if (file != null) {
      const storageRef = projectStorage.ref();
      const uploadTask = storageRef
        .child(`profileImages/${file.name}`)
        .put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (err) => {
          if (err.code === "storage/unauthorized") {
            console.log("You have to login!");
            return;
          }
          console.log(err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            requester
              .update("instagramUsers", authUser.uid, {
                profileImage: downloadURL,
              })
              .then(() => console.log("Uploaded Successfully!"))
              .catch(console.error);
          });
        }
      );
    }
  }, [file, authUser]);

  const types = ["image/png", "image/jpeg"];

  const addProfilePicture = (e) => {
    const selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
    }

    hideProfileImageOptions();
  };

  const removeProfilePicture = () => {
    requester
      .update("instagramUsers", authUser.uid, {
        profileImage: "/images/user_icon.png",
      })
      .then(() => console.log("Removed Successfully!"))
      .catch(console.error);

    hideProfileImageOptions();
  };

  return (
    <Modal show={showProfileImage} onHide={hideProfileImageOptions} centered>
      <Modal.Header closeButton>
        <Modal.Title className="profile-header-modal-title">
          <h5>Change Profile Photo</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <ListGroup variant="flush" className="text-center">
          <ListGroup.Item
            action
            className="profile-header-modal-upload-item text-primary"
          >
            <label
              htmlFor="profileImage"
              className="profile-header-modal-upload-label"
            >
              Upload Photo
            </label>
            <FormControl
              type="file"
              id="profileImage"
              className="profile-header-modal-upload-input"
              onChange={addProfilePicture}
            />
          </ListGroup.Item>
          <ListGroup.Item
            action
            className="text-danger"
            onClick={removeProfilePicture}
          >
            <strong>Remove Current Photo</strong>
          </ListGroup.Item>
          <ListGroup.Item action onClick={hideProfileImageOptions}>
            Cancel
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileHeaderImageModal;
