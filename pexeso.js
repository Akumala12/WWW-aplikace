document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const onePlayerBtn = document.getElementById("onePlayerBtn");
    const twoPlayersBtn = document.getElementById("twoPlayersBtn");
    const game = document.getElementById("game");
    const board = document.getElementById("board");
    const infoPanel = document.getElementById("infoPanel");
    const twoPlayerInfo = document.getElementById("twoPlayerInfo");
    const scoreElement = document.getElementById("score");
    const restart = document.getElementById("restart");
    const back = document.getElementById("back");

    let score = 0;
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    const images = [
        "Obr/Obr1.png", "Obr/Obr2.png", "Obr/Obr3.png", "Obr/Obr4.png", "Obr/Obr5.png",
        "Obr/Obr6.png", "Obr/Obr7.png", "Obr/Obr8.png", "Obr/Obr9.png", "Obr/Obr10.png",
        "Obr/Obr1.png", "Obr/Obr2.png", "Obr/Obr3.png", "Obr/Obr4.png", "Obr/Obr5.png",
        "Obr/Obr6.png", "Obr/Obr7.png", "Obr/Obr8.png", "Obr/Obr9.png", "Obr/Obr10.png"
    ];

    onePlayerBtn.addEventListener("click", () => {
        menu.classList.add("hidden");
        game.classList.remove("hidden");
        infoPanel.classList.remove("hidden")
        initializeBoard();
    });
    

    twoPlayersBtn.addEventListener("click", () => {
        menu.classList.add("hidden");
        twoPlayerInfo.classList.remove("hidden");
        initializeBoard();
    });

    restart.addEventListener("click", () => {
        score = 0;
        scoreElement.textContent = score;
        initializeBoard(); // Restartuje hru
    });

    back.addEventListener("click", () => {
        game.classList.add("hidden");
        infoPanel.classList.add("hidden");
        menu.classList.remove("hidden"); // Zobrazí zpět menu
        board.innerHTML = ""; 
    });


    function initializeBoard() {
        board.innerHTML = ""; // Reset board
        const shuffledImages = images.sort(() => Math.random() - 0.5); // Shuffle images
        shuffledImages.forEach((image) => {
            const card = createCard(image);
            board.appendChild(card);
        });
        
    }

    function createCard(image) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = image;

        const frontFace = document.createElement("div");
        frontFace.classList.add("front-face");
        frontFace.style.backgroundImage = `url(${image})`;

        const backFace = document.createElement("div");
        backFace.classList.add("back-face");

        card.appendChild(frontFace);
        card.appendChild(backFace);

        card.addEventListener("click", () => handleCardClick(card));
        return card;
    }


    function handleCardClick(card) {
        if (lockBoard || card === firstCard || card.classList.contains("flipped")) return;

        card.classList.add("flipped");

        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        checkForMatch();
    }
    function checkForMatch() {
        lockBoard = true;

        const isMatch = firstCard.dataset.image === secondCard.dataset.image;
        if (isMatch) {
            disableCards();
            updateScore();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        setTimeout(() => {
            firstCard.style.visibility = "hidden";
            secondCard.style.visibility = "hidden";
            resetBoard();
        }, 1000);
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    function updateScore() {
        score++;
        scoreElement.textContent = score;
    }
});
