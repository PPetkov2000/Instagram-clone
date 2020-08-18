import { useState, useEffect, useContext } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";
import { GlobalStateContext } from "../context";

const useStorage = (file) => {
  const context = useContext(GlobalStateContext);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { username } = context;

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    const imagesRef = projectFirestore.collection("images");
    const postsRef = projectFirestore.collection("posts");

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        imagesRef.add({ url, createdAt });
        postsRef.add({
          username: username,
          userImageUrl: "/images/user_icon.png",
          imageUrl: url,
          timestamp: timestamp(),
        });
        setUrl(url);
      }
    );
  }, [file, username]);

  return { progress, url, error };
};

export default useStorage;
