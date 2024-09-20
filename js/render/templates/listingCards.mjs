import { timeAgo } from "./timeAgo.mjs";
import { formatTimeRemaining } from "./endsAt.mjs";
import { checkBiddingStatus } from "./isActive.mjs";

/**
 * function that returns a listing card template
 * @param {Object} listing - the listing object
 * @returns {HTMLDivElement} - the listing card template
 * 
 */

//template for listing card
export function listingCard(listing) {
  const container = document.createElement("div");
    container.classList.add("container-xxl", "bg", "bg-white", "d-flex", "flex-wrap", "justify-content-center", "align-items-start", "gap-3", "my-4", "mb-5");

    const card = document.createElement("div");
    card.classList.add("card", "border-1", "border-black", "rounded-0", "thick-shadow-no-hover");
    card.style.width = "18rem";
    container.appendChild(card);

    const cardTitle = document.createElement("h1");
    cardTitle.classList.add("card-title", "text-center", "h2", "py-2");
    cardTitle.textContent = listing.data.title;
    card.appendChild(cardTitle);

    const carousel = document.createElement("div");
    carousel.id = `carouselExampleIndicators-${listing.data.id}`;carousel
    carousel.classList.add("carousel", "slide", "card-img", "position-relative");
    carousel.style.height = "300px";
    carousel.style.overflow = "hidden";
    card.appendChild(carousel);
    
    // Add the overlay with the button
    const overlay = document.createElement("div");
    overlay.classList.add("position-absolute", "top-0", "start-0", "d-flex", "justify-content-start", "align-items-start");
    overlay.style.zIndex = "2";
    overlay.style.width = "100%";
    overlay.style.height = "100px";
    carousel.appendChild(overlay);
    
    const overlayButton = document.createElement("a");
    overlayButton.href = "#auction-card";
    overlayButton.classList.add("btn", "btn-outline-primary","d-block" ,"d-sm-none", "text-black", "rounded-0", "m-2");
    overlayButton.textContent = "Bid Now";
    overlay.appendChild(overlayButton);
    
    // Continue with creating carousel indicators and items
    const carouselIndicators = document.createElement("div");
    carouselIndicators.classList.add("carousel-indicators");
    carousel.appendChild(carouselIndicators);
    
    if (listing.data.media && Array.isArray(listing.data.media) && listing.data.media.length > 0) {
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
            img.src = media.url || "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";  // Fallback to default image
            img.classList.add("d-block", "w-100", "h-100");
            img.alt = media.alt || "Image not available";  // Fallback for alt text
            carouselItem.appendChild(img);
        });
    } else {

        // Handle no media case
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item", "active");
        carouselItem.style.height = "100%";
        carousel.appendChild(carouselItem);
    
        const img = document.createElement("img");
        img.src = "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";
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
        const carouselElement = document.querySelector(`#carouselExampleIndicators-${listing.data.id}`);
        if (carouselElement) {
            new bootstrap.Carousel(carouselElement);
        }
    }, 100);  // Delay to ensure the DOM is updated
    
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
    cardText2.innerHTML = `<i style="font-size: 0.9rem;">Listed: ${timeAgo(listing.data.created)}</i><br><i style="font-size: 0.9rem;">Updated: ${timeAgo(listing.data.updated)}</i>`;
    cardBody.appendChild(cardText2);

    const seller = document.createElement("p");
    seller.classList.add("fw-semibold", "ps-3", "pb-0", "mb-0");
    seller.textContent = "Seller:";
    card.appendChild(seller);

    const sellerLink = document.createElement("a");
    sellerLink.classList.add("d-flex", "align-items-center", "justify-content-start", "bg-secondary-subtle", "px-3", "py-1", "text-decoration-none", "text-black");
    sellerLink.href = '../../../profile/index.html?name=' + listing.data.seller.name;
    sellerLink.style.cursor = "pointer";
    card.appendChild(sellerLink);

    const sellerAvatar = document.createElement("img");
    sellerAvatar.classList.add("avatar-mini");
    sellerAvatar.src = listing.data.seller.avatar.url;
    sellerAvatar.alt = listing.data.seller.avatar.alt;
    sellerLink.appendChild(sellerAvatar);

    const sellerName = document.createElement("p");
    sellerName.classList.add("pt-2");
    sellerName.textContent = listing.data.seller.name;
    sellerLink.appendChild(sellerName);


    //create second card for auction details
    const card2 = document.createElement("div");
    card2.classList.add("card", "border-1", "border-black", "rounded-0", "thick-shadow-no-hover");
    card2.style.width = "18rem";
    card2.id = "auction-card";
    container.appendChild(card2);

    const card2Header = document.createElement("div");
    card2Header.classList.add("border-bottom", "border-secondary-subtle", "bg-light");
    card2.appendChild(card2Header);

    const card2Title = document.createElement("h2");
    card2Title.classList.add("card-title", "h5", "p-3", "pb-0");

    // Check if the bidding has ended and display the appropriate text
    if (checkBiddingStatus(listing.data.endsAt) === "Ended") {
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
    card2Body.classList.add("d-flex", "justify-content-start", "align-items-center", "p-3");
    card2.appendChild(card2Body);

    //check if user is logged in and display avatar
    if (localStorage.getItem("profile")) {
        const bidAvatar = document.createElement("img");
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
          bidButton.classList.add("btn", "btn-outline-primary", "text-black", "rounded-0");
          bidButton.style.cursor = "pointer";
          bidButton.type = "button";  // Make sure it's a button, not submit
  
          if (!localStorage.getItem("profile")) {
              bidButton.textContent = "Log in to bid"; 
              bidInput.disabled = true;
  
              // Add event listener to open login modal
              bidButton.addEventListener("click", () => {
                  const modal = document.getElementById("login-modal");
                  if (modal) {
                      const bootstrapModal = new bootstrap.Modal(modal);
                      bootstrapModal.show();  // Open the login modal
                  }
              });
          } else {
              // If user is logged in, display bid button
              bidButton.textContent = "Bid";
              bidInput.disabled = false;
              bidButton.addEventListener("click", () => {
                  // Implement bid submission logic here
                  console.log("User is bidding...");
              });
          }
  
          // Append the button to the card body
          card2Body.appendChild(bidButton);
      }
  
      // Call the function to initialize the button
      updateBidButton();
    const bidList = document.createElement("ul");
    bidList.classList.add("list-group", "list-group-flush", "gap-2", "pb-2", "border-0");
    card2.appendChild(bidList);


// Handle all bids except the last one, which is the winning bid
listing.data.bids.slice(0, -1).forEach(bid => {
    const bidItem = document.createElement("li");
    bidItem.classList.add("list-group-item", "bg-secondary-subtle", "py-0");
    card2Body.appendChild(bidItem);

    const bidLink = document.createElement("a");
    bidLink.classList.add("d-flex", "align-items-center", "justify-content-start", "bg-secondary-subtle", "text-decoration-none", "text-black");
    bidLink.href = '../../../profile/index.html?name=' + bid.bidder.name;
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
    winningItem.classList.add("list-group-item", "bg-primary-subtle", "py-0", "border-primary", "border-1", "border-start-0", "border-end-0", "rounded-0");
    card2Body.appendChild(winningItem);

    const winningLink = document.createElement("a");
    winningLink.classList.add("d-flex", "align-items-center", "justify-content-start", "bg-primary-subtle", "text-decoration-none", "text-black");
    winningLink.href = '../../../profile/index.html?name=' + winningBid.bidder.name;
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
    winningTag.textContent = " WINNING";
    winningLink.appendChild(winningTag);

    bidList.appendChild(winningItem);
}


    return container;

}














/* <div class="container-xxl bg bg-white d-flex flex-wrap justify-content-center align-items-start gap-3 my-4 mb-5">
<div class="card border-1 border-black rounded-0 thick-shadow-no-hover" style="width: 18rem;">
  <h1 class="card-title text-center h2 pt-1">Cute Lamp</h1>
  <div id="carouselExampleIndicators" class="carousel slide card-img" style="height: 300px;">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner h-100">
      <div class="carousel-item active h-100">
        <img src="../images/item.jpg" class="d-block w-100 h-100" alt="Slide 1">
      </div>
      <div class="carousel-item h-100">
        <img src="../images/avatar.jpg" class="d-block w-100 h-100" alt="Slide 2">
      </div>
      <div class="carousel-item h-100">
        <img src="../images/banner.jpg" class="d-block w-100 h-100" alt="Slide 3">
      </div>
    </div>

    <div class="card-img-overlay d-flex d-md-none justify-content-start align-items-start">
      <a href="#auction-card" class="btn btn-outline-primary text-black rounded-0">Bid Now</a>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <div class="card-body">
    <p class="card-text">Just a cutie pie little lamp.</p>

    <p class="card-text">
      <i style="font-size: 0.9rem;">Listed: 7 hours ago</i>
      <br>
      <i style="font-size: 0.9rem;">Updated: 2 hours</i>
    </p>

    
  </div>

  <p class="fw-semibold ps-3 pb-0 mb-0">Seller:</p>
  <a class="d-flex align-items-center justify-content-start bg-secondary-subtle px-3 py-1 text-decoration-none text-black" style="cursor: pointer;">
    <img class="avatar-mini" src="../images/avatar.jpg" alt="avatar">
    <p class=" pt-2">Lady Nameson</p>
  </a>
</div>


  <div class="card border-1 border-black rounded-0 thick-shadow-no-hover" style="width: 18rem;" id="auction-card">
      <div class="border-bottom border-secondary-subtle bg-light ">
          <h2 class="card-title h5 p-3 pb-0">Active Bidding</h2>
          <p class="fst-italic ps-3">Bidding ends in 2 hours</p>
      </div>

      <div class="d-flex justify-content-start align-items-center p-3">
          <img src="../images/avatar.jpg" alt="avatar" class="avatar-mini">
          <input type="text" name="bid" id="bid" class="rounded-0 border-1 me-2" style="width: 80px; height: 38px;">
          <button class="btn btn-outline-primary text-black rounded-0">Bid</button>
      </div>
 
      <ul class="list-group list-group-flush gap-2 pb-2 border-0">
          <li class="list-group-item bg-secondary-subtle py-1"><img src="../images/avatar.jpg" alt="avatar" class="avatar-mini">22 Credits</li>
          <li class="list-group-item bg-secondary-subtle py-1"> <img src="../images/avatar.jpg" alt="avatar" class="avatar-mini">26 Credits</li>
          <li class="list-group-item bg-primary-subtle py-1 border-primary border-1 border-start-0 border-end-0 rounded-0"><img src="../images/avatar.jpg" alt="avatar" class="avatar-mini">31 Credits <span class="fst-italic fw-semibold">WINNING</span></li>
        </ul>
  </div>

</div> */