import React from "react";

const ProfileSaved = ({ savedPosts }) => {
  return (
    <div className="profile-saved-img-container">
      {savedPosts.length === 0 ? (
        <h3>No saved posts</h3>
      ) : (
        savedPosts.map((post) => {
          return (
            <div key={post.id} className="profile-saved-img-div">
              <img
                src={post.imageUrl}
                alt="saved post"
                className="profile-saved-img"
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProfileSaved;
