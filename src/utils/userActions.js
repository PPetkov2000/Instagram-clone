import requester from "../firebase/requester";

const likeAndDislikePost = (authUser, likedPost) => {
  requester
    .get("instagramUsers", likedPost.creator)
    .then((likedPostCreator) => {
      let likedPostCreatorNotifications = likedPostCreator.data().notifications;

      if (!likedPost.likes.includes(authUser.uid)) {
        likedPost.likes.push(authUser.uid);
        likedPostCreatorNotifications.push({
          id: authUser.uid,
          username: authUser.username,
          profileImage: authUser.profileImage,
          timestamp: new Date(),
          type: "like",
          postId: likedPost.id,
          postImageUrl: likedPost.imageUrl,
        });
      } else {
        likedPost.likes = likedPost.likes.filter((x) => x !== authUser.uid);
        likedPostCreatorNotifications = likedPostCreatorNotifications.filter(
          (x) => x.id !== authUser.uid
        );
      }

      return Promise.all([
        requester.update("posts", likedPost.id, { likes: likedPost.likes }),
        requester.update("instagramUsers", likedPost.creator, {
          notifications: likedPostCreatorNotifications,
        }),
      ]);
    })
    .catch(console.error);
};

const saveAndUnSavePost = (authUser, savedPostId) => {
  if (!authUser.saved.includes(savedPostId)) {
    authUser.saved.push(savedPostId);
  } else {
    authUser.saved = authUser.saved.filter((x) => x !== savedPostId);
  }

  return requester.update("instagramUsers", authUser.uid, {
    saved: authUser.saved,
  });
};

const followUser = (authUser, followedUserId) => {
  requester
    .get("instagramUsers", followedUserId)
    .then((followedUser) => {
      const followedUserFollowers = followedUser.data().followers;
      const followedUserNotifications = followedUser.data().notifications;

      authUser.following.push(followedUserId);
      followedUserFollowers.push(authUser.uid);
      followedUserNotifications.push({
        id: authUser.uid,
        username: authUser.username,
        profileImage: authUser.profileImage,
        timestamp: new Date(),
        type: "follower",
      });

      return Promise.all([
        requester.update("instagramUsers", authUser.uid, {
          following: authUser.following,
        }),
        requester.update("instagramUsers", followedUserId, {
          followers: followedUserFollowers,
          notifications: followedUserNotifications,
        }),
      ]);
    })
    .catch(console.error);
};

const unfollowUser = (authUser, unfollowedUserId) => {
  requester
    .get("instagramUsers", unfollowedUserId)
    .then((unfollowedUser) => {
      let unfollowedUserFollowers = unfollowedUser.data().followers;
      let unfollowedUserNotifications = unfollowedUser.data().notifications;

      authUser.following = authUser.following.filter(
        (x) => x !== unfollowedUserId
      );
      unfollowedUserFollowers = authUser.following.filter(
        (x) => x !== authUser.uid
      );
      unfollowedUserNotifications = unfollowedUserNotifications.filter(
        (x) => x.id !== authUser.uid
      );

      return Promise.all([
        requester.update("instagramUsers", authUser.uid, {
          following: authUser.following,
        }),
        requester.update("instagramUsers", unfollowedUserId, {
          followers: unfollowedUserFollowers,
          notifications: unfollowedUserNotifications,
        }),
      ]);
    })
    .catch(console.error);
};

const likeComment = (authUser, comment, postImageUrl) => {
  requester
    .get("instagramUsers", comment.creatorId)
    .then((commentCreator) => {
      const commentCreatorNotifications = commentCreator.data().notifications;

      comment.likes.push(authUser.uid);
      commentCreatorNotifications.push({
        id: authUser.uid,
        username: authUser.username,
        profileImage: authUser.profileImage,
        timestamp: new Date(),
        type: "like-comment",
        postId: comment.postId,
        postImageUrl: postImageUrl,
      });

      return Promise.all([
        requester.update(`posts/${comment.postId}/comments`, comment.id, {
          likes: comment.likes,
        }),
        requester.update("instagramUsers", comment.creatorId, {
          notifications: commentCreatorNotifications,
        }),
      ]);
    })
    .catch(console.error);
};

const dislikeComment = (authUser, comment) => {
  requester
    .get("instagramUsers", comment.creatorId)
    .then((commentCreator) => {
      let commentCreatorNotifications = commentCreator.data().notifications;

      comment.likes = comment.likes.filter((x) => x !== authUser.uid);
      commentCreatorNotifications = commentCreatorNotifications.filter(
        (x) => x.id !== authUser.uid
      );

      return Promise.all([
        requester.update(`posts/${comment.postId}/comments`, comment.id, {
          likes: comment.likes,
        }),
        requester.update("instagramUsers", comment.creatorId, {
          notifications: commentCreatorNotifications,
        }),
      ]);
    })
    .catch(console.error);
};

export {
  likeAndDislikePost,
  saveAndUnSavePost,
  followUser,
  unfollowUser,
  likeComment,
  dislikeComment,
};
