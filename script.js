document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const messageText = document.getElementById('message-text');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const replayButton = document.getElementById('replay-button');
    const headerGif = document.getElementById('header-gif');

    let currentStep = 0;
    let noButtonClicks = 0;
    let heartsInterval;

    const noButtonResponses = [
        "Come on, trust me? 👀",
        "Just this once? 🥺",
        "Pretty please? ✨",
        "I know you want to... 😏",
        "Don't be shy now 💫",
        "Almost there... 🌙",
        "Okay fine, YES then! 💕"
    ];

    const story = [
        {
            text: "Hei, boleh minta waktu sebentar? Ada yang pengen aku share nih... 🌙",
            yesText: "Boleh dong",
            noText: null,
            gif: ""
        },
        {
            text: "Aku notice kamu lagi struggling sama PKL ya? Kayaknya capek banget deh...",
            yesText: "Iya nih capek 😮‍💨",
            noText: "Engga kok, aku oke",
            gif: ""
        },
        {
            text: "Tau ga sih, aku tuh respect banget sama kamu. You're out there pushing yourself, learning, growing...",
            yesText: "Makasih notice 🥺",
            noText: "Biasa aja kali",
            gif: ""
        },
        {
            text: "Seriously tho, banyak orang yang bakal give up di posisi kamu. Tapi kamu? You keep showing up. That's powerful.",
            yesText: "Jadi terharu 😭",
            noText: "Ahh lebay",
            gif: ""
        },
        {
            text: "Real talk: Kamu lebih strong dari yang kamu kira. Dan aku... honestly amazed every time I see you handle everything.",
            yesText: "Really? 🥹",
            noText: "Masa sih?",
            gif: ""
        },
        {
            text: "So here's the deal... Boleh ga aku jadi support system kamu? At least someone who's rooting for you?",
            yesText: "Boleh banget! 💕",
            noText: "Hmm gatau deh",
            gif: ""
        },
        {
            text: "Great! Because honestly... seeing you succeed tuh somehow jadi salah satu hal yang bikin hari-hari aku lebih bright.",
            yesText: "Wait what... 😳",
            noText: null,
            gif: "ayu.jpg"
        },
        {
            text: "Keep slaying your PKL journey. Dan kalau butuh tempat cerita, curhat, atau sekadar mau didengar... I'm here. Always. ✨",
            yesText: "Thank you so much 💗",
            noText: null,
            gif: ""
        }
    ];

    function showNextCard() {
        container.classList.add('exiting');

        setTimeout(() => {
            currentStep++;
            if (currentStep < story.length) {
                updateScreen();
                container.classList.remove('exiting');
            } else {
                // Cerita Selesai
                container.classList.remove('exiting');
                messageText.innerText = "Remember this moment. You're stronger than you know. And hey... you look cute when you smile btw 😊💫";
                yesButton.style.display = 'none';
                noButton.style.display = 'none';
                replayButton.style.display = 'inline-block';
                headerGif.style.display = 'none';
                if (!heartsInterval) {
                    createFallingHearts();
                }
            }
        }, 500); // Waktu harus cocok dengan transisi CSS
    }

    function updateScreen() {
        const currentStory = story[currentStep];

        messageText.innerText = currentStory.text;

        yesButton.style.display = 'inline-block';
        yesButton.innerText = currentStory.yesText;

        if (currentStory.noText) {
            noButton.style.display = 'inline-block';
            noButton.innerText = currentStory.noText;
        } else {
            noButton.style.display = 'none';
        }
        
        if (currentStory.gif) {
            headerGif.src = currentStory.gif;
            headerGif.style.display = 'block';
            if (currentStory.gif === "ayu.jpg" && !heartsInterval) {
                createFallingHearts();
            }
        } else {
            headerGif.style.display = 'none';
        }

        replayButton.style.display = 'none';
        noButtonClicks = 0;
        yesButton.style.transform = 'scale(1)';
    }

    yesButton.addEventListener('click', showNextCard);

    noButton.addEventListener('click', () => {
        if (currentStep === 4) {
            const response = noButtonResponses[noButtonClicks % noButtonResponses.length];
            noButton.innerText = response;
            noButtonClicks++;

            const yesButtonSize = 1 + (noButtonClicks * 0.2);
            yesButton.style.transform = `scale(${yesButtonSize})`;
        } else {
            showNextCard(); // Tetap lanjut ke kartu berikutnya
        }
    });

    replayButton.addEventListener('click', () => {
        container.classList.remove('exiting');
        currentStep = 0;
        stopFallingHearts();
        updateScreen();
    });
    
    function createFallingHearts() {
        heartsInterval = setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerText = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 2 + 8 + 's';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 10000);
        }, 300);
    }

    function stopFallingHearts() {
        clearInterval(heartsInterval);
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => heart.remove());
    }

    updateScreen();
});
