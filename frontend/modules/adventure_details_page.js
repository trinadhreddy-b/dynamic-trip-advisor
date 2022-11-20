import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let urlId = new URLSearchParams(search);
  // Place holder for functionality to work in the Stubs
  return urlId.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  console.log(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
  try {
    const data = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
    return await data.json();
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
 
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML=`${adventure.name}`;
  document.getElementById("adventure-subtitle").innerHTML=`${adventure.subtitle}`;
  const imgNode = document.getElementById("photo-gallery");
  adventure.images.forEach((key)=>{
    const photo = document.createElement("div");
    photo.innerHTML=`
    <img class="activity-card-image" src=${key}>
    `
    imgNode.appendChild(photo);
  })
  document.getElementById("adventure-content").innerHTML=`${adventure.content}`;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  const imgNode = document.getElementById("photo-gallery");
  imgNode.innerHTML=`
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators" id="car-ind">
    
          </div>
          <div class="carousel-inner" id="car-img">
    
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
  `

  images.forEach((key,id)=>{
    const photo = document.createElement("div");
    if(id==0){
      photo.className="carousel-item active";
    photo.innerHTML=`
    <img src="${key}" class="d-block w-100" alt="...">
    `
    }
    else{
      photo.className="carousel-item";
    photo.innerHTML=`
    <img src="${key}" class="d-block w-100" alt="...">
    `

    }
    document.getElementById("car-img").appendChild(photo);
  })

  const buttonCar=document.getElementById("car-ind");

  images.forEach((key,id)=>{
    if(id==0){
   buttonCar.innerHTML= buttonCar.innerHTML + `<button type="button" data-bs-target="#carouselExampleIndicators" class="active" data-bs-slide-to="${id}"></button>`;
    }
    else{
      buttonCar.innerHTML= buttonCar.innerHTML + `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${id}"></button>`;
    }
  })



}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-panel-available").style.display="block";
    document.getElementById("reservation-person-cost").textContent=adventure.costPerHead;

  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display="block";
    document.getElementById("reservation-panel-available").style.display="none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent=adventure.costPerHead*persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  const form=document.getElementById("myForm");
  form.addEventListener("submit",async (event)=>{
    event.preventDefault();
  const data={
    "name":form.elements["name"].value,
    "date":form.elements["date"].value,
    "person":form.elements["person"].value,
    "adventure":adventure["id"]
  }
  const url = config.backendEndpoint+"/reservations/new";
    try { let res= await fetch(url, {method:'POST',
            headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)});
        if(res.ok){
          alert("Success!");
          window.location.reload();
        }
        else{
          let data = await res.json();
          alert(`Failed-${data.message}`);
        }

      }
      catch(error){
        console.log(error);
        alert("Failed-fetch call resulted in error");

      }
            
  });
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";
  }
  else{
    document.getElementById("reserved-banner").style.display="none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
