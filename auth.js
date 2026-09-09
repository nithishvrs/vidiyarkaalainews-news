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



// clock
        function updateClock() {
            const now = new Date();
            // தேதியை விரும்பிய ফরম্যাটে மாற்ற (உதாரணம்: Sunday, 06 Dec 2026)
            const optionsDate = { weekday: 'long', year: 'numeric', month: 'short', day: '2-digit' };
            const dateString = now.toLocaleDateString('en-GB', optionsDate);
            // நேரத்தை மாற்ற (மணி, நிமிடம், வினாடி)
            const timeString = now.toLocaleTimeString();
            
            // இரண்டையும் சேர்த்து டிஸ்ப்ளே செய்தல்
            document.getElementById('liveClock').innerText = dateString + ' - ' + timeString;
        }

        // உடனே ஒருமுறை ரன் ஆகும்
        updateClock();
        
        // ஒவ்வொரு வினாடிக்கும் (1000 ms) நேரம் அப்டேட் ஆகும்
        setInterval(updateClock, 1000);


