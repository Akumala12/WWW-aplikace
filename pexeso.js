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
    let matchedCards = [];

    const images = [
        "Obr/Obr1.png", "Obr/Obr2.png", "Obr/Obr3.png", "Obr/Obr4.png", "Obr/Obr5.png",
        "Obr/Obr6.png", "Obr/Obr7.png", "Obr/Obr8.png", "Obr/Obr9.png", "Obr/Obr10.png",
        "Obr/Obr11.png", "Obr/Obr12.png", "Obr/Obr13.png", "Obr/Obr14.png", "Obr/Obr15.png",
        "Obr/Obr16.png", "Obr/Obr17.png", "Obr/Obr18.png", "Obr/Obr19.png", "Obr/Obr20.png","Obr/Obr21.png",
        "Obr/Obr1.png", "Obr/Obr2.png", "Obr/Obr3.png", "Obr/Obr4.png", "Obr/Obr5.png",
        "Obr/Obr6.png", "Obr/Obr7.png", "Obr/Obr8.png", "Obr/Obr9.png", "Obr/Obr10.png", 
        "Obr/Obr11.png", "Obr/Obr12.png", "Obr/Obr13.png", "Obr/Obr14.png", "Obr/Obr15.png",
        "Obr/Obr16.png", "Obr/Obr17.png", "Obr/Obr18.png", "Obr/Obr19.png", "Obr/Obr20.png", "Obr/Obr21.png"
    ];

    function saveGameState() {
        localStorage.setItem("Stav", JSON.stringify({ matchedCards, score }));
    }

    function loadGameState() {
        const savedState = JSON.parse(localStorage.getItem("Stav"));
        if (savedState) {
            score = savedState.score || 0;
            matchedCards = savedState.matchedCards || [];
            scoreElement.textContent = score;
        } else {
            matchedCards = [];
        }
    }

    onePlayerBtn.addEventListener("click", () => {
        menu.classList.add("hidden");
        game.classList.remove("hidden");
        infoPanel.classList.remove("hidden")
        loadGameState();
        initializeBoard();
    });
    

    twoPlayersBtn.addEventListener("click", () => {
        menu.classList.add("hidden");
        game.classList.remove("hidden");
        twoPlayerInfo.classList.remove("hidden");
        initializeBoard();
    });

    restart.addEventListener("click", () => {
        localStorage.removeItem("Stav");
        score = 0;
        matchedCards = [];
        scoreElement.textContent = score;
        initializeBoard(); // Restartuje hru
    });

    back.addEventListener("click", () => {
        game.classList.add("hidden");
        infoPanel.classList.add("hidden");
        menu.classList.remove("hidden"); 
        board.innerHTML = ""; 
    });


    function initializeBoard() {
        board.innerHTML = ""; // Reset board
        const shuffledImages = images.sort(() => Math.random() - 0.5); //  Michání karet
        shuffledImages.forEach((image) => {
            const card = createCard(image);
            if (matchedCards.includes(image)) {
                card.style.visibility = "hidden"; // Skryje nalezené karty
            }
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
            matchedCards.push(firstCard.dataset.image);
            setTimeout(() => {
                firstCard.style.visibility = "hidden"; // Skryje  karty
                secondCard.style.visibility = "hidden";
                updateScore();
                resetBoard();
                saveGameState();
            }, 500);
        } else {
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                resetBoard();
            }, 1000);
        }
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
