# Premium Web-Based Music Player

A sleek, premium, glassmorphic web-based music player developed as part of **Task 1** for the **Rhombix Technologies Web Development Internship**. This application is built entirely using standard frontend web technologies (**HTML5, Custom CSS3, and Vanilla JavaScript**), featuring an ultra-modern dark luxury aesthetic, real-time visualizers, and fully dynamic control states.

---

## Features

- **Dynamic Track Card UI:** Custom glassmorphic player list featuring smooth hover states, index counters, and thumbnail art frames.
- **Live Graphic Equalizer:** A micro-animated CSS visualizer that activates dynamically on the track card currently playing.
- **Audio Transport Controls:** Full implementations for Play, Pause, Previous Track, Next Track, and continuous loop automatic progression when a song ends.
- **Interactive Progress Scrubbing:** A smooth custom timeline slider enabling users to view the current runtime and skip to any part of the track.
- **Live Search & Filter Engine:** Real-time search query filtering and dedicated genre capsule filters (`Synthwave`, `Lo-Fi`, `Cinematic`) to instantly sort the database playlist.
- **Precise Volume Matrix:** Dynamic hardware audio volume attenuation handling, updating the status icon indicators on-the-fly (`High`, `Low`, `Muted`).
- **Vinyl Rotation Effect:** Smooth cinematic rotation animation applied to the active focus album artwork container during live playback.

---

## Tech Stack & Architecture

- **Structure:** `HTML5` (Semantic layout design)
- **Styling:** `CSS3` (Custom transitions, native input slider overrides, absolute flex/grid styling, animations)
- **Logic Engine:** `Vanilla JavaScript (ES6+)` (DOM node manipulation, state architecture tracker, Native Audio Context bindings)

### File Structure
```text
RhombixTechnologies_Tasks/
│
├── index.html       # Application core semantic structure
├── style.css        # Premium custom luxury stylesheets & keyframes
├── tracks.js        # Modular array database for audio streaming elements
├── app.js           # Core transport logic, search arrays, & event hooks
└── README.md        # Documentation and deployment breakdown