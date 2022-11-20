import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const data = await fetch(config.backendEndpoint+"/cities");
    return data.json();
  } catch (error) {
    return null;
  }
   
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let reqNode = document.querySelector("#data");
  let newNode = document.createElement("div");
  newNode.className="col-12 col-sm-6 col-lg-3 mb-4";
  newNode.innerHTML=`
    <a id=${id} href="pages/adventures/?city=${id}">
    <div class="tile">
            
    <img src= ${image}>
    

    <div class="tile-text text-white justify-content-center align-items-center text-center"> 
    <h5>${city}</h5>
     <p>${description}</p>
  </div> 
</div>
</a>
`
reqNode.appendChild(newNode);

}

export { init, fetchCities, addCityToDOM };
