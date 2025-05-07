document.addEventListener("DOMContentLoaded", () => {
    let soundsEnabled = false;

    // Wait for user interaction to enable sounds
    const enableSounds = () => {
        soundsEnabled = true;

        // Play website entering sound effect
        const enterSound = new Audio("prasad/enter-soundd.mp3"); // Ensure this file exists in the 'prasad' folder
        enterSound.playbackRate = 2; // Increase playback speed (2x faster)
        enterSound.play();

        // Start background music after entering sound ends
        enterSound.addEventListener("ended", () => {
            const backgroundMusic = new Audio("prasad/background-music.mp3"); // Ensure this file exists in the 'prasad' folder
            backgroundMusic.loop = true; // Loop the background music
            backgroundMusic.volume = 0.2; // Lower the volume (20% of max volume)
            backgroundMusic.play();

            // Add mute/unmute functionality for background music
            const muteButton = document.getElementById("mute-btn");
            muteButton.addEventListener("click", () => {
                backgroundMusic.muted = !backgroundMusic.muted;
                muteButton.textContent = backgroundMusic.muted ? "Unmute" : "Mute";
            });
        });

        // Remove the interaction listener after enabling sounds
        document.removeEventListener("click", enableSounds);
        document.removeEventListener("mousemove", enableSounds);
    };

    // Add interaction listeners
    document.addEventListener("click", enableSounds);
    document.addEventListener("mousemove", enableSounds);

    // Create the neon cursor element
    const cursor = document.createElement("div");
    cursor.classList.add("neon-cursor");
    document.body.appendChild(cursor);

    // Update the cursor position on mouse move
    document.addEventListener("mousemove", (e) => {
        const x = e.clientX; // Use clientX for viewport-relative position
        const y = e.clientY; // Use clientY for viewport-relative position
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;

        // Trigger the sparkle effect on mouse movement
        createSparkle(x, y);
    });

    // Function to create sparkles
    function createSparkle(x, y) {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        document.body.appendChild(sparkle);

        // Remove the sparkle after animation ends
        setTimeout(() => {
            sparkle.remove();
        }, 500); // Adjust duration to match the CSS animation
    }

    // Add particles.js container
    const particlesContainer = document.createElement("div");
    particlesContainer.id = "particles-js";
    document.body.appendChild(particlesContainer);

    // Initialize particles.js
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
            color: {
                value: ["#800080", "#ff0000", "#000000", "#ff69b4"], // Purple, Red, Black, Pink
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000",
                },
            },
            opacity: {
                value: 0.7,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.3,
                    sync: false,
                },
            },
            size: {
                value: 4,
                random: true,
                anim: {
                    enable: true,
                    speed: 5,
                    size_min: 0.5,
                    sync: false,
                },
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 3,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                },
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse",
                },
                onclick: {
                    enable: true,
                    mode: "push",
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1,
                    },
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
                push: {
                    particles_nb: 4,
                },
                remove: {
                    particles_nb: 2,
                },
            },
        },
        retina_detect: true,
    });

    // Add mute button
    const muteButton = document.createElement("button");
    muteButton.id = "mute-btn";
    muteButton.style.position = "fixed";
    muteButton.style.bottom = "20px";
    muteButton.style.right = "20px";
    muteButton.style.zIndex = "1000";
    muteButton.textContent = "Mute";
    document.body.appendChild(muteButton);

    // Animate sections when they come into view
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = "section-fade-in 1.5s ease-in-out forwards";
                }
            });
        },
        { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll(".navbar nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });
        });
    });

    let lastScrollY = window.scrollY;
    const navbar = document.querySelector(".navbar");
    const badge = document.querySelector(".badge");

    // Handle scroll behavior for navbar and badge
    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        // Hide navbar when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY) {
            navbar.classList.add("hidden");
        } else {
            navbar.classList.remove("hidden");
        }

        // Trigger burning animation for the badge
        if (currentScrollY > 100) {
            badge.style.animation = "burn 1s ease forwards";
        } else {
            badge.style.animation = "reburn 1s ease forwards";
        }

        lastScrollY = currentScrollY;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let lastScrollY = window.scrollY;
    const badge = document.querySelector(".badge");

    // Handle scroll behavior for the badge
    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        // Fade out the badge when scrolling down
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            badge.style.animation = "fadeOut 0.5s ease forwards";
            setTimeout(() => {
                badge.style.opacity = "0"; // Ensure it's hidden
                badge.style.pointerEvents = "none"; // Disable interactions while hidden
            }, 500); // Match the animation duration
        }

        // Fade in the badge when scrolling up
        if (currentScrollY < lastScrollY && currentScrollY < 100) {
            badge.style.pointerEvents = "auto"; // Enable interactions when visible
            badge.style.animation = "fadeIn 0.5s ease forwards";
            badge.style.opacity = "1"; // Ensure it's visible
        }

        lastScrollY = currentScrollY;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    // Intersection Observer to handle animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add animation class when the section is visible
                    entry.target.classList.add("animate-slide-in");
                    entry.target.classList.remove("animate-slide-out");
                } else {
                    // Add animation class when the section is leaving
                    entry.target.classList.add("animate-slide-out");
                    entry.target.classList.remove("animate-slide-in");
                }
            });
        },
        { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
});

// Add CSS for sparkles
const style = document.createElement("style");
style.textContent = `
#particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1; /* Place it behind other content */
    background: linear-gradient(45deg, rgb(177, 10, 77),rgb(0, 0, 0), rgb(0, 0, 0), rgb(239, 0, 0));
    background-size: 700% 700%;
    animation: gradient-animation 7s ease infinite;
}

/* Gradient Animation */
@keyframes gradient-animation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.sparkle {
    position: fixed;
    width: 5px;
    height: 5px;
    background: #ff69b4;
    border-radius: 50%;
    pointer-events: none;
    box-shadow: 0 0 5px rgb(0, 142, 230), 0 0 10px rgb(0, 233, 237), 0 0 15px rgb(203, 0, 102);
    animation: sparkle-fade 0.5s ease-out forwards;
}

@keyframes sparkle-fade {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(2);
    }
}

/* Unified Animated Background */
body {
    margin: 0;
    padding: 0;
    font-family: 'Orbitron', sans-serif;
    color: #ffffff;
    display: flex;
    flex-direction: column; /* Allow vertical stacking of content */
    align-items: center;
    min-height: 100vh; /* Ensure the body takes up the full height */
    overflow-y: auto; /* Enable vertical scrolling */
    cursor: none; /* Hide the default cursor */
    background: linear-gradient(50deg, #890000, #030027, #4e06e7, #000000, #ef0000, #000000, #000000, #000000);
    background-size: 1000% 1000%;
    animation: gradient-animation 20s ease infinite; /* Smooth and slow animation */
}

/* Gradient Animation */
@keyframes gradient-animation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

/* Section Styling */
section {
    margin: 150px auto; /* Add space between sections */
    padding: 60px; /* Add padding for content */
    border-radius: 15px; /* Rounded corners for sections */
    background: rgba(255, 255, 255, 0.1); /* Semi-transparent background for sections */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Subtle shadow for sections */
    text-align: left;
    max-width: 1200px; /* Limit section width */
    width: 90%; /* Ensure responsiveness */
    color: #ffffff; /* White text for readability */
}

/* Section Headings */
section h1 {
    font-size: 3rem; /* Larger font size for headings */
    margin-bottom: 20px;
    text-align: center;
    color: #ffffff; /* White text for headings */
}

/* Section Paragraphs */
section p {
    font-size: 1.5rem; /* Larger font size for better readability */
    line-height: 2; /* Increase line spacing */
    margin-bottom: 20px;
    color: #ffffff; /* White text for paragraphs */
}

/* Section Lists */
section ul {
    list-style-type: disc;
    margin: 20px auto;
    padding-left: 40px;
    color: #ffffff; /* White text for list items */
}

section ul li {
    font-size: 1.3rem; /* Larger font size for list items */
    margin-bottom: 10px;
}

/* Responsive Design */
@media (max-width: 768px) {
    body {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .menu {
        grid-template-columns: 1fr; /* Stack menu items vertically */
    }

    .name {
        font-size: 2rem; /* Adjust font size for smaller screens */
    }

    .title {
        font-size: 1rem; /* Adjust title size */
    }

    .sidebar {
        width: 50px; /* Reduce sidebar width */
    }

    .sidebar a {
        width: 40px;
        height: 40px;
    }

    section {
        padding: 40px; /* Reduce padding for smaller screens */
        margin: 100px auto; /* Adjust spacing between sections */
    }

    section h1 {
        font-size: 2.5rem; /* Adjust heading size for smaller screens */
    }

    section p {
        font-size: 1.2rem; /* Adjust paragraph size for smaller screens */
    }

    section ul li {
        font-size: 1.1rem; /* Adjust list item size for smaller screens */
    }
}
`;
document.head.appendChild(style);