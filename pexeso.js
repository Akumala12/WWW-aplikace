document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const onePlayerBtn = document.getElementById("onePlayerBtn");
    const twoPlayersBtn = document.getElementById("twoPlayersBtn");
    const game = document.getElementById("game");
    const board = document.getElementById("board");
    const infoPanel = document.getElementById("infoPanel");
    const playerScores = document.getElementById("playerScores");
    const scoreElement = document.getElementById("score");
    const player1ScoreElement = document.getElementById("player1Score");
    const player2ScoreElement = document.getElementById("player2Score");
    const currentPlayerElement = document.getElementById("currentPlayer");
    const restart = document.getElementById("restart");
    const back = document.getElementById("back");

    let score = 0;
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedCards = [];
    let isTwoPlayerMode = false;
    let currentPlayer = 1;
    let playerScoresData = { 1: 0, 2: 0 };

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
        localStorage.setItem("Stav", JSON.stringify({ matchedCards, score, isTwoPlayerMode,
            currentPlayer,  playerScoresData }));
    }
    function loadGameState() {
        const savedState = JSON.parse(localStorage.getItem("Stav"));
        if (savedState) {
            score = savedState.score || 0;
            matchedCards = savedState.matchedCards || [];
            isTwoPlayerMode = savedState.isTwoPlayerMode || false;
            currentPlayer = savedState.currentPlayer || 1;
            playerScoresData = savedState.playerScoresData || { 1: 0, 2: 0 };
            updateInfoPanel();

        } else {
            matchedCards = [];
        }
    }

    onePlayerBtn.addEventListener("click", () => {
        isTwoPlayerMode = false;
        startGame();
        updateInfoPanel(); // Aktualizace panelu ihned po výběru režimu
    });
    
    twoPlayersBtn.addEventListener("click", () => {
        isTwoPlayerMode = true;
        startGame();
        updateInfoPanel(); // Aktualizace panelu ihned po výběru režimu
    });
    
    function updateInfoPanel() {
        scoreElement.textContent = score;
        player1ScoreElement.textContent = playerScoresData[1];
        player2ScoreElement.textContent = playerScoresData[2];
        currentPlayerElement.textContent = `Hráč ${currentPlayer}`;
    
        // Zobrazení skóre pro oba hráče pouze v režimu 2 hráčů
        if (isTwoPlayerMode) {
            playerScores.style.display = "block";
        } else {
            playerScores.style.display = "none";
        }
    }
    function startGame() {
        menu.classList.add("hidden");
        game.classList.remove("hidden");
        infoPanel.classList.remove("hidden");

        loadGameState();
        initializeBoard();
    }


    restart.addEventListener("click", () => {
        localStorage.removeItem("Stav");
        score = 0;
        matchedCards = [];
        playerScoresData = { 1: 0, 2: 0 };
        currentPlayer = 1;
        updateInfoPanel();
        initializeBoard(); 
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
                if (isTwoPlayerMode) switchPlayer();
                resetBoard();
            }, 1000);
        }
    }
    
    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        currentPlayerElement.textContent = `Hráč ${currentPlayer}`;
        saveGameState();
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    function updateScore() {
        if (isTwoPlayerMode) {
            playerScoresData[currentPlayer]++;
            document.getElementById(`player${currentPlayer}Score`).textContent = playerScoresData[currentPlayer];
        } else {
            score++;
            scoreElement.textContent = score;
        }
    }
});
