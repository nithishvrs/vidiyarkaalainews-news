// 1. தேவையான Firebase SDK Modules-ஐ இறக்குமதி செய்யவும்
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

// 2. Firebase கான்பிகுரேஷன்
const firebaseConfig = {
  apiKey: "AIzaSyDHWLYJMHLlwm9RH5vLIQ_PNXN7xLTxOIo",
  authDomain: "vidiyarkaalainews-93cff.firebaseapp.com",
  projectId: "vidiyarkaalainews-93cff",
  storageBucket: "vidiyarkaalainews-93cff.firebasestorage.app",
  messagingSenderId: "200643367368",
  appId: "1:200643367368:web:662d31246b8ce5f2d4f0fd",
  measurementId: "G-JPJB83JP3T"
};

// 3. முதலில் Firebase App-ஐ Initialize செய்ய வேண்டும்
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 4. Initialize செய்யப்பட்ட 'app'-ஐ Auth-க்கு அனுப்ப வேண்டும்
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 5. Google Login Function
window.googleLogin = function() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Logged in user:", user);

      const profileImage = document.getElementById("profile-image");
      if (profileImage) {
        profileImage.src = user.photoURL;
        profileImage.alt = user.displayName;
      }

      alert("Login Successful! Welcome " + user.displayName);
    })
    .catch((error) => {
      console.error("Login Error:", error.message);
      alert("Login failed: " + error.message);
    });
};


let currentSlideIndex = 0;

function openArticle(title, time, author, imageSrc1, imageSrc2, content, video) {
  document.getElementById('d-title').innerText = title;
  document.getElementById('d-time').innerText = time;
  document.getElementById('d-author').innerText = author;
  document.getElementById('d-content').innerText = content;

  // Reset Slider Position
  currentSlideIndex = 0;
  document.getElementById('slider-track').style.transform = 'translateX(0%)';

  var img1 = document.getElementById('d-image');
  var img2 = document.getElementById('d-image2');
  var bgBlur = document.getElementById('d-bg-blur');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');

  // Set First Image & Blur Background
  if (img1) img1.src = imageSrc1;
  if (bgBlur) bgBlur.src = imageSrc1;

  // 2வது படம் இருந்தால் Slider Arrows காட்டும், இல்லையென்றால் மறைக்கும்
  if (imageSrc2 && imageSrc2 !== 'null') {
    img2.src = imageSrc2;
    img2.style.display = 'block';
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
  } else {
    img2.style.display = 'none';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }

  document.getElementById('list-view').style.display = 'none';
  document.getElementById('detail-view').style.display = 'block';
  window.scrollTo(0, 0);
}

// Next / Previous Click Function
function moveSlide(direction) {
  const track = document.getElementById('slider-track');
  currentSlideIndex += direction;

  if (currentSlideIndex > 1) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = 1;
  }

  track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

  // Change Background Blur according to active image
  var img1 = document.getElementById('d-image').src;
  var img2 = document.getElementById('d-image2').src;
  document.getElementById('d-bg-blur').src = (currentSlideIndex === 0) ? img1 : img2;
}

function showList() {
  document.getElementById('detail-view').style.display = 'none';
  document.getElementById('list-view').style.display = 'block';
  window.scrollTo(0, 0);
}




