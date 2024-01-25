
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
    console.log(data)
    const blogEl = document.createElement("div")
    blogEl.classList.add('blog_wrapper', 'col-6', 'row', 'justify-content-center', 'flex-column', 'align-items-start', 'gap-2')
    blogEl.innerHTML += `
            <div>
            <img src="${data.image}" alt="" class="blog_img_custom">
            <span class="badge_custom">${data.tags}</span>
            <h2>
                ${data.title}
            </h2>
            <p class="date text-start">
                ${data.date}
            </p>
            <p class="content text-start">
                ${data.description}
            </p>
            <div class="row">
                <div class="col-1">
                    <img src="./src/profile.png" alt="" class="img-fluid">
                </div>
                <div class="col-5">
                    <h4>
                        ${data.name} ${data.lastName}
                    </h4>
                </div>
            </div>
        </div>
            `

            blogList.appendChild(blogEl)
            blogEl.addEventListener("click", () => {
        window.location.href = `./blogdescription.html?id=${data.id}`
    })
})