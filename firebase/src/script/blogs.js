
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import {getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCEVGqi_HPO6rHj3B2QQSbO4i40CxklrHk",
  authDomain: "commschool-1e516.firebaseapp.com",
  projectId: "commschool-1e516",
  storageBucket: "commschool-1e516.appspot.com",
  messagingSenderId: "311802289681",
  appId: "1:311802289681:web:d120d5925532688ff55bb0",
  measurementId: "G-1DNMBJV0Y9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const blogList = document.getElementById("blogList")


const querySnapshot = await getDocs(collection(db, "blog"));

querySnapshot.forEach((doc) => {
    const data = doc.data();
    blogList.innerHTML += `
    <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
    <div class="card-body">
    <h5 class="card-title">${data.title}</h5>
    <p class="card-text">${data.description}</p>
    `
})