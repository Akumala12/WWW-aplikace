document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const onePlayerBtn = document.getElementById("onePlayerBtn");
    const twoPlayersBtn = document.getElementById("twoPlayersBtn");
    const game = document.getElementById("game");
    const board = document.getElementById("board");
    const infoPanel = document.getElementById("infoPanel");
    const twoPlayerInfo = document.getElementById("twoPlayerInfo");
    const scoreElement = document.getElementById("score");

    let score = 0;

    onePlayerBtn.addEventListener("click", () => {
        menu.classList.add("hidden");
        game.classList.remove("hidden");
        infoPanel.classList.remove("hidden")
        initializeBoard();
    });

    twoPlayersBtn.addEventListener("click", () => {
        menu.classList.add("hidden");
        twoPlayerInfo.classList.remove("hidden");
    });

    function initializeBoard() {
        board.innerHTML = ""; // Reset board
        for (let i = 0; i < 25; i++) {
            const card = document.createElement("div");
            card.addEventListener("click", () => handleCardClick(card));
            board.appendChild(card);
            
        }
        
    }

    function handleCardClick(card) {
        if (card.classList.contains("flipped")) return;

        card.classList.add("flipped");
        card.style.backgroundColor = "lightblue";

        // Dummy logic to simulate finding a pair
        if (Math.random() < 0.2) {
            score++;
            scoreElement.textContent = score;
        }
    }
});
