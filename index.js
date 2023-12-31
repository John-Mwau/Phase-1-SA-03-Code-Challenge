
  // Get html element via getElementbyId
const characterData = () => {
  const characters = document.getElementById('bar')

  characters.innerHTML = '';
//fetch the animals info from Json API and display them
let API_URL = 'http://localhost:3000/characters'
  fetch(API_URL)
  .then(response => response.json())// Translate into readbale data

  .then(data => {
      console.log(data);
      //Create characters via the DOM to be shown on the browser.
      data.forEach(candidate =>{
          const characterList = document.createElement('li')
          characterList.textContent = candidate.name;

         // click event for each candidate when clicked
          characterList.addEventListener('click', () => {
              console.log(`${candidate.name}: chosen`)
              //
              const characterImage = document.getElementById('image')
              const characterName = document.getElementById('name')
              const characterVotes = document.getElementById('vote-count')

              characterImage.src = candidate.image;
              characterName.innerText = candidate.name;
              characterVotes.innerText = candidate.votes;

              let currentVote = parseInt(characterVotes.textContent, 10)

              const votesForm = document.getElementById('votes-form')
              const votes = document.getElementById('votes')

              //submit event for the votes
              votesForm.addEventListener('submit', (event) =>{
                  event.preventDefault()// stops reset to default
                  let newVote = parseInt(votes.value, 10)
                  currentVote = currentVote + newVote;
                  characterVotes.textContent = currentVote;


              })

          })
          // append child
          characters.appendChild(characterList)

      })

  })
}
//shows content to the user when invoked
document.addEventListener('DOMContentLoaded', characterData)