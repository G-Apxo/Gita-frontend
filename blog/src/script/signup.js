
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import {doc, getFirestore, setDoc} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
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

const email = document.getElementById("email");
const password = document.getElementById("password");
const name = document.getElementById("name");
const lastName = document.getElementById("lastName");

const auth = getAuth();
const db = getFirestore(app);
const signIn = document.getElementById("submit");
const data = {
    email: email.value,
    name: name.value,
    lastName: lastName.value,
}
console.log(data)
signIn.addEventListener("click", (e) => {
    e.preventDefault();
    const emailValue = email.value;
    const passwordValue = password.value;
    console.log(emailValue, passwordValue);
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((res) => {
        const user = res.user;
        console.log(user);
        setDoc(doc(db, "users", user.uid),  {
            email: email.value,
            name: name.value,
            lastName: lastName.value,
        }).then(() => {
            console.log("success");
            window.location.href = "dashboard.html";
        }).catch((error) => {
            console.log(error);
        })
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("email", JSON.stringify(user));
    }).catch((error)=> {
        alert(error.message);
    })
 });
