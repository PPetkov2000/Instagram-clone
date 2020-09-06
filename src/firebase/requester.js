import { projectFirestore } from "./config";

export default {
  create(collection, data) {
    return projectFirestore.collection(collection).add(data);
  },
  getAll(collection) {
    return projectFirestore.collection(collection).get();
  },
  get(collection, id) {
    return projectFirestore.collection(collection).doc(id).get();
  },
  update(collection, id, data) {
    return projectFirestore.collection(collection).doc(id).update(data);
  },
  remove(collection, id) {
    return projectFirestore.collection(collection).doc(id).delete();
  },
  getByCriteria(collection, prop, value) {
    return projectFirestore
      .collection(collection)
      .where(prop, "==", value)
      .get();
  },
};
