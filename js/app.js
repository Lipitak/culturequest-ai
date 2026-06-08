// CultureQuest AI - India's Cultural Passport
// Application Engine

// Global State
let state = {
  userName: "Explorer",
  xp: 0,
  level: 1,
  rank: "Traveler",
  earnedStamps: [], // Array of city IDs
  avatar: "🧑🏽‍🚀",
  passportCoverTheme: "crimson",
  dailyQuests: [
    { id: "explore-first", text: "Select a city on the map", done: false, xp: 50 },
    { id: "win-quiz", text: "Complete your first cultural quiz", done: false, xp: 100 },
    { id: "listen-story", text: "Listen to a folk story scene", done: false, xp: 50 }
  ],
  activePage: "landing",
  activeCity: null,
  currentQuestionIndex: 0,
  correctAnswersCount: 0,
  currentStoryIndex: 0,
  audioMuted: false,
  aiQuizPassed: false
};

// Rank Thresholds
const RANKS = [
  { name: "Traveler", minLvl: 1 },
  { name: "Explorer", minLvl: 2 },
  { name: "Researcher", minLvl: 3 },
  { name: "Heritage Guardian", minLvl: 4 },
  { name: "Culture Master", minLvl: 5 }
];

// Audio System (Web Audio API Synthesizer)
let audioCtx = null;

function initAudio() {
  if (audioCtx) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    console.warn("Web Audio API not supported in this browser");
  }
}

function playSound(type) {
  if (state.audioMuted) return;
  initAudio();
  if (!audioCtx) return;

  // Resume context if suspended (browser security)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  switch (type) {
    case 'click':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
      break;

    case 'correct':
      // Sitar arpeggio (Bhupali raga ascending)
      // Mute outer oscillator
      gain.gain.setValueAtTime(0, now);
      osc.start(now);
      osc.stop(now + 0.01);

      const sitarNotes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C5, D5, E5, G5, A5, C6
      sitarNotes.forEach((freq, idx) => {
        const t = now + (idx * 0.06);
        const pluckOsc = audioCtx.createOscillator();
        const buzzOsc = audioCtx.createOscillator();
        const pluckGain = audioCtx.createGain();
        
        // Triangle wave for warm hollow string pluck
        pluckOsc.type = 'triangle';
        pluckOsc.frequency.setValueAtTime(freq, t);
        
        // Sawtooth wave at octave higher for metallic bridge resonance (sympathetic buzz)
        buzzOsc.type = 'sawtooth';
        buzzOsc.frequency.setValueAtTime(freq * 2, t);
        
        pluckOsc.connect(pluckGain);
        buzzOsc.connect(pluckGain);
        pluckGain.connect(audioCtx.destination);
        
        pluckGain.gain.setValueAtTime(0.08, t);
        pluckGain.gain.exponentialRampToValueAtTime(0.002, t + 0.25);
        
        pluckOsc.start(t);
        buzzOsc.start(t);
        pluckOsc.stop(t + 0.3);
        buzzOsc.stop(t + 0.3);
      });
      break;

    case 'wrong':
      // Breathy Bansuri flute meend slide (G4 -> C4)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(392.00, now); // G4
      osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.45); // C4 slide
      
      const wrongFilter = audioCtx.createBiquadFilter();
      wrongFilter.type = 'lowpass';
      wrongFilter.frequency.setValueAtTime(600, now); // Filter high frequencies for hollow tone
      
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.08); // Breathy swell
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.48);
      
      osc.disconnect();
      osc.connect(wrongFilter);
      wrongFilter.connect(gain);
      
      osc.start(now);
      osc.stop(now + 0.5);
      break;

    case 'stamp':
      // Meditative Tanpura celebration drone chord (Sa - Pa - Sa - Sa)
      gain.gain.setValueAtTime(0, now);
      osc.start(now);
      osc.stop(now + 0.01);

      const droneNotes = [130.81, 196.00, 261.63, 523.25]; // C3, G3, C4, C5
      droneNotes.forEach((freq, idx) => {
        const t = now + (idx * 0.04);
        const droneOsc = audioCtx.createOscillator();
        const droneGain = audioCtx.createGain();
        const droneFilter = audioCtx.createBiquadFilter();
        
        droneOsc.type = (idx % 2 === 0) ? 'triangle' : 'sine';
        droneOsc.frequency.setValueAtTime(freq, t);
        
        // Gentle vibrato
        const vibrato = audioCtx.createOscillator();
        const vibratoGain = audioCtx.createGain();
        vibrato.frequency.value = 5.5; // Hz
        vibratoGain.gain.value = 3; // frequency deviation
        vibrato.connect(vibratoGain);
        vibratoGain.connect(droneOsc.frequency);
        
        droneFilter.type = 'lowpass';
        droneFilter.frequency.setValueAtTime(800, t);

        droneOsc.connect(droneFilter);
        droneFilter.connect(droneGain);
        droneGain.connect(audioCtx.destination);
        
        droneGain.gain.setValueAtTime(0.12, t);
        droneGain.gain.exponentialRampToValueAtTime(0.002, t + 1.4);
        
        vibrato.start(t);
        droneOsc.start(t);
        vibrato.stop(t + 1.5);
        droneOsc.stop(t + 1.5);
      });
      break;

    case 'levelup':
      // Ascending Raga celebration arpeggio (double-plucked sitar)
      gain.gain.setValueAtTime(0, now);
      osc.start(now);
      osc.stop(now + 0.01);

      const levelNotes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      levelNotes.forEach((freq, idx) => {
        const t = now + (idx * 0.08);
        const lOsc = audioCtx.createOscillator();
        const lGain = audioCtx.createGain();
        
        lOsc.type = 'triangle';
        lOsc.frequency.setValueAtTime(freq, t);
        
        lOsc.connect(lGain);
        lGain.connect(audioCtx.destination);
        
        lGain.gain.setValueAtTime(0.12, t);
        lGain.gain.exponentialRampToValueAtTime(0.005, t + 0.3);
        
        lOsc.start(t);
        lOsc.stop(t + 0.35);
      });
      break;
  }
}

// Speech Narration (Web Speech API)
let speechSynth = window.speechSynthesis;
let speechUtterance = null;
let isSpeaking = false;

function speakText(text, onStart, onEnd) {
  if (!speechSynth) {
    alert("Speech Synthesis is not supported in this browser.");
    return;
  }

  // Cancel any ongoing speech
  speechSynth.cancel();
  isSpeaking = false;

  if (!text) return;

  speechUtterance = new SpeechSynthesisUtterance(text);
  
  // Try to find a nice English voice with an Indian or clear accent
  const voices = speechSynth.getVoices();
  const indVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));
  if (indVoice) {
    speechUtterance.voice = indVoice;
  }
  
  speechUtterance.rate = 0.95; // Slightly slower for storytelling
  speechUtterance.pitch = 1.0;

  speechUtterance.onstart = () => {
    isSpeaking = true;
    if (onStart) onStart();
  };

  speechUtterance.onend = () => {
    isSpeaking = false;
    if (onEnd) onEnd();
  };

  speechUtterance.onerror = () => {
    isSpeaking = false;
    if (onEnd) onEnd();
  };

  speechSynth.speak(speechUtterance);
}

function stopSpeaking() {
  if (speechSynth) {
    speechSynth.cancel();
    isSpeaking = false;
  }
}

// Local Storage Management
function saveState() {
  localStorage.setItem("culturequest_state", JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem("culturequest_state");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    } catch (e) {
      console.error("Error loading saved state", e);
    }
  }
  applyCoverTheme(state.passportCoverTheme || "crimson");
}

// Routing & Navigation
function navigateTo(pageId) {
  playSound('click');
  stopSpeaking(); // Stop any speech when moving pages

  // Update State
  state.activePage = pageId;

  // DOM transitions
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(`${pageId}-page`);
  if (targetPage) {
    targetPage.classList.add("active");
    // Scroll page to top
    targetPage.scrollTop = 0;
  }

  // Update navigation items
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("data-page") === pageId) {
      item.classList.add("active");
    }
  });

  // Toggle header elements based on page
  const backBtn = document.getElementById("header-back-btn");
  const profileBtn = document.getElementById("header-profile-btn");
  
  if (pageId === "landing" || pageId === "dashboard") {
    backBtn.style.visibility = "hidden";
    profileBtn.style.visibility = "visible";
  } else {
    backBtn.style.visibility = "visible";
    profileBtn.style.visibility = "visible";
  }

  // Page Specific Init
  if (pageId === "dashboard") {
    renderDashboard();
  } else if (pageId === "map") {
    renderMap();
  } else if (pageId === "passport") {
    renderPassport();
  } else if (pageId === "achievements") {
    renderAchievements();
  } else if (pageId === "profile") {
    renderProfile();
  } else if (pageId === "ai-assistant") {
    initAIAssistant();
  }
}

// Go back in history
function goBack() {
  if (state.activePage === "quiz" || state.activePage === "story") {
    navigateTo("city-explore");
  } else if (state.activePage === "city-explore") {
    navigateTo("map");
  } else {
    navigateTo("dashboard");
  }
}

// Gamification Systems
function addXP(amount) {
  state.xp += amount;
  
  // Calculate Levels (Level 1: 0-200 XP, Level 2: 200-500 XP, Level 3: 500-1000 XP, etc.)
  const xpNeeded = state.level * 250;
  if (state.xp >= xpNeeded) {
    state.level++;
    state.xp = state.xp - xpNeeded; // Keep remainder
    playSound('levelup');
    showNotification(`Level Up! You are now Level ${state.level}`);
    recalculateRank();
  }
  saveState();
}

function recalculateRank() {
  let matchedRank = RANKS[0].name;
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (state.level >= RANKS[i].minLvl) {
      matchedRank = RANKS[i].name;
      break;
    }
  }
  state.rank = matchedRank;
}

function triggerQuestCompletion(questId) {
  const quest = state.dailyQuests.find(q => q.id === questId);
  if (quest && !quest.done) {
    quest.done = true;
    addXP(quest.xp);
    showNotification(`Completed Challenge: ${quest.text} (+${quest.xp} XP)`);
  }
}

function showNotification(message) {
  const toast = document.createElement("div");
  toast.style.position = "absolute";
  toast.style.bottom = "80px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.backgroundColor = "var(--color-crimson)";
  toast.style.color = "var(--color-parchment)";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "20px";
  toast.style.fontFamily = "Cinzel, serif";
  toast.style.fontSize = "0.75rem";
  toast.style.fontWeight = "700";
  toast.style.border = "1px solid var(--color-gold)";
  toast.style.boxShadow = "var(--shadow-md)";
  toast.style.zIndex = "1000";
  toast.style.width = "85%";
  toast.style.textAlign = "center";
  toast.style.animation = "slideUpToast 0.3s ease forwards";
  toast.textContent = message;

  document.querySelector(".app-frame").appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideDownToast 0.3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// 1. Dashboard Renderer
function renderDashboard() {
  document.getElementById("dash-xp-val").textContent = state.xp;
  document.getElementById("dash-level-val").textContent = state.level;
  document.getElementById("dash-rank-val").textContent = state.rank;
  
  const xpNeeded = state.level * 250;
  const progressPercent = Math.min((state.xp / xpNeeded) * 100, 100);
  document.getElementById("dash-xp-progress").style.width = `${progressPercent}%`;
  
  document.getElementById("dash-cities-explored").textContent = state.earnedStamps.length;
  document.getElementById("dash-unlocked-stamps").textContent = state.earnedStamps.length;

  // Render recent stamps (visual list of small stamp icons)
  const recentContainer = document.getElementById("dash-recent-stamps");
  recentContainer.innerHTML = "";
  if (state.earnedStamps.length === 0) {
    recentContainer.innerHTML = `<span style="font-size:0.75rem; color: var(--color-ink-light); font-style:italic;">No stamps collected yet. Go explore the map!</span>`;
  } else {
    state.earnedStamps.forEach(cityId => {
      const city = CULTURAL_DATA[cityId];
      if (city) {
        const item = document.createElement("div");
        item.className = "flex-row";
        item.style.backgroundColor = "rgba(0,0,0,0.03)";
        item.style.padding = "6px 10px";
        item.style.borderRadius = "20px";
        item.style.border = "1.5px solid var(--color-gold)";
        item.innerHTML = `<span style="font-size:1.1rem">${city.stampSymbol}</span> <span style="font-size:0.7rem; font-weight:700; font-family:'Cinzel'">${city.name}</span>`;
        recentContainer.appendChild(item);
      }
    });
  }

  // Render Daily Challenges
  const challengeContainer = document.getElementById("dash-challenges");
  challengeContainer.innerHTML = "";
  state.dailyQuests.forEach(quest => {
    const item = document.createElement("div");
    item.className = "challenge-item";
    item.innerHTML = `
      <i class="${quest.done ? 'fas fa-check-circle challenge-check' : 'far fa-circle challenge-check'}" style="${quest.done ? 'color: var(--color-success)' : 'color: var(--color-ink-light)'}"></i>
      <span class="challenge-text" style="${quest.done ? 'text-decoration: line-through; opacity: 0.6' : ''}">${quest.text}</span>
      <span class="challenge-xp">+${quest.xp} XP</span>
    `;
    challengeContainer.appendChild(item);
  });

  // Render Recommended Scroller
  const scroller = document.getElementById("dash-recommend-scroller");
  scroller.innerHTML = "";
  Object.keys(CULTURAL_DATA).forEach(cityId => {
    // Recommend cities not yet stamped
    if (!state.earnedStamps.includes(cityId)) {
      const city = CULTURAL_DATA[cityId];
      const card = document.createElement("div");
      card.className = "recommend-card";
      card.onclick = () => selectCity(cityId);
      card.innerHTML = `
        <span style="font-size: 1.5rem; text-align:center">${city.stampSymbol}</span>
        <h4 class="recommend-city-name">${city.name}</h4>
        <p class="recommend-city-state">${city.state}</p>
      `;
      scroller.appendChild(card);
    }
  });

  if (scroller.children.length === 0) {
    scroller.innerHTML = `<div style="font-size: 0.75rem; text-align: center; width: 100%; font-style: italic; color: var(--color-emerald)">You have conquered India! All cultural stamps earned.</div>`;
  }
}

// 2. Map Page Renderer
function renderMap() {
  const mapContainer = document.getElementById("map-page");
  // Update map pins completed states
  Object.keys(CULTURAL_DATA).forEach(cityId => {
    const pin = document.getElementById(`map-pin-${cityId}`);
    if (pin) {
      if (state.earnedStamps.includes(cityId)) {
        pin.classList.add("earned");
      } else {
        pin.classList.remove("earned");
      }
    }
  });
}

// Helper to generate distressed ink visa stamps
function getStampHTML(city, isEarned) {
  if (!isEarned) {
    return `
      <div class="passport-stamp-locked">
        <i class="fas fa-lock"></i>
        <div class="stamp-slot-label">LOCKED</div>
      </div>
    `;
  }
  
  // Custom geometries based on destination
  let shapeClass = "stamp-shape-circle";
  if (city.id === "ajmer") {
    shapeClass = "stamp-shape-octagon";
  } else if (city.id === "varanasi") {
    shapeClass = "stamp-shape-triangle";
  } else if (city.id === "mysore") {
    shapeClass = "stamp-shape-shield";
  } else if (city.id === "udaipur") {
    shapeClass = "stamp-shape-double-circle";
  } else if (city.id === "kolkata") {
    shapeClass = "stamp-shape-scalloped";
  }
  
  return `
    <div class="ink-stamp ${shapeClass}">
      <span class="stamp-top-text">BHARAT ENTRY</span>
      <span class="stamp-center-symbol">${city.stampSymbol}</span>
      <span class="stamp-city-name">${city.stampLabel || city.name.toUpperCase()}</span>
      <span class="stamp-date-text">06 JUN 2026</span>
    </div>
  `;
}

// 3. Passport Renderer
function renderPassport() {
  document.getElementById("pass-user-name").textContent = state.userName.toUpperCase();
  document.getElementById("pass-user-level").textContent = `L-${state.level.toString().padStart(2, '0')}`;
  document.getElementById("pass-user-rank").textContent = state.rank.toUpperCase();
  document.getElementById("pass-user-id").textContent = `IND-${(10000 + state.xp).toString()}`;
  document.getElementById("pass-avatar").textContent = state.avatar;

  // Render collected stamps percentage
  const totalCities = Object.keys(CULTURAL_DATA).length;
  const percent = Math.round((state.earnedStamps.length / totalCities) * 100);
  document.getElementById("pass-percent-val").textContent = `${percent}%`;
  document.getElementById("pass-percent-fill").style.width = `${percent}%`;

  // Render stamp visa grid
  const grid = document.getElementById("pass-stamps-grid");
  grid.innerHTML = "";
  Object.keys(CULTURAL_DATA).forEach(cityId => {
    const city = CULTURAL_DATA[cityId];
    const isEarned = state.earnedStamps.includes(cityId);
    
    const slot = document.createElement("div");
    slot.className = `passport-stamp-slot ${isEarned ? 'active' : ''}`;
    slot.innerHTML = getStampHTML(city, isEarned);
    grid.appendChild(slot);
  });
}

// 4. Achievements Page Renderer
function renderAchievements() {
  const container = document.getElementById("achievements-grid");
  container.innerHTML = "";

  const list = [
    { id: "first-step", name: "First Step", desc: "Collect 1 cultural passport stamp", check: () => state.earnedStamps.length >= 1, icon: "🚶🏽" },
    { id: "heritage-custodian", name: "Custodian", desc: "Collect 3 cultural passport stamps", check: () => state.earnedStamps.length >= 3, icon: "🏰" },
    { id: "culture-master", name: "Master", desc: "Collect all 6 cultural stamps of India", check: () => state.earnedStamps.length >= 6, icon: "👑" },
    { id: "scholar", name: "Scholar", desc: "Listen to a traditional story narration", check: () => state.dailyQuests.find(q => q.id === "listen-story").done, icon: "📜" },
    { id: "sage", name: "Perfect Score", desc: "Earn a stamp with a perfect quiz score", check: () => state.dailyQuests.find(q => q.id === "win-quiz").done, icon: "🧠" },
    { id: "level-up", name: "Level Ascent", desc: "Reach Level 3 Explorer status", check: () => state.level >= 3, icon: "⛰️" },
    { id: "ai-explorer", name: "AI Explorer", desc: "Pass an AI-generated monument quiz", check: () => state.aiQuizPassed, icon: "🤖" }
  ];

  list.forEach(badge => {
    const unlocked = badge.check();
    const card = document.createElement("div");
    card.className = `badge-card ${unlocked ? '' : 'locked'}`;
    card.innerHTML = `
      <div class="badge-icon">${badge.icon}</div>
      <div class="badge-name">${badge.name}</div>
      <div class="badge-desc">${badge.desc}</div>
    `;
    container.appendChild(card);
  });
}

// 5. Profile Page Renderer
function applyCoverTheme(themeName) {
  const landingCover = document.getElementById("landing-passport-cover");
  const bookletCover = document.getElementById("passport-booklet-cover");
  const themes = ["theme-crimson", "theme-blue", "theme-emerald", "theme-saffron"];
  
  if (landingCover) {
    themes.forEach(t => landingCover.classList.remove(t));
    landingCover.classList.add(`theme-${themeName}`);
  }
  if (bookletCover) {
    themes.forEach(t => bookletCover.classList.remove(t));
    bookletCover.classList.add(`theme-${themeName}`);
  }
}

function setCoverTheme(themeName) {
  playSound('click');
  state.passportCoverTheme = themeName;
  applyCoverTheme(themeName);
  
  document.querySelectorAll(".cover-option-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.classList.contains(`theme-${themeName}`)) {
      btn.classList.add("active");
    }
  });
  saveState();
}

function renderProfile() {
  document.getElementById("profile-name-input").value = state.userName;
  
  // Set current avatar select
  document.querySelectorAll(".avatar-option").forEach(opt => {
    opt.classList.remove("selected");
    if (opt.getAttribute("data-avatar") === state.avatar) {
      opt.classList.add("selected");
    }
  });

  // Highlight active passport cover select button
  const theme = state.passportCoverTheme || "crimson";
  document.querySelectorAll(".cover-option-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.classList.contains(`theme-${theme}`)) {
      btn.classList.add("active");
    }
  });

  document.getElementById("profile-level-val").textContent = state.level;
  document.getElementById("profile-rank-val").textContent = state.rank;
  document.getElementById("profile-xp-val").textContent = state.xp;
  document.getElementById("profile-stamps-val").textContent = state.earnedStamps.length;
}

function selectAvatar(element, emoji) {
  playSound('click');
  state.avatar = emoji;
  document.querySelectorAll(".avatar-option").forEach(opt => {
    opt.classList.remove("selected");
  });
  element.classList.add("selected");
  saveState();
}

function saveProfileName() {
  const val = document.getElementById("profile-name-input").value.trim();
  if (val) {
    state.userName = val;
    saveState();
    showNotification("Profile updated successfully!");
  }
}

function resetProgress() {
  if (confirm("Are you sure you want to reset your cultural passport? All stamps, levels, and XP will be cleared!")) {
    state = {
      userName: "Explorer",
      xp: 0,
      level: 1,
      rank: "Traveler",
      earnedStamps: [],
      avatar: "🧑🏽‍🚀",
      passportCoverTheme: "crimson",
      dailyQuests: [
        { id: "explore-first", text: "Select a city on the map", done: false, xp: 50 },
        { id: "win-quiz", text: "Complete your first cultural quiz", done: false, xp: 100 },
        { id: "listen-story", text: "Listen to a folk story scene", done: false, xp: 50 }
      ],
      activePage: "landing",
      activeCity: null,
      currentQuestionIndex: 0,
      correctAnswersCount: 0,
      currentStoryIndex: 0,
      audioMuted: false,
      aiQuizPassed: false
    };
    applyCoverTheme("crimson");
    resetAIAssistant();
    saveState();
    navigateTo("landing");
    showNotification("Passport reset successfully.");
  }
}

// 6. City Select & Explorer flow
function selectCity(cityId) {
  state.activeCity = cityId;
  const city = CULTURAL_DATA[cityId];
  if (!city) return;

  triggerQuestCompletion("explore-first");

  // Render Banner & Header
  document.getElementById("city-title").textContent = city.name;
  document.getElementById("city-tagline").textContent = city.tagline;
  document.getElementById("city-intro-text").textContent = city.intro;

  const banner = document.querySelector(".city-explore-banner");
  if (banner) {
    if (city.image) {
      banner.style.backgroundImage = `url('${city.image}')`;
      banner.style.backgroundSize = "cover";
      banner.style.backgroundPosition = "center";
    } else {
      banner.style.backgroundImage = "none";
      banner.style.backgroundColor = city.themeColor || "var(--color-indigo)";
    }
  }

  // Check Lock State
  const isStamped = state.earnedStamps.includes(cityId);
  const lockedSection = document.getElementById("city-locked-section");
  const unlockedSection = document.getElementById("city-unlocked-section");
  const exploreTabs = document.getElementById("city-explore-tabs");

  if (isStamped) {
    lockedSection.style.display = "none";
    unlockedSection.style.display = "block";
    exploreTabs.style.display = "flex";
    
    // Fill tabs content
    document.getElementById("city-history-text").textContent = city.content.history;
    document.getElementById("city-traditions-text").textContent = city.content.traditions;
    document.getElementById("city-festivals-text").textContent = city.content.festivals;
    document.getElementById("city-food-text").textContent = city.content.foodCulture;
    document.getElementById("city-art-text").textContent = city.content.artCraft;
    
    // Places list
    const placesGrid = document.getElementById("city-places-grid");
    placesGrid.innerHTML = "";
    city.content.importantPlaces.forEach(place => {
      const card = document.createElement("div");
      card.className = "place-card";
      card.innerHTML = `<h4>${place.name}</h4><p>${place.desc}</p>`;
      placesGrid.appendChild(card);
    });

    // Facts list
    const factsList = document.getElementById("city-facts-list");
    factsList.innerHTML = "";
    city.content.facts.forEach(fact => {
      const li = document.createElement("li");
      li.style.fontSize = "0.85rem";
      li.style.marginBottom = "8px";
      li.style.color = "var(--color-ink-light)";
      li.textContent = fact;
      factsList.appendChild(li);
    });

    // Myths vs Facts
    const mythsBox = document.getElementById("city-myths-box");
    mythsBox.innerHTML = "";
    city.content.factVsMyth.forEach(item => {
      const card = document.createElement("div");
      card.className = "fact-vs-myth-card";
      card.innerHTML = `
        <h4>FACT VS MYTH</h4>
        <div class="myth-text"><strong>❌ Myth:</strong> ${item.myth}</div>
        <div class="fact-text"><strong>✅ Fact:</strong> ${item.fact}</div>
      `;
      mythsBox.appendChild(card);
    });

    // Set Active Tab to first
    switchCityTab('history');
  } else {
    lockedSection.style.display = "block";
    unlockedSection.style.display = "none";
    exploreTabs.style.display = "none";
  }

  navigateTo("city-explore");
}

function switchCityTab(tabName) {
  playSound('click');
  document.querySelectorAll(".city-tab").forEach(tab => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.remove("active");
  });

  const activeTab = document.querySelector(`.city-tab[data-tab="${tabName}"]`);
  const activePane = document.getElementById(`pane-${tabName}`);
  
  if (activeTab) activeTab.classList.add("active");
  if (activePane) activePane.classList.add("active");
}

// 7. Quiz Flow
function startQuiz() {
  const city = CULTURAL_DATA[state.activeCity];
  if (!city) return;

  state.currentQuestionIndex = 0;
  state.correctAnswersCount = 0;

  // Render question card
  renderQuestion();
  navigateTo("quiz");
}

function renderQuestion() {
  const city = CULTURAL_DATA[state.activeCity];
  const question = city.quiz[state.currentQuestionIndex];
  
  document.getElementById("quiz-city-name").textContent = `${city.name} Quiz`;
  document.getElementById("quiz-progress-text").textContent = `QUESTION ${state.currentQuestionIndex + 1} OF ${city.quiz.length}`;
  document.getElementById("quiz-question-text").textContent = question.question;

  const optionsContainer = document.getElementById("quiz-options-box");
  optionsContainer.innerHTML = "";

  question.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.innerHTML = opt;
    btn.onclick = () => selectQuizOption(index);
    optionsContainer.appendChild(btn);
  });

  // Hide feedback card
  const feedback = document.getElementById("quiz-feedback-box");
  feedback.classList.remove("show");

  // Hide next button
  document.getElementById("quiz-next-btn").style.display = "none";
}

function selectQuizOption(selectedIndex) {
  const city = CULTURAL_DATA[state.activeCity];
  const question = city.quiz[state.currentQuestionIndex];
  const options = document.querySelectorAll(".quiz-option");

  // Disable all options
  options.forEach(btn => btn.disabled = true);

  const isCorrect = selectedIndex === question.answer;

  if (isCorrect) {
    playSound('correct');
    options[selectedIndex].classList.add("correct");
    state.correctAnswersCount++;
  } else {
    playSound('wrong');
    options[selectedIndex].classList.add("wrong");
    options[question.answer].classList.add("correct");
  }

  // Render feedback and explain
  const feedback = document.getElementById("quiz-feedback-box");
  feedback.innerHTML = `
    <strong>${isCorrect ? '✨ Correct!' : '❌ Incorrect'}</strong>
    <p style="margin: 6px 0 0 0; font-size: 0.8rem">${question.explanation}</p>
  `;
  feedback.classList.add("show");

  // Toggle Next button or Finish
  const nextBtn = document.getElementById("quiz-next-btn");
  nextBtn.style.display = "block";
  if (state.currentQuestionIndex === city.quiz.length - 1) {
    nextBtn.textContent = "FINISH CHALLENGE";
  } else {
    nextBtn.textContent = "NEXT QUESTION";
  }
}

function handleQuizNext() {
  playSound('click');
  const city = CULTURAL_DATA[state.activeCity];
  
  if (state.currentQuestionIndex < city.quiz.length - 1) {
    state.currentQuestionIndex++;
    renderQuestion();
  } else {
    // Quiz finished
    evaluateQuizResult();
  }
}

function evaluateQuizResult() {
  const city = CULTURAL_DATA[state.activeCity];
  
  if (state.correctAnswersCount >= 2) {
    // PASS -> Award Stamp!
    triggerQuestCompletion("win-quiz");
    
    // Stamp Reward Animation Screen trigger
    const rewardScreen = document.getElementById("reward-stamp-screen");
    const stampBox = document.getElementById("reward-stamp-box");
    const stampSymbol = document.getElementById("reward-stamp-symbol");
    const label = document.getElementById("reward-stamp-label");
    
    stampSymbol.innerHTML = getStampHTML(city, true);
    label.textContent = city.stampLabel;
    
    rewardScreen.style.display = "flex";
    playSound('stamp');

    setTimeout(() => {
      stampBox.classList.add("stamped");
      
      // Update State
      if (!state.earnedStamps.includes(state.activeCity)) {
        state.earnedStamps.push(state.activeCity);
      }
      
      addXP(150); // Massive XP for stamps
    }, 400);

  } else {
    // FAILED
    alert(`You scored ${state.correctAnswersCount}/${city.quiz.length}. You need at least 2 correct answers to unlock the stamp. Don't worry, try again!`);
    selectCity(state.activeCity);
  }
}

function closeRewardScreen() {
  playSound('click');
  const rewardScreen = document.getElementById("reward-stamp-screen");
  const stampBox = document.getElementById("reward-stamp-box");
  
  rewardScreen.style.display = "none";
  stampBox.classList.remove("stamped");
  
  // Return to city page (which is now unlocked!)
  selectCity(state.activeCity);
}

// 8. Folk Story Flow
function viewFolkStories() {
  state.currentStoryIndex = 0;
  renderStoryScene();
  navigateTo("story");
}

function renderStoryScene() {
  const city = CULTURAL_DATA[state.activeCity];
  const story = city.content.folkStories[state.currentStoryIndex];
  
  document.getElementById("story-city-name").textContent = `${city.name} Folk Story`;
  document.getElementById("story-title-text").textContent = story.title;
  document.getElementById("story-desc-text").textContent = story.text;
  document.getElementById("story-highlight-box").textContent = story.highlight;
  
  // Set background image if defined, otherwise fall back to emoji symbol
  const imgBox = document.getElementById("story-image-placeholder");
  if (story.image) {
    imgBox.style.backgroundImage = `url('${story.image}')`;
    imgBox.style.backgroundSize = "cover";
    imgBox.style.backgroundPosition = "center";
    imgBox.textContent = "";
  } else {
    imgBox.style.backgroundImage = "none";
    imgBox.textContent = city.stampSymbol;
  }

  // Render visual timeline steps
  const timelineTracker = document.getElementById("story-timeline-tracker");
  if (timelineTracker) {
    timelineTracker.innerHTML = "";
    const totalScenes = city.content.folkStories.length;
    const progressWidth = totalScenes > 1 ? (state.currentStoryIndex / (totalScenes - 1)) * 100 : 0;
    
    const progressLine = document.createElement("div");
    progressLine.className = "timeline-progress-line";
    progressLine.style.width = `calc(${progressWidth}% - 48px)`;
    if (totalScenes > 1) {
      timelineTracker.appendChild(progressLine);
    }
    
    city.content.folkStories.forEach((_, idx) => {
      const step = document.createElement("div");
      step.className = `timeline-step ${idx === state.currentStoryIndex ? 'active' : (idx < state.currentStoryIndex ? 'completed' : '')}`;
      step.innerHTML = idx < state.currentStoryIndex ? '<i class="fas fa-check" style="font-size:0.55rem"></i>' : (idx + 1);
      step.onclick = () => {
        playSound('click');
        state.currentStoryIndex = idx;
        renderStoryScene();
      };
      timelineTracker.appendChild(step);
    });
  }

  // Pagination dots
  const dotsContainer = document.getElementById("story-dots-box");
  dotsContainer.innerHTML = "";
  city.content.folkStories.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.className = `story-dot ${idx === state.currentStoryIndex ? 'active' : ''}`;
    dot.onclick = () => {
      playSound('click');
      state.currentStoryIndex = idx;
      renderStoryScene();
    };
    dotsContainer.appendChild(dot);
  });

  // Story controls
  const prevBtn = document.getElementById("story-prev-btn");
  const nextBtn = document.getElementById("story-next-btn");

  if (state.currentStoryIndex === 0) {
    prevBtn.style.visibility = "hidden";
  } else {
    prevBtn.style.visibility = "visible";
  }

  if (state.currentStoryIndex === city.content.folkStories.length - 1) {
    nextBtn.textContent = "FINISH STORY";
  } else {
    nextBtn.textContent = "NEXT SCENE";
  }

  // Audio elements state reset
  const audioWaveform = document.getElementById("story-audio-waveform");
  const audioIcon = document.getElementById("story-audio-icon");
  if (audioWaveform) audioWaveform.classList.remove("playing");
  audioIcon.className = "fas fa-volume-up";
  stopSpeaking();
}

function handleStoryNext() {
  playSound('click');
  const city = CULTURAL_DATA[state.activeCity];
  
  if (state.currentStoryIndex < city.content.folkStories.length - 1) {
    state.currentStoryIndex++;
    renderStoryScene();
  } else {
    // Completed story
    selectCity(state.activeCity);
  }
}

function handleStoryPrev() {
  playSound('click');
  if (state.currentStoryIndex > 0) {
    state.currentStoryIndex--;
    renderStoryScene();
  }
}

function toggleStoryNarration() {
  const city = CULTURAL_DATA[state.activeCity];
  const story = city.content.folkStories[state.currentStoryIndex];
  const audioWaveform = document.getElementById("story-audio-waveform");
  const audioIcon = document.getElementById("story-audio-icon");

  initAudio(); // Initialize audio context

  if (isSpeaking) {
    stopSpeaking();
    if (audioWaveform) audioWaveform.classList.remove("playing");
    audioIcon.className = "fas fa-volume-up";
  } else {
    triggerQuestCompletion("listen-story");
    if (audioWaveform) audioWaveform.classList.add("playing");
    audioIcon.className = "fas fa-stop";
    
    // Build narration text
    const narrationText = `${story.title}. ${story.text} ... Key insight ... ${story.highlight}`;
    speakText(
      narrationText,
      () => {},
      () => {
        if (audioWaveform) audioWaveform.classList.remove("playing");
        audioIcon.className = "fas fa-volume-up";
      }
    );
  }
}

// 9. Utility toggle for Sound Muting
function toggleAudioMute() {
  state.audioMuted = !state.audioMuted;
  const muteIcon = document.getElementById("header-mute-icon");
  
  if (state.audioMuted) {
    muteIcon.className = "fas fa-volume-mute";
    stopSpeaking();
  } else {
    muteIcon.className = "fas fa-volume-up";
  }
  saveState();
}

// ==========================================
// 10. AI Assistant & Dynamic AI Quiz Systems
// ==========================================
let aiUploadWired = false;
let aiActiveMonument = null;
let aiChatMessages = [];
let aiQuizQuestions = [];
let aiQuizCurrentIdx = 0;
let aiQuizScore = 0;

function initAIAssistant() {
  // Hide API key warning by default
  document.getElementById("ai-key-warning").style.display = "none";
  
  if (aiUploadWired) return;
  
  const uploadBox = document.getElementById("ai-upload-box");
  const fileInput = document.getElementById("ai-image-input");
  
  // File selection
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) handleAIUpload(file);
  });
  
  // Drag & drop handlers
  uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = "var(--color-saffron-dark)";
    uploadBox.style.backgroundColor = "rgba(212, 175, 55, 0.08)";
  });
  
  uploadBox.addEventListener("dragleave", () => {
    uploadBox.style.borderColor = "var(--color-gold)";
    uploadBox.style.backgroundColor = "rgba(212, 175, 55, 0.02)";
  });
  
  uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = "var(--color-gold)";
    uploadBox.style.backgroundColor = "rgba(212, 175, 55, 0.02)";
    const file = e.dataTransfer.files[0];
    if (file) handleAIUpload(file);
  });
  
  aiUploadWired = true;
}

function handleAIUpload(file) {
  if (file.size > 5 * 1024 * 1024) {
    alert("File is too large. Max size allowed is 5MB.");
    return;
  }

  // Display Preview
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById("ai-image-preview").src = e.target.result;
    document.getElementById("ai-preview-box").style.display = "block";
    document.getElementById("ai-upload-placeholder").style.display = "none";
    
    // Trigger Analysis
    analyzeImage(e.target.result, file.type);
  };
  reader.readAsDataURL(file);
}

function analyzeImage(base64Data, mimeType) {
  // Show loading
  document.getElementById("ai-loading").style.display = "flex";
  document.getElementById("ai-error").style.display = "none";
  document.getElementById("ai-results").style.display = "none";
  document.getElementById("ai-key-warning").style.display = "none";
  
  fetch("/api/identify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64Data, mimeType: mimeType })
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(err => { throw err; });
    }
    return res.json();
  })
  .then(data => {
    document.getElementById("ai-loading").style.display = "none";
    
    if (data.success) {
      aiActiveMonument = data;
      renderAIResults(data);
    } else {
      showAIError(data.error_message || "The uploaded image was not recognized as an Indian cultural heritage site or object. Please try a different photo.");
    }
  })
  .catch(err => {
    document.getElementById("ai-loading").style.display = "none";
    console.error("AI Identify Error:", err);
    
    if (err.error === "API_KEY_MISSING") {
      document.getElementById("ai-key-warning").style.display = "block";
      showAIError("Gemini API key missing. Please configure your key as guided in the warning banner above.");
    } else {
      showAIError(err.message || "Failed to contact backend server. Make sure server.py is running.");
    }
  });
}

function showAIError(msg) {
  document.getElementById("ai-error-msg").textContent = msg;
  document.getElementById("ai-error").style.display = "flex";
  document.getElementById("ai-results").style.display = "none";
}

function renderAIResults(monument) {
  document.getElementById("ai-monument-name").textContent = monument.name;
  document.getElementById("ai-monument-location").innerHTML = `<i class="fas fa-map-marker-alt" style="margin-right: 6px;"></i> ${monument.location}`;
  
  document.getElementById("ai-history-text").textContent = monument.history;
  document.getElementById("ai-significance-text").textContent = monument.significance;
  document.getElementById("ai-architecture-text").textContent = monument.architecture;
  
  // Render facts
  const factsList = document.getElementById("ai-facts-list");
  factsList.innerHTML = "";
  monument.facts.forEach(fact => {
    const li = document.createElement("li");
    li.style.marginBottom = "6px";
    li.textContent = fact;
    factsList.appendChild(li);
  });
  
  // Init Chat messages
  const chatMessages = document.getElementById("ai-chat-messages");
  chatMessages.innerHTML = `
    <div class="chat-message model">
      I have scanned the image and identified it as **${monument.name}** located in **${monument.location}**! <br><br>
      Feel free to ask me follow-up questions about its history, architectural style, or ask me to generate a quiz!
    </div>
  `;
  aiChatMessages = [];
  
  // Render related heritage sites
  const relatedList = document.getElementById("ai-related-sites-list");
  relatedList.innerHTML = "";
  if (monument.related && monument.related.length > 0) {
    monument.related.forEach(site => {
      const card = document.createElement("div");
      card.className = "related-site-item";
      card.style.backgroundColor = "rgba(0,0,0,0.02)";
      card.style.padding = "10px 12px";
      card.style.borderRadius = "8px";
      card.style.borderLeft = "3.5px solid var(--color-gold)";
      card.style.marginBottom = "8px";
      card.innerHTML = `
        <h4 style="font-size: 0.82rem; color: var(--color-crimson); margin-bottom: 3px; font-weight: 700; font-family: 'Cinzel', serif;">${site.name}</h4>
        <p style="font-size: 0.74rem; color: var(--color-ink-light); margin: 0; line-height: 1.4;">${site.description}</p>
      `;
      relatedList.appendChild(card);
    });
  } else {
    relatedList.innerHTML = `<p style="font-size: 0.75rem; font-style: italic; color: var(--color-ink-light); margin: 0;">No related sites found.</p>`;
  }

  // Render Did You Know card
  const didYouKnowText = document.getElementById("ai-did-you-know-text");
  const didYouKnowCard = document.getElementById("ai-did-you-know-card");
  if (monument.did_you_know) {
    didYouKnowText.textContent = monument.did_you_know;
    didYouKnowCard.style.display = "block";
  } else {
    didYouKnowCard.style.display = "none";
  }

  // Show results view
  document.getElementById("ai-results").style.display = "block";
  switchAITab('history');
}

function switchAITab(tabName) {
  playSound('click');
  document.querySelectorAll('[data-ai-tab]').forEach(tab => {
    tab.classList.remove("active");
  });
  document.querySelectorAll('.ai-tab-pane').forEach(pane => {
    pane.classList.remove("active");
  });
  
  const activeTab = document.querySelector(`[data-ai-tab="${tabName}"]`);
  const activePane = document.getElementById(`pane-ai-${tabName}`);
  
  if (activeTab) activeTab.classList.add("active");
  if (activePane) activePane.classList.add("active");
}

function resetAIAssistant(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  playSound('click');
  aiActiveMonument = null;
  aiChatMessages = [];
  
  // Clear file input
  document.getElementById("ai-image-input").value = "";
  
  // Toggle visibility
  document.getElementById("ai-upload-placeholder").style.display = "flex";
  document.getElementById("ai-preview-box").style.display = "none";
  document.getElementById("ai-results").style.display = "none";
  document.getElementById("ai-loading").style.display = "none";
  document.getElementById("ai-error").style.display = "none";
  document.getElementById("ai-key-warning").style.display = "none";
  document.getElementById("ai-did-you-know-card").style.display = "none";
}

function sendAIChatMessage() {
  const input = document.getElementById("ai-chat-input");
  const text = input.value.trim();
  if (!text || !aiActiveMonument) return;
  
  playSound('click');
  
  // Render user message
  const chatMessages = document.getElementById("ai-chat-messages");
  const userMsgDiv = document.createElement("div");
  userMsgDiv.className = "chat-message user";
  userMsgDiv.textContent = text;
  chatMessages.appendChild(userMsgDiv);
  
  // Append to message history
  aiChatMessages.push({ role: "user", content: text });
  
  input.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Add loading model message bubble
  const loadingMsgDiv = document.createElement("div");
  loadingMsgDiv.className = "chat-message model";
  loadingMsgDiv.innerHTML = `<i class="fas fa-ellipsis-h fa-pulse"></i> Thinking...`;
  chatMessages.appendChild(loadingMsgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Call API
  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ monument: aiActiveMonument, messages: aiChatMessages })
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(err => { throw err; });
    }
    return res.json();
  })
  .then(data => {
    loadingMsgDiv.remove();
    
    // Render answer
    const modelMsgDiv = document.createElement("div");
    modelMsgDiv.className = "chat-message model";
    modelMsgDiv.innerHTML = data.text.replace(/\n/g, "<br>");
    chatMessages.appendChild(modelMsgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Append to history
    aiChatMessages.push({ role: "model", content: data.text });
  })
  .catch(err => {
    loadingMsgDiv.remove();
    console.error("AI Chat Error:", err);
    
    const errorMsgDiv = document.createElement("div");
    errorMsgDiv.className = "chat-message model";
    errorMsgDiv.style.color = "var(--color-error)";
    errorMsgDiv.textContent = "Sorry, I encountered an error. Please make sure the backend is online.";
    chatMessages.appendChild(errorMsgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}

function generateAIQuiz() {
  if (!aiActiveMonument) return;
  playSound('click');
  
  const difficulty = document.getElementById("ai-quiz-difficulty").value;
  
  // Show loading in the button
  const genBtn = document.getElementById("ai-gen-quiz-btn");
  const origText = genBtn.innerHTML;
  genBtn.disabled = true;
  genBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Generating...`;
  
  fetch("/api/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ monument: aiActiveMonument, difficulty: difficulty })
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(err => { throw err; });
    }
    return res.json();
  })
  .then(data => {
    genBtn.disabled = false;
    genBtn.innerHTML = origText;
    
    // Start Quiz
    aiQuizQuestions = data.questions;
    aiQuizCurrentIdx = 0;
    aiQuizScore = 0;
    
    document.getElementById("ai-quiz-title").textContent = `${aiActiveMonument.name} Quiz (${difficulty.toUpperCase()})`;
    document.getElementById("ai-quiz-screen").style.display = "flex";
    
    renderAIQuizQuestion();
  })
  .catch(err => {
    genBtn.disabled = false;
    genBtn.innerHTML = origText;
    console.error("AI Quiz Gen Error:", err);
    alert("Failed to generate quiz. Please check backend connection.");
  });
}

function renderAIQuizQuestion() {
  const question = aiQuizQuestions[aiQuizCurrentIdx];
  
  document.getElementById("ai-quiz-progress-text").textContent = `QUESTION ${aiQuizCurrentIdx + 1} OF 5`;
  document.getElementById("ai-quiz-question-text").textContent = question.question;
  
  const optionsContainer = document.getElementById("ai-quiz-options-box");
  optionsContainer.innerHTML = "";
  
  question.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.innerHTML = opt;
    btn.onclick = () => selectAIQuizOption(idx);
    optionsContainer.appendChild(btn);
  });
  
  // Hide feedback and next btn
  document.getElementById("ai-quiz-feedback-box").classList.remove("show");
  document.getElementById("ai-quiz-next-btn").style.display = "none";
}

function selectAIQuizOption(idx) {
  const question = aiQuizQuestions[aiQuizCurrentIdx];
  const options = document.querySelectorAll("#ai-quiz-options-box .quiz-option");
  
  options.forEach(btn => btn.disabled = true);
  
  const isCorrect = idx === question.answer;
  
  if (isCorrect) {
    playSound('correct');
    options[idx].classList.add("correct");
    aiQuizScore++;
  } else {
    playSound('wrong');
    options[idx].classList.add("wrong");
    options[question.answer].classList.add("correct");
  }
  
  const feedback = document.getElementById("ai-quiz-feedback-box");
  feedback.innerHTML = `
    <strong>${isCorrect ? '✨ Correct!' : '❌ Incorrect'}</strong>
    <p style="margin: 6px 0 0 0; font-size: 0.8rem">${question.explanation}</p>
  `;
  feedback.classList.add("show");
  
  const nextBtn = document.getElementById("ai-quiz-next-btn");
  nextBtn.style.display = "block";
  if (aiQuizCurrentIdx === 4) {
    nextBtn.textContent = "FINISH QUIZ";
  } else {
    nextBtn.textContent = "NEXT QUESTION";
  }
}

function handleAIQuizNext() {
  playSound('click');
  if (aiQuizCurrentIdx < 4) {
    aiQuizCurrentIdx++;
    renderAIQuizQuestion();
  } else {
    // Finish Quiz
    closeAIQuizScreen();
    
    // Evaluate Result
    if (aiQuizScore >= 4) {
      // Pass
      state.aiQuizPassed = true;
      addXP(100);
      playSound('levelup');
      showNotification(`Perfect study! You scored ${aiQuizScore}/5 on ${aiActiveMonument.name} and unlocked the "AI Explorer" badge! (+100 XP)`);
    } else {
      // Fail
      alert(`You scored ${aiQuizScore}/5. Study the historical details under the tabs and try again!`);
    }
  }
}

function closeAIQuizScreen() {
  playSound('click');
  document.getElementById("ai-quiz-screen").style.display = "none";
}

// Initialise App
window.addEventListener("DOMContentLoaded", () => {
  // Load State from LocalStorage
  loadState();

  // Wire back button
  document.getElementById("header-back-btn").onclick = goBack;
  document.getElementById("header-mute-btn").onclick = toggleAudioMute;

  // Initialize navigation event listeners
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const page = item.getAttribute("data-page");
      navigateTo(page);
    });
  });

  // Navigate to initial page
  navigateTo(state.activePage);
});
