// Firebase Auth மற்றும் Google Provider-ஐ இறக்குமதி செய்யவும் (Firebase v9/v10 Modular SDK)
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Auth மற்றும் Provider-ஐ செட் பண்ணுதல்
const auth = getAuth();
const provider = new GoogleAuthProvider();

// உங்கள் span-ல் இருக்கும் onclick="googleLogin()" பங்க்ஷன்
window.googleLogin = function() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // லாகின் வெற்றி பெற்றால் யூசர் தகவல்கள் கிடைக்கும்
      const user = result.user;
      console.log("Logged in user:", user);

      // லாகின் செய்தவரின் ப்ரொபைல் படத்தையும் பெயரையும் மாற்ற
      const profileImage = document.getElementById("profile-image");
      if (profileImage) {
        profileImage.src = user.photoURL; // கூகுள் ப்ரொபைல் படம்
        profileImage.alt = user.displayName;
      }

      alert("Login Successful! Welcome " + user.displayName);
    })
    .catch((error) => {
      console.error("Login Error:", error.message);
      alert("Login failed: " + error.message);
    });
};