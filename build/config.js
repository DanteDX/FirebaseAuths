var firebaseConfig = {
  apiKey: "AIzaSyAyQ1weLTQMokGxZQr7PjnKCPBq35aIE_M",
  authDomain: "authdemo-bc692.firebaseapp.com",
  projectId: "authdemo-bc692",
  storageBucket: "authdemo-bc692.appspot.com",
  messagingSenderId: "270910472116",
  appId: "1:270910472116:web:2e8eb691e62e2a54fcfce1",
  measurementId: "G-9HJBMJ5NEG",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
db.settings({ timestamsInSnapshots: true });
