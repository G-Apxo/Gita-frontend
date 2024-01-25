
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

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
console.log(myParam);
const querySnapshot = await getDocs(collection(db, "blog"));

querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log(data)
    if(data.id == myParam) {
    blogList.innerHTML += `
    <div class="col-12 row justify-content-center flex-column align-items-start gap-2">
                    <span class="badge_custom">${data.tags}</span>
                    <p class="date text-start">
                        ${data.date}
                    </p>
                    <h2>
                        ${data.title}
                  </h2>
                    <img src="${data.image}" alt="" class="img-fluid">
                    <p class="content text-start">
                      <div class="row">
                        <div class="col-1">
                            <img src="./src/profile.png" alt="" class="img-fluid">
                        </div>
                        <div class="col-5">
                            <h4>${data.name} ${data.lastNAme}</h4>
                        </div>
                    </div>
                       ${data.description}
                    </p>
                </div>
    `
}
})