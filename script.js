//DOM Selection
const wrapper = document.querySelector('.wrapper ');
const audio = document.querySelector('.audio');
const inputElement = document.querySelector('.input-word');
// const audioElement = document.querySelector('.audio-player');
let word;

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

inputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    word = inputElement.value.trim();

    const wordRegex = /^[a-zA-Z]+$/; // Matches only letters

    if (!wordRegex.test(word)) {
      alert('Please enter a valid word containing only letters');
      return;
    }

    // console.log(word);
    Dictionary();
  }
});

const Dictionary = async () => {
  try {
    const rep = await fetch(`${url}${word}`);
    if (!rep.ok) {
      throw new Error(`API request failed with status: ${rep.status}`);
    }
    const data = await rep.json();
    console.log(data);
    getDictionary(data);
  } catch (error) {
    console.log('Error fetching definition:', error);
    return null;
  }
};

const getDictionary = (data) => {
  const audioUrl = data[0].phonetics[0].audio;

  const wordOutput = wrapper.querySelector('.world-output');
  const wordHeading = wrapper.querySelector('h3');
  const definition = wordOutput.querySelector('.def-one');
  const definitiontwo = wordOutput.querySelector('.def-two');

  wordHeading.textContent = data[0].word;
  definition.textContent = data[0].meanings[0].definitions[0].definition;
  definitiontwo.textContent = data[0].meanings[0].definitions[1].definition;
  // audioSource.src = data[0].phonetics[0].audio;
  // console.log(audioSource);
  audio.innerHTML = `
    <div class="flex justify-center">
        <audio controls class="audio-player">
        <source src="${audioUrl}" type="audio/mpeg" />
        Your browser does not support the audio element.
        </audio>
    </div>
  `;
};
