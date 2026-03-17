import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const testFirestore = async () => {
  await addDoc(collection(db, "test"), {
    message: "Firebase connected successfully",
    time: new Date()
  });
};