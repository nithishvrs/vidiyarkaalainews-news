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


 // 1. தினசரி குறள் கணக்கீடு (இன்றைய நாளில் இருந்து குறள் #1 தொடங்கும்)
    const START_DATE = new Date();
    START_DATE.setHours(0, 0, 0, 0);

    const TODAY = new Date();
    TODAY.setHours(0, 0, 0, 0);

    const diffTime = TODAY - START_DATE;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const kuralNumber = (diffDays % 1330) + 1;

    document.getElementById("kural-number-badge").innerText = `குறள் #${kuralNumber}`;

    // 2. Real-time Live Timer function (ஒவ்வொரு வினாடியும் நேரம் மாறும்)
    function updateLiveTimer() {
      const now = new Date();
      
      const daysTamil = ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"];
      const monthsTamil = ["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"];

      const dayName = daysTamil[now.getDay()];
      const date = now.getDate();
      const month = monthsTamil[now.getMonth()];
      const year = now.getFullYear();

      // நேரத்தை format செய்தல் (AM/PM)
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      hours = hours % 12;
      hours = hours ? hours : 12; 
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      const dateString = `${dayName}, ${date} ${month} ${year} (நாள் ${kuralNumber}/1330)`;
      const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

      document.getElementById("date-text").innerText = dateString;
      document.getElementById("time-text").innerText = timeString;
    }

    // நேரத்தை உடனுக்குடன் புதுப்பிக்க 1 வினாடிக்கு ஒருமுறை இயங்கும்
    setInterval(updateLiveTimer, 1000);
    updateLiveTimer();

    // 3. API மூலம் திருக்குறளை எடுத்து எழுதுதல்
    fetch(`https://api-thirukkural.vercel.app/api?num=${kuralNumber}`)
      .then(response => response.json())
      .then(data => {
        if(data && data.line1) {
          document.getElementById("kural-line1").innerText = data.line1;
          document.getElementById("kural-line2").innerText = data.line2;
          document.getElementById("kural-meaning").innerHTML = `<strong>பொருள்:</strong> ${data.tam_exp}`;
        }
      })
      .catch(error => {
        console.log("API Error, using default text");
      });