
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
import {doc,getFirestore, collection, getDocs, setDoc} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import { getStorage, ref,uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";

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
const storage = getStorage();

const userName = document.getElementById("name");
const blogList = document.getElementById("blogList")
// get my personal information
const myPErsonalDAta = await getDocs(collection(db, "users"));
const user = localStorage.getItem("email");
const email = JSON.parse(user).email;
let personalData;
myPErsonalDAta.forEach((doc) => {
  const data = doc.data();
  // filter data with email to show only my data 
  if(data.email == email){
    personalData = data;
  }
});
userName.innerHTML = personalData.name + " " + personalData.lastName;


// get my blog data
const querySnapshot = await getDocs(collection(db, "blog"));

querySnapshot.forEach((doc) => {
    const data = doc.data();
    if(data.email == email){
      blogList.innerHTML += `
      <div class="col-6 row justify-content-center flex-column align-items-start gap-2">
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
    }
}
)



// Post Blog to database

const title = document.getElementById("title");
const description = document.getElementById("description");
const tags = document.getElementById("tags");
const image = document.getElementById("image");
const date = document.getElementById("date");
const submit = document.getElementById("submit");

let imageURL
const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(uploadTask.ref);
  console.log(downloadURL);
  imageURL = downloadURL;
  return downloadURL;
} 


submit.addEventListener("click", async (e) => {
  e.preventDefault();

  const titleValue = title.value;
  const descriptionValue = description.value;
  const tagsValue = tags.value;
  const dateValue = date.value;

  try {
      // Wait for the image to be uploaded and get the URL
      const uploadedImageUrl = await uploadImage(image.files[0]);

      // Proceed with setting the document
      await setDoc(doc(db, "blog", titleValue), {
          title: titleValue,
          description: descriptionValue,
          tags: tagsValue,
          image: uploadedImageUrl,
          date: dateValue,
          email: email,
          name: personalData.name,
          lastName: personalData.lastName,
          id: Math.random().toString(36).substr(2, 9)
      });

      console.log("success");
  } catch (error) {
      console.error(error);
  }
});
