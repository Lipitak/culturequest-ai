# CultureQuest AI – India's Cultural Passport

CultureQuest AI is a gamified, mobile-first cultural exploration platform designed to make learning about India's cities, traditions, heritage, folklore, and historical monuments engaging and interactive. 

Users travel across India via an interactive map, test their knowledge with cultural quizzes, earn customized distressed ink visa stamps, and unlock deep heritage archives and audio-narrated folk stories.

---

## 🎨 Design Philosophy & Aesthetics

CultureQuest AI is designed as a **tactile digital travel journal** rather than a generic SaaS application. Key aesthetic pillars include:
*   **Physical Wooden Desk**: Desktop users are treated to a desktop wrapper simulating a wooden desk workspace decorated with a warm tea cup (☕), brass compass (🧭), vintage postage stamps (✉️), and an old fountain pen (✒️).
*   **Aged Parchment Texture**: Pages feature a creased parchment overlay with warm, curated HSL color themes (crimson, blue, emerald, saffron) that feel hand-crafted.
*   **3D Page Transitions**: Moving from page to page simulates the physical turning of a booklet page using 3D perspective transforms (`rotateY`).
*   **Custom Passport Jackets**: Users can customize their passport covers (Imperial Crimson, Royal Navy Blue, Forest Emerald, Saffron Gold) via the Profile page, which synchronizes across the landing page and booklet.

---

## 🚀 Key Features

*   **Interactive SVG Map of Bharat**: Includes vintage cartography details (Himalayan contours, river Ganges path, sailing merchant ship, and a custom compass rose). Cities are pinned with brass oil lamps (diyas) that flicker and pulse.
*   **Lock-Gated Progression**: City lore is initially locked. Users must complete a cultural quiz (scoring at least 2/3) to earn that city's passport stamp.
*   **Custom Distressed Visa Stamps**: Replaces basic emojis with custom CSS-geometrical seals (octagons, double-circles, triangles, shields, scalloped shapes) featuring ink bleed details, dynamic city colors, and a physical stamping impact animation.
*   **Interactive Folklore Timeline**: Storycards break traditional legends into sequential stages with a visual step timeline.
*   **Synthesized Audio & Narration**:
    *   *Sitar Pluck*: Ascending Bhupali raga pentatonic scale on correct answers.
    *   *Bansuri Flute Slide*: A breathy, descending low-pass slide on wrong answers.
    *   *Tanpura Drone*: Multi-note harmonic resonance celebration on stamp unlock.
    *   *Listen Mode*: TTS engine with a localized Indian-accented English voice coupled with a dynamic 5-bar animated audio equalizer waveform.
*   **Achievements System**: Unlocks badges (e.g., Scholar, Heritage Custodian, Perfect Score) based on user milestones.

---

## 🛠️ Tech Stack

*   **Core**: HTML5, CSS3 (Vanilla), JavaScript (ES6 Client-side)
*   **Audio Synthesis**: Web Audio API (real-time wave oscillators, filters, and gain nodes)
*   **Speech Narration**: Web Speech API (`SpeechSynthesisUtterance`)
*   **Icons**: FontAwesome 6 (CDN)
*   **Typography**: Google Fonts (Cinzel, Montserrat)

---

## 📁 Project Structure

```text
culturequest-india/
├── css/
│   ├── styles.css        # Base layout, typography, 3D animations
│   └── components.css    # Map, stamps, diyas, waveforms, cards, timeline
├── js/
│   ├── data.js           # Cultural database (Jaipur, Varanasi, Kolkata, Mysore, Udaipur, Ajmer)
│   └── app.js            # Synthesizers, speech engines, routing, and renderers
├── images/
│   └── *.png             # Hand-crafted watercolor headers and story illustrations
├── index.html            # Main mobile frame and 9 distinct page views
├── verify.py             # Automated test suite checking HTML structure and JS syntax
└── README.md             # Project documentation
```

---

## 💻 Running the Project Locally

The project utilizes pure client-side web technologies and does not require a compilation or build pipeline. You can run it locally using any static file server.

### Using Python 3 (Recommended)
1. Navigate to the project root directory:
   ```bash
   cd culturequest-india
   ```
2. Start the local server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open your browser and go to `http://localhost:8000`.

---

## 🔍 Codebase Verification
The project includes a verification script (`verify.py`) to validate code integrity. Run it using Python:
```bash
python3 verify.py
```
It ensures:
*   All styles, scripts, and watercolor assets exist.
*   The 9 core page containers are present.
*   The JavaScript syntax is clean of mismatched brackets.
