/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */
import { albums_of_all_time } from "./data.js";

// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array

function showCards() {
 const cardContainer = document.getElementById("card-container");

 for (let i = 0; i < albums_of_all_time.length; i += 1) {
  const card = document.createElement("div");
  card.innerHTML = `
      <div>
        <div>
            ${albums_of_all_time[i].title}
        </div>
        <img src="./images/${albums_of_all_time[i].cover_url}"/>
      </div>
    `;
  cardContainer.append(card);
 }
}

function editCardContent(card, newTitle, newImageURL) {
 card.style.display = "block";

 const cardHeader = card.querySelector("h2");
 cardHeader.textContent = newTitle;

 const cardImage = card.querySelector("img");
 cardImage.src = newImageURL;
 cardImage.alt = newTitle + " Poster";

 // You can use console.log to help you debug!
 // View the output by right clicking on your website,
 // select "Inspect", then click on the "Console" tab
 console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

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
