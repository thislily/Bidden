import { timeAgo } from "./timeAgo.mjs";
import { formatTimeRemaining } from "./endsAt.mjs";
import { checkBiddingStatus } from "./isActive.mjs";
import { fillUpdateListingForm } from "../../render/templates/updateListing.mjs";

/**
 * function that returns a listing card template
 * @param {Object} listing - the listing object
 * @returns {HTMLDivElement} - the listing card template
 *
 */

//template for listing card
export function listingCard(listing) {
  // get id from the query string
  const listingId = new URLSearchParams(window.location.search).get("id");

  const currentBreadcrumb = document.getElementById("current-breadcrumb");
  currentBreadcrumb.textContent = listing.data.title;

  const container = document.createElement("div");
  container.classList.add(
    "container-xxl",
    "bg",
    "bg-white",
    "d-flex",
    "flex-wrap",
    "justify-content-center",
    "align-items-start",
    "gap-3",
    "my-1",
    "mb-5"
  );

  const card = document.createElement("div");
  card.classList.add(
    "card",
    "border-1",
    "border-black",
    "rounded-0",
    "thick-shadow-no-hover"
  );
  card.style.width = "18rem";
  container.appendChild(card);

  const cardTitle = document.createElement("h1");
  cardTitle.classList.add("card-title", "text-center", "h2", "py-2");
  cardTitle.textContent = listing.data.title;
  card.appendChild(cardTitle);

  const carousel = document.createElement("div");
  carousel.id = `carouselExampleIndicators-${listing.data.id}`;
  carousel;
  carousel.classList.add(
    "carousel",
    "slide",
    "card-img",
    "position-relative",
    "rounded-0"
  );
  carousel.style.height = "300px";
  carousel.style.overflow = "hidden";
  card.appendChild(carousel);

  // Add the overlay with the button
  const overlay = document.createElement("div");
  overlay.classList.add(
    "position-absolute",
    "top-0",
    "start-0",
    "d-flex",
    "justify-content-start",
    "align-items-start"
  );
  overlay.style.zIndex = "2";
  overlay.style.width = "100%";
  overlay.style.height = "100px";
  carousel.appendChild(overlay);

  const overlayButton = document.createElement("a");
  overlayButton.href = "#auction-card";
  overlayButton.style.cursor = "pointer";
  overlayButton.id = "go-to-bidding-button";
  overlayButton.classList.add(
    "btn",
    "btn-outline-primary",
    "d-block",
    "d-sm-none",
    "text-black",
    "rounded-0",
    "m-2",
    "fw-semibold"
  );
  overlayButton.textContent = "Bid Now";
  overlay.appendChild(overlayButton);

  // Check if the bidding has ended and display the appropriate text
  if (formatTimeRemaining(listing.data.endsAt) === "") {
    overlayButton.innerText = "See Results";
  }

  const profile = JSON.parse(localStorage.getItem("profile"));

  const updateButton = document.createElement("button");
  if (profile.name === listing.data.seller.name) {
    overlayButton.classList.add("d-none");


    updateButton.classList.add(
      "btn",
      "btn-outline-primary",
      "text-black",
      "rounded-0",
      "m-2",
      "fw-semibold"
    );
    updateButton.id = "update-listing-button";
    updateButton.textContent = "Update";
    updateButton.style.cursor = "pointer";
    updateButton.setAttribute("data-bs-toggle", "modal");
    updateButton.setAttribute("data-bs-target", "#update-listing-modal");
    overlay.appendChild(updateButton);

    updateButton.addEventListener("click", () => {
      fillUpdateListingForm(listing);
    });
  }

if (formatTimeRemaining(listing.data.endsAt) === "") {
updateButton.classList.add("d-none");
  }

  // Continue with creating carousel indicators and items
  const carouselIndicators = document.createElement("div");
  carouselIndicators.classList.add("carousel-indicators");
  carousel.appendChild(carouselIndicators);

  if (
    listing.data.media &&
    Array.isArray(listing.data.media) &&
    listing.data.media.length > 0
  ) {
    listing.data.media.forEach((media, index) => {
      // Create the indicator
      const indicator = document.createElement("button");
      indicator.type = "button";
      indicator.dataset.bsTarget = `#carouselExampleIndicators-${listing.data.id}`;
      indicator.dataset.bsSlideTo = index;
      if (index === 0) indicator.classList.add("active");
      indicator.setAttribute("aria-label", `Slide ${index + 1}`);
      carouselIndicators.appendChild(indicator);

      // Create the carousel item
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (index === 0) carouselItem.classList.add("active");
      carouselItem.style.height = "100%";
      carousel.appendChild(carouselItem);

      // Create the image
      const img = document.createElement("img");
      img.src =
        media.url ||
        "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"; // Fallback to default image
      img.classList.add("d-block", "w-100", "h-100");
      img.alt = media.alt || "Image not available"; // Fallback for alt text
      carouselItem.appendChild(img);
    });
  } else {
    // Handle no media case
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item", "active");
    carouselItem.style.height = "100%";
    carousel.appendChild(carouselItem);

    const img = document.createElement("img");
    img.src =
      "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";
    img.classList.add("d-block", "w-100", "h-100");
    img.alt = "Image not available";
    carouselItem.appendChild(img);
  }

  // Add Previous and Next buttons for carousel control
  const prevButton = document.createElement("button");
  prevButton.classList.add("carousel-control-prev");
  prevButton.type = "button";
  prevButton.dataset.bsTarget = `#carouselExampleIndicators-${listing.data.id}`;
  prevButton.dataset.bsSlide = "prev";
  prevButton.innerHTML = `
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    `;
  carousel.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.classList.add("carousel-control-next");
  nextButton.type = "button";
  nextButton.dataset.bsTarget = `#carouselExampleIndicators-${listing.data.id}`;
  nextButton.dataset.bsSlide = "next";
  nextButton.innerHTML = `
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    `;
  carousel.appendChild(nextButton);

  // Initialize carousel after it's appended
  setTimeout(() => {
    const carouselElement = document.querySelector(
      `#carouselExampleIndicators-${listing.data.id}`
    );
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement);
    }
  }, 100); // Delay to ensure the DOM is updated

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  if (listing.data.description === "") {
    cardText.textContent = "No description provided";
  } else {
    cardText.textContent = listing.data.description;
  }
  cardBody.appendChild(cardText);

  const cardText2 = document.createElement("p");
  cardText2.classList.add("card-text");
  if (listing.data.created === listing.data.updated) {
    cardText2.innerHTML = `<i style="font-size: 0.9rem;">Listed: ${timeAgo(
      listing.data.created
    )}</i>`;
  } else {
    cardText2.innerHTML = `<i style="font-size: 0.9rem;">Listed: ${timeAgo(
      listing.data.created
    )}</i><br><i style="font-size: 0.9rem;">Updated: ${timeAgo(
      listing.data.updated
    )}</i>`;
  }
  cardBody.appendChild(cardText2);

  const seller = document.createElement("p");
  seller.classList.add("fw-semibold", "ps-3", "pb-0", "mb-0");
  seller.textContent = "Seller:";
  card.appendChild(seller);

  const sellerLink = document.createElement("a");
  sellerLink.classList.add(
    "d-flex",
    "align-items-center",
    "justify-content-start",
    "bg-secondary-subtle",
    "px-3",
    "py-1",
    "text-decoration-none",
    "text-black"
  );
  sellerLink.href =
    "../../../profile/index.html?name=" + listing.data.seller.name;
  sellerLink.style.cursor = "pointer";
  card.appendChild(sellerLink);

  const sellerAvatar = document.createElement("img");
  sellerAvatar.classList.add("avatar-mini");
  sellerAvatar.src = listing.data.seller.avatar.url;
  sellerAvatar.alt = listing.data.seller.avatar.alt;
  sellerLink.appendChild(sellerAvatar);

  const sellerName = document.createElement("p");
  sellerName.classList.add("pt-3", "fw-semibold", "ps-2");
  sellerName.textContent = listing.data.seller.name;
  sellerLink.appendChild(sellerName);

  //create second card for auction details
  const card2 = document.createElement("div");
  card2.classList.add(
    "card",
    "border-1",
    "border-black",
    "rounded-0",
    "thick-shadow-no-hover"
  );
  card2.style.width = "18rem";
  card2.id = "auction-card";
  container.appendChild(card2);

  const card2Header = document.createElement("div");
  card2Header.classList.add(
    "border-bottom",
    "border-secondary-subtle",
    "bg-light"
  );
  card2.appendChild(card2Header);

  const card2Title = document.createElement("h2");
  card2Title.classList.add("card-title", "h5", "p-3", "pb-0","text-center");

  // Check if the bidding has ended and display the appropriate text
  if (formatTimeRemaining(listing.data.endsAt) === "") {
    card2Title.textContent = "Bidding has ended";
  } else {
    card2Title.textContent = "Active Bidding";
  }

  card2Header.appendChild(card2Title);

  const card2Text = document.createElement("p");
  card2Text.classList.add("fst-italic", "ps-3");
  //use function to calculate time remaining
  card2Text.textContent = `${formatTimeRemaining(listing.data.endsAt)}`;
  card2Header.appendChild(card2Text);

  const card2Body = document.createElement("div");
  card2Body.classList.add(
    "d-flex",
    "justify-content-start",
    "align-items-center",
    "p-3"
  );
  card2.appendChild(card2Body);

  const bidAvatar = document.createElement("img");
  //check if user is logged in and display avatar
  if (localStorage.getItem("profile")) {

    bidAvatar.src = JSON.parse(localStorage.getItem("profile")).avatar.url;
    bidAvatar.alt = JSON.parse(localStorage.getItem("profile")).avatar.alt;
    bidAvatar.classList.add("avatar-mini");
    card2Body.appendChild(bidAvatar);
  }

  // Create bid input and append it
  const bidInput = document.createElement("input");
  bidInput.type = "text";
  bidInput.name = "bid";
  bidInput.id = "bid";
  bidInput.classList.add("rounded-0", "border-1", "me-2");
  bidInput.style.width = "80px";
  bidInput.style.height = "38px";
  card2Body.appendChild(bidInput);

  // Change the bid button based on user login status
  function updateBidButton() {
    const bidButton = document.createElement("button");
    bidButton.classList.add(
      "btn",
      "btn-outline-primary",
      "text-black",
      "rounded-0"
    );
    bidButton.style.cursor = "pointer";
    bidButton.type = "button"; // Make sure it's a button, not submit

    if (!localStorage.getItem("profile")) {
      bidButton.textContent = "Log in to bid";
      bidInput.disabled = true;

      // Add event listener to open login modal
      bidButton.addEventListener("click", () => {
        const modal = document.getElementById("login-modal");
        if (modal) {
          const bootstrapModal = new bootstrap.Modal(modal);
          bootstrapModal.show(); // Open the login modal
        }
      });
    } else {
      // If user is logged in, display bid button
      bidButton.textContent = "";
      bidInput.disabled = false;
      bidButton.addEventListener("click", () => {
        // Implement bid submission logic here
      });
    }

    const warnSeller = document.createElement("p");
    warnSeller.classList.add("text-danger", "fw-semibold", "px-4", "text-center");
    if (profile.name === listing.data.seller.name) {
        bidButton.classList.add("d-none");
        bidInput.classList.add("d-none");
        bidAvatar.classList.add("d-none");

        warnSeller.textContent = "You cannot bid on your own listing";
        card2.appendChild(warnSeller);
    }

        if (formatTimeRemaining(listing.data.endsAt) === "") {
      bidButton.textContent = "Bidding ended";
      bidButton.classList.add("d-none");
      bidInput.classList.add("d-none");
      bidAvatar.classList.add("d-none");
      warnSeller.textContent = "Auction Closed";
      card2.appendChild(warnSeller);
    }

    // Append the button to the card body
    card2Body.appendChild(bidButton);
  }

  // Call the function to initialize the button
  updateBidButton();
  const bidList = document.createElement("ul");
  bidList.classList.add(
    "list-group",
    "list-group-flush",
    "gap-2",
    "pb-2",
    "border-0"
  );
  card2.appendChild(bidList);

  // Handle all bids except the last one, which is the winning bid
  listing.data.bids.slice(0, -1).forEach((bid) => {
    const bidItem = document.createElement("li");
    bidItem.classList.add("list-group-item", "bg-secondary-subtle", "py-0");
    card2Body.appendChild(bidItem);

    const bidLink = document.createElement("a");
    bidLink.classList.add(
      "d-flex",
      "align-items-center",
      "justify-content-start",
      "bg-secondary-subtle",
      "text-decoration-none",
      "text-black"
    );
    bidLink.href = "../../../profile/index.html?name=" + bid.bidder.name;
    bidLink.style.cursor = "pointer";
    bidItem.appendChild(bidLink);

    const bidAvatar = document.createElement("img");
    bidAvatar.classList.add("avatar-mini");
    bidAvatar.src = bid.bidder.avatar.url;
    bidAvatar.alt = bid.bidder.avatar.alt;
    bidLink.appendChild(bidAvatar);

    const bidCredits = document.createElement("p");
    bidCredits.classList.add("pt-3");
    bidCredits.textContent = `${bid.amount} Credits`;
    bidLink.appendChild(bidCredits);

    bidList.appendChild(bidItem);
  });

  // Handle the last bid as the winning bid
  if (listing.data.bids.length > 0) {
    const winningBid = listing.data.bids[listing.data.bids.length - 1];
    const winningItem = document.createElement("li");
    winningItem.classList.add(
      "list-group-item",
      "bg-primary-subtle",
      "py-0",
      "border-primary",
      "border-1",
      "border-start-0",
      "border-end-0",
      "rounded-0"
    );
    card2Body.appendChild(winningItem);

    const winningLink = document.createElement("a");
    winningLink.classList.add(
      "d-flex",
      "align-items-center",
      "justify-content-start",
      "bg-primary-subtle",
      "text-decoration-none",
      "text-black"
    );
    winningLink.href =
      "../../../profile/index.html?name=" + winningBid.bidder.name;
    winningLink.style.cursor = "pointer";
    winningItem.appendChild(winningLink);

    const winningAvatar = document.createElement("img");
    winningAvatar.classList.add("avatar-mini");
    winningAvatar.src = winningBid.bidder.avatar.url;
    winningAvatar.alt = winningBid.bidder.avatar.alt;
    winningLink.appendChild(winningAvatar);

    const winningCredits = document.createElement("p");
    winningCredits.classList.add("pt-3");
    winningCredits.textContent = `${winningBid.amount} Credits `;
    winningLink.appendChild(winningCredits);

    const winningTag = document.createElement("span");
    winningTag.classList.add("fst-italic", "fw-semibold", "ps-2");

    if(formatTimeRemaining(listing.data.endsAt) === "") {
      winningTag.textContent = " WINNER";
    } else {   
    winningTag.textContent = " WINNING";
    }
    winningLink.appendChild(winningTag);

    bidList.appendChild(winningItem);
  }

  return container;
}
