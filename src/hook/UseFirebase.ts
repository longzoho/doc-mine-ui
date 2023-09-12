import {initializeApp} from "@firebase/app";
import {getDatabase} from "@firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCu00K_X7qc098CmLmwBU5zpfyReYSyyC4",
  authDomain: "doc-mine.firebaseapp.com",
  projectId: "doc-mine",
  storageBucket: "doc-mine.appspot.com",
  messagingSenderId: "1071109994569",
  appId: "1:1071109994569:web:fd21afe48c386bf8dea798",
  databaseURL: "https://doc-mine-default-rtdb.asia-southeast1.firebasedatabase.app"
};

export const useFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  return {app, db};
}