// 1. குறள் தொடங்கும் நாள் (நேற்றைய தேதியை வைப்பதால் இன்று குறள் #2 தோன்றும்)
const START_DATE = new Date("2026-09-08");
START_DATE.setHours(0, 0, 0, 0);

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

// எத்தனை நாட்கள் கடந்துள்ளன என்பதை கணக்கிட்டு தினமும் 2, 3, 4 என வரிசையாக வரவழைத்தல்
const diffTime = TODAY - START_DATE;
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
const kuralNumber = ((diffDays >= 0 ? diffDays : 0) % 1330) + 1; 

// Badge-ல் குறள் எண்
document.getElementById("kural-number-badge").innerText = `குறள் #${kuralNumber}`;

// 2. Real-time Live Timer
function updateLiveTimer() {
  const now = new Date();
  
  const daysTamil = ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"];
  const monthsTamil = ["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"];

  const dayName = daysTamil[now.getDay()];
  const date = now.getDate();
  const month = monthsTamil[now.getMonth()];
  const year = now.getFullYear();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  const dateString = `${dayName}, ${date} ${month} ${year} (திருக்குறள் ${kuralNumber}/1330)`;
  const timeString = ` ${hours}:${minutes}:${seconds} ${ampm}`;

  if(document.getElementById("date-text")) {
    document.getElementById("date-text").innerText = dateString;
  }
  if(document.getElementById("time-text")) {
    document.getElementById("time-text").innerText = timeString;
  }
}

setInterval(updateLiveTimer, 1000);
updateLiveTimer();

// 3. Thirukkural Data Fetch
fetch(`https://raw.githubusercontent.com/adithyabsk/Thirukkural-API/main/thirukkural.json`)
  .then(response => response.json())
  .then(data => {
    const currentKural = data.kural.find(k => k.Number === kuralNumber);
    
    if(currentKural) {
      document.getElementById("kural-line1").innerText = currentKural.Line1;
      document.getElementById("kural-line2").innerText = currentKural.Line2;
      document.getElementById("kural-meaning").innerHTML = `<strong>பொருள்:</strong> ${currentKural.mv || currentKural.sp || currentKural.mk}`;
    }
  })
  .catch(error => {
    // Network இல்லையென்றால் குறள் #2-ஐ இயல்பாகக் காட்டுதல்
    document.getElementById("kural-line1").innerText = "இருள்சேர் இருவினையும் சேரா இறைவன்";
    document.getElementById("kural-line2").innerText = "பொருள்சேர் புகழ்புரிந்தார் மாட்டு.";
    document.getElementById("kural-meaning").innerHTML = `<strong>பொருள்:</strong> இறைவனின் மெய்யான புகழை விரும்பிப் போற்றுபவர்களிடம், அறியாமையால் விளையும் நல்வினை, தீவினை ஆகிய இருவகை வினைகளும் (நன்மை, தீமை தரும் கர்ம வினைகள்) சேருவதில்லை`;
  });



  function openArticle(title, date, author, image, content) {
    // "நீதி கிடைக்குமா..." என்ற வரியை மட்டும் Grey நிறத்தில் மாற்றுகிறது
    let formattedTitle = title.replace(
        'நீதி கிடைக்குமா.? கர்ப்பிணி பெண்ணின் இறப்பிற்கு.??', 
        '<span style="color: #707070;">நீதி கிடைக்குமா.? கர்ப்பிணி பெண்ணின் இறப்பிற்கு.??</span>'
    );

    // Modal-ன் Heading element-க்கு innerHTML ஆக செட் செய்யவும்
    document.getElementById('modal-heading').innerHTML = formattedTitle;
}