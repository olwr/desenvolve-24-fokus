// Elements
const html = document.querySelector('html');
const timerElement = document.querySelector('#timer');
const appImg = document.querySelector('.app__image');
const appTitle = document.querySelector('.app__title');
const buttonImg = document.querySelector('.app__card-primary-button-icon');

// Buttons
const focusBtn = document.querySelector('.app__card-button--foco');
const shortRestBtn = document.querySelector('.app__card-button--curto');
const longRestBtn = document.querySelector('.app__card-button--longo');
const startPauseBtn = document.querySelector('#start-pause');
const startPauseBtnText = document.querySelector('#start-pause span');
const buttons = document.querySelectorAll('.app__card-button');
const musicBtn = document.querySelector('#alternar-musica');

// Audios
const music = new Audio('/sons/luna-rise-part-one.mp3');
music.loop = true;
const startSound = new Audio('/sons/play.wav');
const pauseSound = new Audio('/sons/pause.mp3');
const timerEndSound = new Audio('/sons/beep.mp3');

// Timers
let timerTimeSeconds = 1500;
let interval = null;

// Functions
function alternateContext(context) {
    showTimer()
    buttons.forEach((context) => {
        context.classList.remove('active')
    })

    html.setAttribute('data-contexto', context);
    appImg.setAttribute('src', `/imagens/${context}.png`);

    switch (context) {
        case 'foco':
            appTitle.innerHTML = 
            `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            appTitle.innerHTML = 
            `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            appTitle.innerHTML = 
            `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
};

const timerF = () => {
    if (timerTimeSeconds <= 0) {
        timerEndSound.play();
        alert('Tempo finalizado!');
        restart();
        return;
    }

    timerTimeSeconds -= 1;
    showTimer();
};

function startOrPause() {
    if (interval) {
        pauseSound.play();
        restart();
        return;
    }
    
    startSound.play();
    interval = setInterval(timerF, 1000);
    startPauseBtnText.textContent = 'Pausar';
    buttonImg.setAttribute('src', '/imagens/pause.png')
};

function restart() {
    clearInterval(interval);
    startPauseBtnText.textContent = 'Começar';
    buttonImg.setAttribute('src', '/imagens/play_arrow.png')
    interval = null;
}

function showTimer() {
    const timer = new Date(timerTimeSeconds * 1000);
    const formatTimer = timer.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    timerElement.innerHTML = `${formatTimer}`;
}

showTimer();

// Events
focusBtn.addEventListener('click', () => {
    timerTimeSeconds = 1500;
    alternateContext('foco');
    focusBtn.classList.add('active');
});


shortRestBtn.addEventListener('click', () => {
    timerTimeSeconds = 300;
    alternateContext('descanso-curto');
    shortRestBtn.classList.add('active');
});


longRestBtn.addEventListener('click', () => {
    timerTimeSeconds = 900;
    alternateContext('descanso-longo');
    longRestBtn.classList.add('active');
});

musicBtn.addEventListener('change', () => {
    if (music.paused) {
        music.play()
    } else {
        music.pause()
    }
});

startPauseBtn.addEventListener('click', startOrPause);