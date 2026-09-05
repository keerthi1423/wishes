/* =========================================================
   RISHI 19TH BIRTHDAY WEBSITE - FINAL SCRIPT
   Fixed: secret card flip + photo navigation + cake + letter
   ========================================================= */
// ===============================
// BACKGROUND MUSIC
// ===============================

const bgMusic = document.getElementById("bgMusic");

function startBackgroundMusic() {
    if (!bgMusic) return;

    bgMusic.volume = 0.5;

    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
        playPromise.catch(function () {
            console.log("Music will start after user interaction.");
        });
    }
}
/* =========================================================
   PAGE ELEMENTS
   ========================================================= */
const loadingPage = document.getElementById("loadingPage");
const welcomePage = document.getElementById("welcomePage");
const readyPage = document.getElementById("readyPage");
const nextPage = document.getElementById("nextPage");
const journeyPage = document.getElementById("journeyPage");
const birthdayIntroPage = document.getElementById("birthdayIntroPage");
const revealPage = document.getElementById("revealPage");
const reportPage = document.getElementById("reportPage");
const classifiedPage = document.getElementById("classifiedPage");
const photoPage = document.getElementById("photoPage");
const wishesPage = document.getElementById("wishesPage");
const cakePage = document.getElementById("cakePage");
const makeWishMessage = document.getElementById("makeWishMessage");

/* =========================================================
   BUTTONS / ELEMENTS
   ========================================================= */
const loadingText = document.getElementById("loadingText");
const progressBar = document.getElementById("progressBar");
const startBtn = document.getElementById("startBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const continueBtn = document.getElementById("continueBtn");
const nextJourneyBtn = document.getElementById("nextJourneyBtn");
const revealBtn = document.getElementById("revealBtn");
const startRealJourneyBtn = document.getElementById("startRealJourneyBtn");
const openReportBtn = document.getElementById("openReportBtn");
const continueSecretBtn = document.getElementById("continueSecretBtn");
const nextPhotoBtn = document.getElementById("nextPhotoBtn");
const goToCakeBtn = document.getElementById("goToCakeBtn");
const noMessage = document.getElementById("noMessage");
const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const closePhotoModal = document.getElementById("closePhotoModal");
const birthdayCake = document.getElementById("birthdayCake");
const blowCandlesBtn = document.getElementById("blowCandlesBtn");
const wishAfterBlow = document.getElementById("wishAfterBlow");

/* =========================================================
   PAGE CHANGE
   ========================================================= */
function changePage(currentPage, nextPage) {
    if (!currentPage || !nextPage) return;

    currentPage.classList.add("hidden");

    setTimeout(function () {
        nextPage.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 400);
}

/* =========================================================
   LOADING
   ========================================================= */
window.addEventListener("load", function () {
    let progress = 0;

    const loadingInterval = setInterval(function () {
        progress += 5;

        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

        if (loadingText) {
            if (progress < 30) {
                loadingText.textContent = "Preparing something special for you... 🎁";
            } else if (progress < 60) {
                loadingText.textContent = "Collecting memories... 🧸";
            } else if (progress < 90) {
                loadingText.textContent = "Adding a little magic... ✨";
            } else {
                loadingText.textContent = "Almost ready... 💛";
            }
        }

        if (progress >= 100) {
            clearInterval(loadingInterval);

            setTimeout(function () {
                if (loadingPage && welcomePage) {
                    loadingPage.classList.add("hidden");
                    welcomePage.classList.remove("hidden");
                }
            }, 500);
        }
    }, 100);
});

/* =========================================================
   MAIN JOURNEY BUTTONS
   ========================================================= */
if (startBtn) {
    startBtn.addEventListener("click", function () {
    startBackgroundMusic();
    changePage(welcomePage, readyPage);
});
}

if (yesBtn) {
    yesBtn.addEventListener("click", function () {
        changePage(readyPage, nextPage);
    });
}

if (noBtn) {
    noBtn.addEventListener("click", function () {
        if (noMessage) {
            noMessage.textContent = "Thappu Thappuu Thappuu You have no choice da kanna just click YESS... 😂";
        }
    });
}

if (continueBtn) {
    continueBtn.addEventListener("click", function () {
        changePage(nextPage, journeyPage);
    });
}

if (nextJourneyBtn) {
    nextJourneyBtn.addEventListener("click", function () {
        changePage(journeyPage, birthdayIntroPage);
    });
}

if (revealBtn) {
    revealBtn.addEventListener("click", function () {
        changePage(birthdayIntroPage, revealPage);
    });
}

if (startRealJourneyBtn) {
    startRealJourneyBtn.addEventListener("click", function () {
        changePage(revealPage, reportPage);
    });
}

if (openReportBtn) {
    openReportBtn.addEventListener("click", function () {
        changePage(reportPage, classifiedPage);
    });
}

/* =========================================================
   TOP SECRET CARDS
   IMPORTANT: HTML uses onclick="revealSecret(this)"
   ========================================================= */
const cards = document.querySelectorAll(".secret-card");
let revealedCount = 0;

const cardSounds = {
    sparkle: new Audio("sounds/sparkle.mp3")
};

function revealSecret(card) {
    if (!card || card.classList.contains("revealed")) return;

    card.classList.add("revealed");
    card.setAttribute("aria-pressed", "true");
    revealedCount++;

    const soundName = card.dataset.sound || "sparkle";
    const sound = cardSounds[soundName];

    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(function () {});
    }

    if (revealedCount === cards.length && continueSecretBtn) {
        continueSecretBtn.disabled = false;
        continueSecretBtn.classList.add("unlocked");
        continueSecretBtn.textContent = "CONTINUE TO PHOTO ALBUM 📸✨";
    }
}

/* Make the function available to inline onclick in HTML. */
window.revealSecret = revealSecret;

cards.forEach(function (card) {
    /* MOUSE / TOUCH CLICK - this was missing */
    card.addEventListener("click", function () {
        revealSecret(card);
    });

    /* KEYBOARD */
    card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            revealSecret(card);
        }
    });
});

if (continueSecretBtn) {
    continueSecretBtn.addEventListener("click", function () {
        if (!continueSecretBtn.disabled) {
            changePage(classifiedPage, photoPage);
        }
    });
}

/* =========================================================
   PHOTO ALBUM
   ========================================================= */
const photoImages = document.querySelectorAll(
    ".featured-image-box img, .photo-card img"
);

photoImages.forEach(function (image) {
    image.addEventListener("click", function () {
        if (!photoModal || !modalImage) return;

        modalImage.src = image.src;
        modalImage.alt = image.alt || "Expanded photo";
        photoModal.classList.add("show");
    });
});

if (closePhotoModal) {
    closePhotoModal.addEventListener("click", function () {
        if (photoModal) photoModal.classList.remove("show");
    });
}

if (photoModal) {
    photoModal.addEventListener("click", function (event) {
        if (event.target === photoModal) {
            photoModal.classList.remove("show");
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && photoModal) {
        photoModal.classList.remove("show");
    }
});

if (nextPhotoBtn) {
    nextPhotoBtn.addEventListener("click", function () {
        changePage(photoPage, wishesPage);
    });
}

/* =========================================================
   WISHES PAGE → CAKE PAGE
   ========================================================= */
if (goToCakeBtn) {
    goToCakeBtn.addEventListener("click", function () {
        changePage(wishesPage, cakePage);
        startCakeSequence();
    });
}

/* =========================================================
   CAKE SEQUENCE - FINAL SCREEN
   Cake builds automatically.
   MAKE A WISH appears while candles are still ON.
   User clicks the button to blow the candles out.
========================================================= */
let cakeStarted = false;
let candlesBlown = false;

function startCakeSequence() {
    if (cakeStarted || !birthdayCake) return;
    cakeStarted = true;

    /* Cake layers + candles finish dropping first.
       IMPORTANT: flames stay ON here. */
    setTimeout(function () {
        if (makeWishMessage) {
            makeWishMessage.classList.remove("hidden");
            makeWishMessage.classList.add("show");
        }
    }, 3600);
}

/* User controls when the candles go out. */
if (blowCandlesBtn) {
    blowCandlesBtn.addEventListener("click", function () {
        if (candlesBlown || !birthdayCake) return;

        candlesBlown = true;
        birthdayCake.classList.add("blown");
        blowCandlesBtn.disabled = true;
        blowCandlesBtn.textContent = "CANDLES BLOWN! ✨";
        blowCandlesBtn.classList.add("blown-button");

        setTimeout(function () {
            if (wishAfterBlow) {
                wishAfterBlow.classList.remove("hidden");
                wishAfterBlow.classList.add("show");
            }
        }, 750);
    });
}
