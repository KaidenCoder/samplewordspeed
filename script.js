const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//List of words for game
const words = [
    'Death and life are in the power of the tongue and those who love it will eat its fruits',
    'If anyone thinks he is religious and does not bridle his tongue but deceives his heart this person religion is worthless',
    'Whoever keeps his mouth and his tongue keeps himself out of trouble',
    'There is one whose rash words are like sword thrusts but the tongue of the wise brings healing',
    'For whoever desires to love life and see good days let him keep his tongue from evil and his lips from speaking deceit',
    'Let no corrupting talk come out of your mouths but only such as is good for building up as fits the occasion that it may give grace to those who hear',
    'A gentle tongue is a tree of life but perverseness in it breaks the spirit',
    'But no human being can tame the tongue it is a restless evil full of deadly poison',
    'When words are many transgression is not lacking but whoever restrains his lips is prudent',
    'A soft answer turns away wrath but a harsh word stirs up anger',
    'So also the tongue is a small member yet it boasts of great things how great a forest is set ablaze by such a small fire',
    'I tell you on the day of judgment people will give account for every careless word they speak',
    'Keep your tongue from evil and your lips from speaking deceit',
    'Set a guard O Lord over my mouth keep watch over the door of my lips',
    'Whoever guards his mouth preserves his life he who opens wide his lips comes to ruin',
    'Let your speech always be gracious seasoned with salt so that you may know how you ought to answer each person',
    'Know this my beloved brothers let every person be quick to hear slow to speak slow to anger',
    'With it we bless our Lord and Father and with it we curse people who are made in the likeness of God',
    'For we all stumble in many ways and if anyone does not stumble in what he says he is a perfect man able also to bridle his whole body',
    'The heart of the righteous ponders how to answer but the mouth of the wicked pours out evil thing',
    'Do you see a man who is hasty in his words there is more hope for a fool than for him',
    'But what comes out of the mouth proceeds from the heart and this defiles a person',
    'You brood of vipers how can you speak good when you are evil for out of the abundance of the heart the mouth speaks',
    'For the word of God is living and active sharper than any two-edged sword piercing to the division of soul and of spirit of joints and of marrow and discerning the thoughts and intentions of the heart',
    'Your word is a lamp to my feet and a light to my path',
    'I have stored up your word in my heart that I might not sin against you',
    'But he answered it is written man shall not live by bread alone but by every word that comes from the mouth of God',
    'Every word of God proves true he is a shield to those who take refuge in him',
    'But be doers of the word and not hearers only deceiving yourselves',
    'Let the word of Christ dwell in you richly teaching and admonishing one another in all wisdom singing psalms and hymns and spiritual songs with thankfulness in your hearts to God'
];

// Init word
let randomWord;

// Init score
let score = 15;

// Init time
let time = 60;

// Set difficulty
let difficulty = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'easy';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'easy';

// Focus on text on start
text.focus()

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generates random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update Score
function updateScore() {

    score--;
    scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval)
        //end game

        gameOver()
        // coronaDestroyed()

    }

    if (score === 0) {
        time++;
    }


}

// Game Over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <h2>Your remaining items are ${score}</h2>
        <button onclick="location.reload()">Play Again</button>
    `;

    endgameEl.style.display = 'flex';
}

function coronaDestroyed() {

    endgameEl.innerHTML = `
        <h1>Hoorah!</h1>
        <h2>You are safe from COVID-19</h2>
        <button onclick="location.reload()">Play Again</button>
    `;


    endgameEl.style.display = 'flex';
}




addWordToDOM();

// Event listeners


// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();


        // Clear
        e.target.value = '';
        if (difficulty === 'hard') {

            time += 30;
        } else if (difficulty === 'medium') {

            time += 40;
        } else {

            time += 50;
        }
        updateTime()
    }

    if (score === 0) {

        coronaDestroyed()
    }
})

// Settings btn click
settingsBtn.addEventListener('click', () =>
    settings.classList.toggle('hide'))

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty)
})

