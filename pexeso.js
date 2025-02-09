class Pexeso {
    constructor() {
        this.menu = document.getElementById("menu");
        this.onePlayerBtn = document.getElementById("onePlayerBtn");
        this.twoPlayersBtn = document.getElementById("twoPlayersBtn");
        this.game = document.getElementById("game");
        this.board = document.getElementById("board");
        this.infoPanel = document.getElementById("infoPanel");
        this.playerScores = document.getElementById("playerScores");
        this.scoreElement = document.getElementById("score");
        this.player1ScoreElement = document.getElementById("player1Score");
        this.player2ScoreElement = document.getElementById("player2Score");
        this.currentPlayerElement = document.getElementById("currentPlayer");
        this.restart = document.getElementById("restart");
        this.back = document.getElementById("back");
        
        this.score = 0;
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
        this.matchedCards = [];
        this.isTwoPlayerMode = false;
        this.currentPlayer = 1;
        this.playerScoresData = { 1: 0, 2: 0 };
        this.images = this.initializeImages();
        
        this.loadGameState();  // Loading the game state when the game starts
        this.shuffleImages();
        this.initializeBoard();
        this.setupEventListeners();
    }

    initializeImages() {
        const images = [
            "Obr/Obr1.png", "Obr/Obr2.png", "Obr/Obr3.png", "Obr/Obr4.png", "Obr/Obr5.png",
            "Obr/Obr6.png", "Obr/Obr7.png", "Obr/Obr8.png", "Obr/Obr9.png", "Obr/Obr10.png",
            "Obr/Obr11.png", "Obr/Obr12.png", "Obr/Obr13.png", "Obr/Obr14.png", "Obr/Obr15.png",
            "Obr/Obr16.png", "Obr/Obr17.png", "Obr/Obr18.png", "Obr/Obr19.png", "Obr/Obr20.png", "Obr/Obr21.png",
        ];
        return images.concat(images).sort(() => Math.random() - 0.5);
    }

    shuffleImages() {
        this.images = this.images.sort(() => Math.random() - 0.5);
    }
     
    setupEventListeners() {
        this.onePlayerBtn.addEventListener("click", () => this.startGame(false));
        this.twoPlayersBtn.addEventListener("click", () => this.startGame(true));
        this.restart.addEventListener("click", () => this.resetGame(true));  // Ensure full reset on restart
        this.back.addEventListener("click", () => {
            this.saveGameState();
            this.goBackToMenu();
        });
    }
    startGame(isTwoPlayer) {
        this.isTwoPlayerMode = isTwoPlayer;
        this.menu.classList.add("hidden");
        this.game.classList.remove("hidden");
        this.infoPanel.classList.remove("hidden");
        if (this.isTwoPlayerMode) {
            this.playerScores.classList.remove("hidden");
        } else {
            this.playerScores.classList.add("hidden");
        }
        this.loadGameState(); // Ensures that game state is loaded when the game starts
        this.initializeBoard();
    }

    initializeBoard() {
        this.board.innerHTML = "";
        
        this.images.forEach(image => {
            const card = this.createCard(image);
            if (this.matchedCards.includes(image)) {
                card.style.visibility = "hidden"; 
            }
            this.board.appendChild(card);
        });
    }
    createCard(image) {
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
        card.addEventListener("click", () => this.handleCardClick(card));
        return card;
    }


    handleCardClick(card) {
        if (this.lockBoard || card === this.firstCard || card.classList.contains("flipped")) return;
    
        card.classList.add("flipped");
    
        if (!this.firstCard) {
            this.firstCard = card;
            return;
        }
    
        this.secondCard = card;
        this.checkForMatch();
    }
    checkForMatch() {
        this.lockBoard = true;
    
        if (this.firstCard.dataset.image === this.secondCard.dataset.image) {
            this.matchedCards.push(this.firstCard.dataset.image);
            setTimeout(() => {
                this.hideMatchedCards();
                this.updateScore();
                // Hráč pokračuje, když je pár nalezen
                this.resetBoard();
            }, 500);
        } else {
            setTimeout(() => {
                this.unflipCards();
                if (this.isTwoPlayerMode) {
                    this.switchPlayer(); // Přepnutí hráčů pouze při neúspěšném pokusu
                }
            }, 1000);
        }
    }
    hideMatchedCards() {
        this.saveGameState();
        this.firstCard.style.visibility = "hidden";
        this.secondCard.style.visibility = "hidden";
        this.updateScore();
        this.resetBoard();
    }

    unflipCards() {
        this.firstCard.classList.remove("flipped");
        this.secondCard.classList.remove("flipped");
        this.resetBoard();
    }
    
    switchPlayer() {
        // Při každé změně hráče aktualizujte jeho skóre
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;  // Střídání hráčů
        this.currentPlayerElement.textContent = `Hráč ${this.currentPlayer}`;  // Aktualizace hráče na tahu
    }

    resetBoard() {
        [this.firstCard, this.secondCard] = [null, null];
        this.lockBoard = false;
    }

    saveGameState() {
        localStorage.setItem("Stav", JSON.stringify({
            matchedCards: this.matchedCards,
            score: this.score,
            isTwoPlayerMode: this.isTwoPlayerMode,
            currentPlayer: this.currentPlayer,
            playerScoresData: this.playerScoresData,
            images: this.images
        }));
    }

   loadGameState() {
        const savedState = JSON.parse(localStorage.getItem("Stav"));
        if (savedState) {
            this.score = savedState.score || 0;  // Load the total score (current round score)
            this.matchedCards = savedState.matchedCards || [];
            this.isTwoPlayerMode = savedState.isTwoPlayerMode || false;
            this.currentPlayer = savedState.currentPlayer || 1;
            this.playerScoresData = savedState.playerScoresData || { 1: 0, 2: 0 };
            this.images = savedState.images || this.initializeImages();
        }
    }
    resetGame(fullReset = false) {
        this.shuffleImages();
    
        if (fullReset) {
            localStorage.removeItem("Stav");
            this.playerScoresData = { 1: 0, 2: 0 }; 
            this.currentPlayer = 1; 
        }
    
        this.score = 0;
        this.matchedCards = [];
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
    
        this.initializeBoard();
        this.updateScore();
        this.player1ScoreElement.textContent = "0";
        this.player2ScoreElement.textContent = "0";
        this.scoreElement.textContent = "0";
    
        this.board.querySelectorAll('.card').forEach(card => {
            card.classList.remove('flipped');
        });
        
        this.currentPlayerElement.textContent = `Hráč ${this.currentPlayer}`; 
    }

    updateScore() {
        if (this.firstCard && this.secondCard && this.firstCard.dataset.image === this.secondCard.dataset.image) {
            // Zvyšte skóre pro aktuálního hráče
            this.playerScoresData[this.currentPlayer]++;
            document.getElementById(`player${this.currentPlayer}Score`).textContent = this.playerScoresData[this.currentPlayer];
    
            // Zvětšete celkové skóre
            this.score++;
            this.scoreElement.textContent = this.score;  
        }
    }
    goBackToMenu() {
        this.saveGameState();
        this.game.classList.add("hidden");
        this.infoPanel.classList.add("hidden");
        this.menu.classList.remove("hidden");
        this.board.innerHTML = "";
    }
}

window.onload = () => new Pexeso();

