const messages = [
"Thanks for pretending my Wi-Fi issues sounded legitimate.",
"You unlocked one meeting where I won't say 'sorry, I was on mute'.",
"Please accept this chocolate as compensation for Slack notifications.",
"I appreciate all of you almost as much as lunch breaks.",
"This chocolate has been replaced by a motivational message due to budget constraints.",
"As a birthday gift for me, I will ignore one email today.",
"Achievement unlocked: survived another year of my calendar invites.",
"I was going to buy Ferrero Rocher.",
"Thank you for making deadlines slightly less terrifying.",
"You receive +5 workplace charisma.",
"Congratulations. You found one of the premium virtual chocolates.",
"I promise to only send medium-priority messages this week.",
"You have earned one complimentary eye-roll during a meeting.",
"Today's KPI is birthday cake consumption.",
"Your reward: one imaginary extra vacation day.",
"This chocolate contains 100% guud vibes.",
"You are now exempt from one awkward small-talk conversation.",
"I appreciate everyone who tolerated my questions.",
"This chocolate is gluten-free, calorie-free and unfortunately imaginary.",
"You gain immunity from one Klaviyo error.",
"Opening this chocolate increased team morale by 2%.",
"You have discovered Didi's emergency chocolate reserve.",
"Warning: this chocolate may contain traces of workplace sarcasm.",
"Thank you for being part of the chaos."
];

const chocolateStyles = [
    "dark-round",
    "milk-round",
    "white-round",
    "dark-square",
    "milk-square",
    "truffle"
];

const box = document.getElementById("box");

let openedCount = 0;

for (let i = 0; i < 24; i++) {

    const chocolate = document.createElement("div");

    const style =
        chocolateStyles[
            Math.floor(Math.random() * chocolateStyles.length)
        ];

    chocolate.className = `chocolate ${style}`;

    chocolate.addEventListener("click", () => {
        openChocolate(chocolate, i);
    });

    box.appendChild(chocolate);
}

function openChocolate(chocolate, index) {

    if (chocolate.dataset.opened) {
        return;
    }

    chocolate.dataset.opened = "true";

    chocolate.classList.add("opened");

    chocolate.animate(
        [
            { transform: "scale(1)" },
            { transform: "scale(1.2)" },
            { transform: "scale(1)" }
        ],
        {
            duration: 300
        }
    );

    openedCount++;

    document.getElementById("progress").textContent =
        `Chocolates opened: ${openedCount} / 24`;

    document.getElementById("title").textContent =
        "🍫 Message from Didi";

    document.getElementById("message").textContent =
        messages[index];

    document.getElementById("popup").style.display =
        "flex";

    if (openedCount === 24) {

        setTimeout(() => {
            showFinale();
        }, 500);
    }
}

function closePopup() {

    document.getElementById("popup").style.display =
        "none";
}

function showFinale() {

    document.getElementById("box").style.display =
        "none";

    document.getElementById("progress").style.display =
        "none";

    document.getElementById("finalScreen").style.display =
        "block";

    launchConfetti();
}

function launchConfetti() {

    const canvas =
        document.getElementById("confetti");

    const ctx =
        canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];

    for (let i = 0; i < 300; i++) {

        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            speed: Math.random() * 3 + 2,
            drift: Math.random() * 2 - 1,
            color: `hsl(${Math.random() * 360},90%,60%)`
        });
    }

    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        pieces.forEach(piece => {

            piece.y += piece.speed;
            piece.x += piece.drift;

            if (piece.y > canvas.height) {
                piece.y = -20;
            }

            ctx.fillStyle = piece.color;

            ctx.fillRect(
                piece.x,
                piece.y,
                piece.size,
                piece.size
            );
        });

        requestAnimationFrame(animate);
    }

    animate();
}
