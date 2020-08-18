import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setDocs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

    return () => unsub();
  }, [collection]);

  return { docs };
};

export default useFirestore;
