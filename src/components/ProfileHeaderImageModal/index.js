import React, { useState, useEffect } from "react";
import { Modal, ListGroup, FormControl } from "react-bootstrap";
import { projectStorage, projectFirestore } from "../../firebase/config";

const ProfileHeaderImageModal = ({
  showProfileImage,
  hideProfileImageOptions,
  userId,
}) => {
  const [file, setFile] = useState(null);

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
            projectFirestore
              .collection("instagramUsers")
              .doc(userId)
              .update({ profileImage: downloadURL })
              .then(() => console.log("Uploaded Successfully!"))
              .catch(console.error);
          });
        }
      );
    }
  }, [file, userId]);

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
    projectFirestore
      .collection("instagramUsers")
      .doc(userId)
      .update({ profileImage: "/images/user_icon.png" })
      .then(() => console.log("Removed Successfully!"))
      .catch(console.error);

    hideProfileImageOptions();
  };

  return (
    <Modal show={showProfileImage} onHide={hideProfileImageOptions}>
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
