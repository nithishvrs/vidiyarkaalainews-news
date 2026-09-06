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