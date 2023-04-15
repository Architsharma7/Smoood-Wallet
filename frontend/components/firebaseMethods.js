import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBMpVFf0efu27TMW8IXHNF6wv8wBqltCr4",
  authDomain: "next-app-4bebf.firebaseapp.com",
  projectId: "next-app-4bebf",
  storageBucket: "next-app-4bebf.appspot.com",
  messagingSenderId: "647124985836",
  appId: "1:647124985836:web:de7db0ddbdefc6532d02c9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

import { doc, setDoc, getFirestore, serverTimestamp } from "firebase/firestore";

export const db = getFirestore(app);

export const addRecord = async (scwAddress, TxId, Amount, Message, Tag) => {
  const data = {
    amount: Amount,
    message: Message,
    tag: Tag,
    timestamp: serverTimestamp(),
  };
  const docRef = await setDoc(doc(db, `${scwAddress}`, TxId), data);
  console.log(docRef.id);

  return docRef.id;
};

export const getAllRecords = async (scwAddress) => {
  let txRecords = [];
  const querySnapshot = await getDocs(collection(db, `${scwAddress}`));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    txRecords.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });

  return txRecords;
};

// addRecord(
//   "0x2c4ed5ea89D8231C4E64F02f0da4E5ffcE4263D9",
//   "0xf0686a67b05cab57a12e3242edb45d7b20287eb0a26e675e105bb447f514570d",
//   0.5,
//   "For Payment",
//   "Payment"
// );

// getAllRecords("0x2c4ed5ea89D8231C4E64F02f0da4E5ffcE4263D9");
