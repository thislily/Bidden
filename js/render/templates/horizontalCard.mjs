//template for horizontal card

export function horizontalCard(data) {
const card = document.createElement("div");
card.classList.add("card", "mb-3", "thick-shadow", "rounded-0", "col-10", "col-sm-8");
card.style.maxWidth = "560px";

const cardLink = document.createElement("a");
cardLink.href = "../listing/index.html";
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

const cardText = document.createElement("p");
cardText.classList.add("card-text", "text-primary", "h4", "fw-semibold", "bg-black", "p-2");
cardText.style.maxWidth = "fit-content";
cardText.textContent = data.price;
cardImgOverlay.appendChild(cardText);

const cardImg = document.createElement("img");
cardImg.src = data.image;
cardImg.classList.add("img-fluid", "object-fit-cover", "rounded-0");
cardImg.style.minHeight = "259px";
cardImg.style.height = "100%";
cardImg.style.width = "100%";
cardImg.alt = data.alt;
cardCol1.appendChild(cardImg);

const cardCol2 = document.createElement("div");
cardCol2.classList.add("col-md-6");
cardRow.appendChild(cardCol2);

const cardBody = document.createElement("div");
cardBody.classList.add("card-body", "d-flex", "flex-column", "justify-content-between", "h-100");
cardCol2.appendChild(cardBody);

const cardTitle = document.createElement("h2");
cardTitle.classList.add("card-title", "h5");
cardTitle.textContent = data.title;
cardBody.appendChild(cardTitle);

const cardText2 = document.createElement("p");
cardText2.classList.add("card-text");
cardText2.textContent = data.description;
cardBody.appendChild(cardText2);

const cardText3 = document.createElement("p");
cardText3.classList.add("card-text", "text-secondary-emphasis", "fst-italic");
cardBody.appendChild(cardText3);

const cardText4 = document.createElement("p");
cardText4.classList.add("card-text", "pt-2");
cardBody.appendChild(cardText4);

const cardText5 = document.createElement("small");
cardText5.classList.add("text-body-secondary", "fst-italic");
cardText5.textContent = "Created 7 hours ago";
cardText4.appendChild(cardText5);

const cardText6 = document.createElement("br");
cardText4.appendChild(cardText6);

const cardText7 = document.createElement("small");
cardText7.classList.add("text-body-secondary", "fst-italic");
cardText7.textContent = "Last updated 3 mins ago";
cardText4.appendChild(cardText7);

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