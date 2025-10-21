const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = [];
let players = [0, 1, 2, 3, 4, 5]; // 0 = You, 1–5 = Bots
let dealerIndex = 0;

// Create and shuffle deck
function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  deck.sort(() => Math.random() - 0.5);
}

// Deal two cards to each player
function dealCards() {
  players.forEach((i) => {
    const cardArea = document.querySelector(`#player${i} .cards`);
    cardArea.innerHTML = ""; // Clear previous cards
    const hand = [deck.pop(), deck.pop()];
    hand.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.textContent = `${card.rank}${card.suit}`;
      cardArea.appendChild(cardDiv);
    });
  });
}

// Assign Dealer, SB, BB
function assignRoles() {
  const sbIndex = (dealerIndex + 1) % players.length;
  const bbIndex = (dealerIndex + 2) % players.length;

  players.forEach((i) => {
    const badge = document.getElementById(`badge${i}`);
    badge.textContent = "";
    if (i === dealerIndex) badge.textContent = "Dealer";
    else if (i === sbIndex) badge.textContent = "SB";
    else if (i === bbIndex) badge.textContent = "BB";
  });
}

// Simulate bot bets
function simulateBets() {
  players.forEach((i) => {
    if (i === 0) return; // Skip human for now
    const playerDiv = document.getElementById(`player${i}`);
    const bet = Math.floor(Math.random() * 100) + 10;
    const betDiv = document.createElement("div");
    betDiv.textContent = `Bet: $${bet}`;
    betDiv.style.marginTop = "5px";
    playerDiv.appendChild(betDiv);
  });
}

// Start game
function startGame() {
  createDeck();
  dealCards();
  assignRoles();
  simulateBets();
  dealerIndex = (dealerIndex + 1) % players.length; // Rotate dealer next round
}
