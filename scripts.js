import { albums_of_all_time } from "./data.js";

// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array
const modalBox = document.getElementById("dialog");
const modalContent = document.getElementById("modal-content");

let savedAlbums = [];

const artistSearchInput = document.getElementById("filterSearch");

let searchArtist = true;
const searchByArtistBtn = document.getElementById("searchByArtist");
const searchByAlbumBtn = document.getElementById("searchByAlbum");

function changeSearch(searchingByAlbum) {
 searchArtist = searchingByAlbum;

 searchByArtistBtn.classList.remove("underline");
 searchByAlbumBtn.classList.remove("underline");
 if (searchArtist) {
  artistSearchInput.placeholder = "Did your Favorite Artist Make the Cut? 👀";
  searchByArtistBtn.classList.add("underline");
 } else {
  artistSearchInput.placeholder = "Did your Favorite Album Make the Cut? 👀";
  searchByAlbumBtn.classList.add("underline");
 }
}

searchByAlbumBtn.addEventListener("click", () => changeSearch(false));
searchByArtistBtn.addEventListener("click", () => changeSearch(true));
function isSubsequence(subsequence, sequence) {
 let subsequenceIndex = 0;
 for (let i = 0; i < sequence.length; i++) {
  if (sequence[i] === subsequence[subsequenceIndex]) {
   subsequenceIndex++;
   if (subsequenceIndex === subsequence.length) {
    return true;
   }
  }
 }
 return false;
}
function searchByArtist() {
 let albums = albums_of_all_time;
 const searchTerm = artistSearchInput.value.trim().toLowerCase();

 if (searchArtist) {
  showCards(
   albums.filter((album) => {
    const artistLowerCase = album.artist.toLowerCase();
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
     artistLowerCase.includes(searchTermLowerCase) ||
     isSubsequence(searchTermLowerCase, artistLowerCase)
    );
   })
  );
 } else {
  showCards(
   albums.filter((album) =>
    album.album_title.toLowerCase().includes(searchTerm)
   )
  );
 }
}
artistSearchInput.addEventListener("input", () => {
 searchByArtist();
});

const genreFilterSelectMenue = document.getElementById("genreFilter");
genreFilterSelectMenue.addEventListener("change", () => {
 let albums = albums_of_all_time;
 const selectedGenre = genreFilterSelectMenue.value.toLowerCase();
 const filteredAlbums = albums.filter((album) => {
  return album.genres.some((genre) =>
   genre.toLowerCase().includes(selectedGenre)
  );
 });

 showCards(filteredAlbums);
});

function showCards(album) {
 const cardContainer = document.getElementById("card-container");
 //clear html before each render
 cardContainer.innerHTML = "";

 const templateCard = document.querySelector(".card");
 if (album.length === 0) {
  if (artistSearchInput.value.trim().toLowerCase() === "kanye") {
   cardContainer.append("lol");
  } else {
   cardContainer.append("hmm... Something doesn't seem right 🤔");
  }
 } else {
  for (let i = 0; i < album.length; i++) {
   const nextCard = templateCard.cloneNode(true); // Copy the template card
   editCardContent(
    nextCard,
    i + 1,
    album[i].album_title,
    `./images/${album[i].cover_url ? album[i].cover_url : `emptyImage.svg`}`,
    album[i]
   );
   cardContainer.append(nextCard);
  }
 }
}

function editCardContent(card, rank, newTitle, newImageURL, album) {
 card.style.display = "flex";
 const cardHeader = card.querySelector(".title");
 const artistTitle = card.querySelector(".artist");
 const btn = card.querySelector(".btn");
 const saveBtn = card.querySelector(".btn-save");

 cardHeader.textContent = rank + ". " + album.album_title;
 artistTitle.textContent =
  album.artist +
  `${album.artist[album.artist.length - 1] === "s" ? "'" : "'s"}`;
 saveBtn.addEventListener("click", () => {
  if (savedAlbums.map((item) => item.album_title).includes(album.album_title)) {
   alert("album is already added");
  } else {
   savedAlbums.push(album);
  }
 });

 //render modal on button click
 btn.addEventListener("click", () => {
  modalContent.innerHTML = `
    <div class="album-info">
      <div class="modal-content-1">
        <h1 class="rank">${rank}. ${album.album_title}</h1>
       
        <img src="./images/${
         album.cover_url ? album.cover_url : `emptyImage.svg`
        }" alt="${album.album_title} Cover"/>
      </div>
      <div class="modal-content-2">
      
        <div class="flex items-center">
          <h3 class="genre-title justify-center">Genres:</h3>
          <ul class="genre-list">
            ${album.genres.map((x) => `<li>${x},</li>`).join("")}
          </ul>
        </div>
        
        <h3 class="date"> <span>Released:</span> ${album.date}</h3>
          <h3 class="artist"><span>Artist:</span> ${album.artist}</h3>
          <h3 class="critic-rating">
          <span class="label">Critic Score</span> 
          <span class="score">${album.critic_score}</span>
        </h3>
      </div>
    </div>
  `;
  modalBox.showModal();
 });

 const cardImage = card.querySelector("img");
 cardImage.src = newImageURL;
 cardImage.alt = newTitle + " Poster";

 console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", () => {
 showCards(albums_of_all_time);
});

function quoteAlert() {
 console.log("Button Clicked!");
 alert(
  "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
 );
}

function removeLastCard() {
 titles.pop(); // Remove last item in titles array
 showCards(); // Call showCards again to refresh
}
