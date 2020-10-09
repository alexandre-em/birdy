import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyANfzaX_07TVqZ9q8X_eL0q_4nfvnuq1KQ",
    authDomain: "birdy-app-em.firebaseapp.com",
    databaseURL: "https://birdy-app-em.firebaseio.com",
    projectId: "birdy-app-em",
    storageBucket: "birdy-app-em.appspot.com",
    messagingSenderId: "775932110959",
    appId: "1:775932110959:web:92b4859a7fc8051eeac59a"
  })

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };