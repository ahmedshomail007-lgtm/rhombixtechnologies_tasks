// Global State Tracker
let currentTrackIndex = 0;
let isPlaying = false;
let filteredTracks = [...trackList];

// Core HTML Nodes
const audio = document.getElementById('audioElement');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const totalDurationEl = document.getElementById('totalDuration');
const volumeBar = document.getElementById('volumeBar');
const volumeIcon = document.getElementById('volumeIcon');
const searchInput = document.getElementById('searchInput');

// Meta Update Targets
const currentArtwork = document.getElementById('currentArtwork');
const currentTitle = document.getElementById('currentTitle');
const currentArtist = document.getElementById('currentArtist');
const dockArtwork = document.getElementById('dockArtwork');
const dockTitle = document.getElementById('dockTitle');
const dockArtist = document.getElementById('dockArtist');
const playlistContainer = document.getElementById('playlistTracks');

// Load Data Layout State
window.addEventListener('DOMContentLoaded', () => {
    renderPlaylist(trackList);
    loadTrack(currentTrackIndex);
});

// BEAUTIFIED RENDERING GENERATOR
function renderPlaylist(tracks) {
    playlistContainer.innerHTML = '';
    if(tracks.length === 0) {
        playlistContainer.innerHTML = `<p class="text-slate-500 text-sm text-center py-12">No tracks match your current search criteria.</p>`;
        return;
    }
    
    tracks.forEach((track, idx) => {
        const activeTrack = filteredTracks[currentTrackIndex];
        const isActive = activeTrack && activeTrack.id === track.id;
        
        const card = document.createElement('div');
        card.className = `track-card ${isActive ? 'active' : ''}`;
        card.onclick = () => selectTrackById(track.id);
        
        card.innerHTML = `
            <div class="track-card-left">
                <span class="card-index">${idx + 1}</span>
                <div class="card-img-wrapper">
                    <img src="${track.artwork}" class="card-thumb">
                    <div class="card-artwork-overlay">
                        <i class="fa-solid fa-play"></i>
                        <div class="card-equalizer">
                            <span class="eq-bar"></span>
                            <span class="eq-bar"></span>
                            <span class="eq-bar"></span>
                        </div>
                    </div>
                </div>
                <div class="card-meta-details">
                    <p class="card-title">${track.title}</p>
                    <p class="card-artist">${track.artist}</p>
                </div>
            </div>
            <div class="track-card-right">
                <span class="card-badge">${track.category}</span>
                <span class="card-duration">Preview</span>
            </div>
        `;
        playlistContainer.appendChild(card);
    });
}

function loadTrack(index) {
    if(filteredTracks.length === 0) return;
    
    // Bind global target fallback index parameters
    if (index >= filteredTracks.length) currentTrackIndex = 0;
    if (index < 0) currentTrackIndex = filteredTracks.length - 1;
    
    const activeTrack = filteredTracks[currentTrackIndex];
    audio.src = activeTrack.url;
    
    // Update Master Focus Area
    currentArtwork.src = activeTrack.artwork;
    currentTitle.textContent = activeTrack.title;
    currentArtist.textContent = activeTrack.artist;
    
    // Update Control Dock Meta context
    dockArtwork.src = activeTrack.artwork;
    dockTitle.textContent = activeTrack.title;
    dockArtist.textContent = activeTrack.artist;
    
    // Dynamic Re-render to highlight active track row
    renderPlaylist(filteredTracks);
}

// Media Playback Controllers
function togglePlay() {
    if(filteredTracks.length === 0) return;
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play().catch(e => console.log("Streaming buffer initialization sequence triggered."));
    }
}

audio.onplay = () => {
    isPlaying = true;
    playIcon.className = "fa-solid fa-pause";
    currentArtwork.classList.add('artwork-spinning');
    
    // Toggle active live animation for CSS equalizer graphic state
    const currentActiveCard = document.querySelector('.track-card.active .card-equalizer');
    if(currentActiveCard) currentActiveCard.style.display = 'flex';
    const currentActiveIcon = document.querySelector('.track-card.active .card-artwork-overlay i');
    if(currentActiveIcon) currentActiveIcon.style.display = 'none';
};

audio.onpause = () => {
    isPlaying = false;
    playIcon.className = "fa-solid fa-play ml-0.5";
    currentArtwork.classList.remove('artwork-spinning');
    
    // Stop graphic active animation equalizer states
    const activeBars = document.querySelectorAll('.track-card.active .eq-bar');
    activeBars.forEach(bar => bar.style.animationPlayState = 'paused');
};

playBtn.onclick = togglePlay;

prevBtn.onclick = () => {
    currentTrackIndex--;
    loadTrack(currentTrackIndex);
    if(isPlaying) audio.play();
};

nextBtn.onclick = () => {
    currentTrackIndex++;
    loadTrack(currentTrackIndex);
    if(isPlaying) audio.play();
};

function selectTrackById(id) {
    const targetIdx = filteredTracks.findIndex(t => t.id === id);
    if(targetIdx !== -1) {
        currentTrackIndex = targetIdx;
        loadTrack(currentTrackIndex);
        audio.play();
    }
}

// Track Progress Mechanics
audio.ontimeupdate = () => {
    if (isNaN(audio.duration)) return;
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;
    
    // Update Timer Displays
    currentTimeEl.textContent = formatTime(audio.currentTime);
    totalDurationEl.textContent = formatTime(audio.duration);
};

progressBar.oninput = () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
};

audio.onloadedmetadata = () => {
    totalDurationEl.textContent = formatTime(audio.duration);
};

// Continuous Loop Next Handler
audio.onended = () => nextBtn.click();

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Volume Controls
volumeBar.oninput = () => {
    audio.volume = volumeBar.value;
    if(audio.volume === 0) {
        volumeIcon.className = "fa-solid fa-volume-xmark text-purple-500";
    } else if (audio.volume < 0.5) {
        volumeIcon.className = "fa-solid fa-volume-low text-slate-400";
    } else {
        volumeIcon.className = "fa-solid fa-volume-high text-slate-400";
    }
};

// Search & Filtering Integration Engine
function filterTracks() {
    const query = searchInput.value.toLowerCase().trim();
    const activeCategoryBtn = document.querySelector('.category-btn.active');
    const selectedCategory = activeCategoryBtn ? activeCategoryBtn.dataset.category : 'all';
    
    filteredTracks = trackList.filter(track => {
        const matchesSearch = track.title.toLowerCase().includes(query) || track.artist.toLowerCase().includes(query);
        const matchesCategory = (selectedCategory === 'all') || (track.category === selectedCategory);
        return matchesSearch && matchesCategory;
    });
    
    currentTrackIndex = 0;
    renderPlaylist(filteredTracks);
    if(filteredTracks.length > 0) {
        loadTrack(currentTrackIndex);
    }
}

searchInput.oninput = filterTracks;

// Category Selector Engine
document.querySelectorAll('.category-btn').forEach(button => {
    button.onclick = (e) => {
        document.querySelectorAll('.category-btn').forEach(b => {
            b.className = "category-btn";
        });
        e.target.className = "category-btn active";
        filterTracks();
    };
});