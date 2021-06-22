import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// comment out for using development version of firebase project
// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FB_API_KEY_DEV,
//   authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN_DEV,
//   projectId: process.env.REACT_APP_FB_PROJECT_ID_DEV,
//   storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET_DEV,
//   messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID_DEV,
//   appId: process.env.REACT_APP_FB_APP_ID_DEV,
// });

// comment out for using production version of firebase project
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FB_API_KEY_PROD,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN_PROD,
  projectId: process.env.REACT_APP_FB_PROJECT_ID_PROD,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET_PROD,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID_PROD,
  appId: process.env.REACT_APP_FB_APP_ID_PROD,
});

const firestore = app.firestore();
export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: (doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const storage = app.storage();
export const auth = app.auth();
export default app;
