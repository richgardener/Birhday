function showGiftQuestion() {
    document.getElementById("wish-content").style.display = "none";
    document.getElementById("btn-thanks").style.display = "none";
    document.getElementById("gift-question").style.display = "block";
    launchConfetti();
  }
  
function launchConfetti() {
    const colors = ['#ff69b4', '#ffd700', '#ff85c1', '#00e5ff', '#b388ff'];
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

function sendMessage() {
    window.location.href = "https://t.me/rich_gardener?text=I%20want%20gift";
  }
  
  