import { checkBiddingStatus } from "../templates/isActive.mjs";
import { timeAgo } from "../templates/timeAgo.mjs";

/**
 * function that returns a horizontal card template
 * @param {Object} listing - the listing data
 * @returns {HTMLDivElement} - the card template
 */

//template for horizontal card
export function horizontalCard(listing) {
  const card = document.createElement("div");
  card.classList.add("card", "mb-3", "thick-shadow", "rounded-0", "col-10", "col-sm-8");
  card.style.maxWidth = "560px";

  const cardLink = document.createElement("a");
  // Include the listing ID in the query string
  cardLink.href = `../listing/index.html?id=${listing.id}`;
  cardLink.classList.add("text-black", "text-decoration-none");
  cardLink.style.cursor = "pointer";
  card.appendChild(cardLink);

  const cardRow = document.createElement("div");
  cardRow.classList.add("row", "g-0");
  cardLink.appendChild(cardRow);

  const cardCol1 = document.createElement("div");
  cardCol1.classList.add("col-md-6");
  cardCol1.style.maxHeight = "360px";
  cardRow.appendChild(cardCol1);

  const cardImgOverlay = document.createElement("div");
  cardImgOverlay.classList.add("card-img-overlay");
  cardCol1.appendChild(cardImgOverlay);

  // Check if bidding has ended using endsAt
  const cardText = document.createElement("p");
  cardText.classList.add("card-text", "h4", "fw-semibold", "p-2");
  cardText.style.maxWidth = "fit-content";
  if (checkBiddingStatus(listing.endsAt) === "Active") {
    cardText.classList.add("bg-primary", "text-black");
  } else {
    cardText.classList.add("bg-black", "text-primary");
  }
  cardText.textContent = checkBiddingStatus(listing.endsAt); // Use endsAt for bidding status
  cardImgOverlay.appendChild(cardText);

  // Check if there's media, otherwise set a default image
  const cardImg = document.createElement("img");
  if (listing.media.length > 0) {
    cardImg.src = listing.media[0].url; // Ensure 'url' is lowercase, not 'URL'
    cardImg.alt = listing.media[0].alt || "Listing image";
  } else {
    cardImg.src = "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"; // Use a default image if no media
    cardImg.alt = "Default listing image";
  }
  cardImg.classList.add("img-fluid", "object-fit-cover", "rounded-0");
  cardImg.style.height = "360px";
  cardImg.style.width = "100%";
  cardCol1.appendChild(cardImg);

  const cardCol2 = document.createElement("div");
  cardCol2.classList.add("col-md-6");
  cardRow.appendChild(cardCol2);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex", "flex-column", "justify-content-between", "h-100");
  cardCol2.appendChild(cardBody);

  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card-title", "h3");
  cardTitle.textContent = listing.title;
  cardBody.appendChild(cardTitle);

  const cardText2 = document.createElement("p");
  cardText2.classList.add("card-text", "listing-description-truncate");
  cardText2.textContent = listing.description;
  cardBody.appendChild(cardText2);

  const cardText3 = document.createElement("p");
  cardText3.classList.add("card-text", "text-secondary-emphasis", "fst-italic", "fw-semibold");
  cardText3.textContent ="Bids so far: " + listing._count.bids;
  cardBody.appendChild(cardText3);

  // Create small elements for created and updated, using timeAgo to display time
  const cardText4 = document.createElement("p");
  cardText4.classList.add("card-text", "pt-2");
  cardBody.appendChild(cardText4);

  const cardText5 = document.createElement("p");
  cardText5.classList.add("text-body-secondary", "fst-italic");
  cardText5.style.fontSize = "0.9rem";
  if (listing.created === listing.updated) {
    cardText5.textContent = `Listed: ${timeAgo(listing.created)}`;
  } else {
    cardText5.textContent += `Listed: ${timeAgo(listing.created)}`
    const br = document.createElement("br");
    cardText5.appendChild(br);
    const cardText6 = document.createElement("p");
    cardText6.classList.add("text-body-secondary", "fst-italic");
    cardText6.style.fontSize = "0.9rem";
    cardText6.textContent += `Updated ${timeAgo(listing.updated)}`;
    cardText5.appendChild(cardText6);
  }

  cardText4.appendChild(cardText5);

  return card;
}

/* <div
class="card mb-3 thick-shadow rounded-0 col-10 col-sm-8"
style="max-width: 560px"
>
<a href="../listing/index.html" class="text-black text-decoration-none">
  <div class="row g-0">
    <div class="col-md-6" style="max-height: 360px">
      <!-- card-img-overlay -->
      <div class="card-img-overlay">
        <p class="card-text text-primary h4 fw-semibold bg-black p-2" style="max-width: fit-content; ">75</p>
      </div>
      <img
        src="../images/item.jpg"
        class="img-fluid object-fit-cover rounded-0"
        style="min-height: 259px; height: 100%; width: 100%"
        alt="its a lamp"
      />
    </div>
    <div class="col-md-6 ">
      <div class="card-body d-flex flex-column justify-content-between h-100">
        <h2 class="card-title h5">Cute Lamp</h2>
        <p class="card-text">Just a cutie pie little lamp.</p>
        <p class="card-text text-secondary-emphasis fst-italic">
          <span class="text-decoration-underline">lamp</span>,
          <span class="text-decoration-underline">cute</span>,
          <span class="text-decoration-underline">cutelamp</span>
        </p>
        <p class="card-text pt-2">
          <small class="text-body-secondary fst-italic"
            >Created 7 hours ago </small>
            <br>
          <small class="text-body-secondary fst-italic">Last updated 3 mins ago</small>
        </p>

      </div>
    </div>
  </div> 
</a>
</div> */