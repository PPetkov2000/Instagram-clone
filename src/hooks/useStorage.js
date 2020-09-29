import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";
import { useGlobalContext } from "../utils/context";

const useStorage = (file) => {
  const context = useGlobalContext();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { username, uid } = context;

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
          creator: uid,
          username,
          imageUrl: url,
          timestamp: timestamp(),
          likes: [],
        });

        setUrl(url);
      }
    );
  }, [file, username, uid]);

  return { progress, url, error };
};

export default useStorage;
