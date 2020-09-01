import { projectFirestore } from "./config";

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = projectFirestore.doc(`instagramUsers/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    try {
      await userRef.set({
        email,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await projectFirestore
      .doc(`instagramUsers/${uid}`)
      .get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
