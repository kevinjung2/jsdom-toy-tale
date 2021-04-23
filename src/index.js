let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      const form = document.getElementsByClassName('add-toy-form')
      form[0].addEventListener('submit', addNewToy)
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(createCards)

});

function createCards(obj) {
  for (let toy in obj) {
    let card = document.createElement('div')
    card.class = "card"
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let p = document.createElement('p')
    let button = document.createElement('button')
    h2.innerText = obj[toy].name
    h2.id = obj[toy].id
    img.src = obj[toy].image
    img.class = "toy-avatar"
    p.innerText = obj[toy].likes
    button.class = "like-btn"
    let div = document.getElementById('toy-collection')
    div.append(card)
    card.append(h2, img, p, button)
    button.addEventListener('click', addLike)
  }
}

function addNewToy(e) {
  e.preventDefault()
  let toy = {name: `${e.target.children[1]}`, image: `${e.target.children[3]}`}
  fetch('http://localhost:3000/toys', {method: "POST", headers: {
  "Content-Type": "application/json",
  "Accept": "application/json"},
  body: JSON.stringify({
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0})})
}

function addLike(e) {
  const p = e.target.parentElement.children[2]
  const oldLikes = parseInt(p.innerText)
  p.innerText = oldLikes + 1
  fetch(`http://localhost:3000/toys/${e.target.parentElement.children[0].id}`, {
    method: "PATCH", headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"},
    body: JSON.stringify({
    "likes": `${oldLikes + 1}`})})
}
