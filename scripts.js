import { albums_of_all_time } from "./data/data.js";

//store data into a singleton
let displayAlbums = albums_of_all_time;

const modalBox = document.getElementById("dialog");
const modalContent = document.getElementById("modal-content");

let searchArtist = true;
const artistSearchInput = document.getElementById("filterSearch");
const searchByArtistBtn = document.getElementById("searchByArtist");
const searchByAlbumBtn = document.getElementById("searchByAlbum");

const genreFilterSelectMenue = document.getElementById("genreFilter");
genreFilterSelectMenue.addEventListener("change", () => {
 const selectedGenre = genreFilterSelectMenue.value.toLowerCase();
 displayAlbums = displayAlbums.filter((album) => {
  return album.genres.some((genre) =>
   genre.toLowerCase().includes(selectedGenre)
  );
 });
 showCards(displayAlbums);
});
//Search Bar
function changeSearch(searchingByAlbum) {
 searchArtist = searchingByAlbum;
 searchByArtistBtn.classList.remove("underline");
 searchByAlbumBtn.classList.remove("underline");
 if (searchArtist) {
  artistSearchInput.placeholder = "Do you see your favorite Artist?";
  searchByArtistBtn.classList.add("underline");
 } else {
  artistSearchInput.placeholder = "Do you see your favorite Album?";
  searchByAlbumBtn.classList.add("underline");
 }
 searchArtist = false;
}

//Saved Queue Items
let savedAlbums = [];
let savedFilter = false;
const filterSaveBtn = document.getElementById("filterBySaved");
//Display only the values in cards
filterSaveBtn.addEventListener("click", () => {
 artistSearchInput.value = "";
 if (!savedFilter) {
  // Display Saved List
  displayAlbums = savedAlbums;
  filterSaveBtn.classList.add("btn-save-highlight");
  showCards(displayAlbums);
 } else {
  // Display All Albums
  displayAlbums = albums_of_all_time;
  filterSaveBtn.classList.remove("btn-save-highlight");
  showCards(displayAlbums);
 }
 savedFilter = !savedFilter;
});

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
 let albums = displayAlbums;
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
  displayAlbums = albums.filter((album) =>
   album.album_title.toLowerCase().includes(searchTerm)
  );
  showCards(displayAlbums);
 }
}
artistSearchInput.addEventListener("input", () => {
 searchByArtist();
});

function showCards(album) {
 const cardContainer = document.getElementById("card-container");
 //clear html before each render
 cardContainer.innerHTML = "";

 const templateCard = document.querySelector(".card");
 if (album.length === 0) {
  if (artistSearchInput.value.trim().toLowerCase() === "drake") {
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
 const scoreMarker = card.querySelector(".label-score");
 scoreMarker.textContent = album.critic_score;
 if (savedAlbums.map((item) => item.album_title).includes(album.album_title)) {
  saveBtn.classList.add("btn-save-highlight");
 }

 cardHeader.textContent = rank + ". " + album.album_title;
 artistTitle.textContent =
  album.artist +
  `${album.artist[album.artist.length - 1] === "s" ? "'" : "'s"}`;

 saveBtn.addEventListener("click", () => {
  if (savedAlbums.map((item) => item.album_title).includes(album.album_title)) {
   saveBtn.classList.remove("btn-save-highlight");
   let indexToRemove = 0;
   for (let i = 0; i < savedAlbums.length; i += 1) {
    if (savedAlbums[i].album_title === album.album_title) {
     indexToRemove = i;
     break;
    }
   }
   savedAlbums.splice(indexToRemove, 1);
  } else {
   saveBtn.classList.add("btn-save-highlight");
   savedAlbums.push(album);
  }
  if (savedFilter) {
   showCards(savedAlbums);
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
 showCards(displayAlbums);
});
