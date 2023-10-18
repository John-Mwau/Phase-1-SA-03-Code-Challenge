
  // create a variable to contain the json file
const ApiVariable = 'http://localhost:3000/characters';
// creating a function to fetch the data
async function getCharacters() {
  try {
      const response = await fetch(ApiVariable);
      const characters = await response.json();
// selecting the elements in the "index.html" file
      const characterList = document.querySelector('.character-list');
      characterList.innerHTML = '';
// creating a callback function 
      characters.forEach((character) => {
        const characterName = document.createElement('div');
        characterName.classList.add('character-name');

        characterName.innerHTML = `
            <h2 data-id="${character.id}">${character.name}</h2>
        `;
//adding an eventListener 
        characterName.querySelector('h2').addEventListener('click', () => {
            showCharacterDetails(character);
        });

        characterList.appendChild(characterName);
    });
} catch (error) {
    console.error('Error fetching characters:', error);
}
}

function showCharacterDetails(character) {
const characterDetails = document.querySelector('.character-details');
characterDetails.innerHTML = `
    <img src="${character.image}" alt="${character.name}">
    <h2>${character.name}</h2>
    <p>Votes: ${character.votes}</p>
    <button class="vote-btn" data-id="${character.id}">Vote</button>
`;

characterDetails.style.display = 'block';

// creating a function for the vote button 
const voteButton = characterDetails.querySelector('.vote-btn');
voteButton.addEventListener('click', () => {
    voteForCharacter(character);
});
}

async function voteForCharacter(character) {
character.votes++;


const characterDetails = document.querySelector('.character-details');
characterDetails.innerHTML = `
    <img src="${character.image}" alt="${character.name}">
    <h2>${character.name}</h2>
    <p>Votes: ${character.votes}</p>
    <button class="vote-btn" data-id="${character.id}">Vote</button>
`;


characterDetails.style.display = 'block';

fetch(API_URL + `/${character.id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(character),
});
}

fetchCharacters();