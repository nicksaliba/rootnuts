import firebase from "firebase";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCqzUkVLvwwDD6JIMIMlN3qgS4Xro8fRSM",
  authDomain: "rootnuts-6555d.firebaseapp.com",
  databaseURL: "https://rootnuts-6555d.firebaseio.com",
  projectId: "rootnuts-6555d",
  storageBucket: "rootnuts-6555d.appspot.com",
  messagingSenderId: "1050913556678",
  appId: "1:1050913556678:web:71f8de196107c80f282fc7",
  measurementId: "G-G0CZJHBCB4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const pineRef = db.collection("pine-transactions");

async function getTransactions() {
  const snapshot = await pineRef.get();
  return snapshot.docs.map((doc) => doc.data());
}
async function addTransaction(obj) {
  const obb = {};
  obb.ts = Date.now();
  obb.state = obj.state;
  obb.weight = obj.weight;
  obb.from = obj.from;
  obb.to = obj.to;
  obb.cost = obj.cost;
  obb.id = generateAutoId()
  console.log(obb.id)
  pineRef.doc(obb.id).set(obb).then(function () {
    //console.log("Successfully Added");
    
  });
  return obb;
}

function generateAutoId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let autoId = "";
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
}

async function deleteTrans(id){
    const res = await pineRef.doc(id).delete();
}

async function editTransaction(transactionId,transaction) {
  pineRef.doc(transactionId).set(transaction,{merge:true}).then(function () {
    //console.log("Successfully Added");
    
  });
}

export { getTransactions,addTransaction,deleteTrans,editTransaction,generateAutoId };
