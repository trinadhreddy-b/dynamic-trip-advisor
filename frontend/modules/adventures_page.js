
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
    
    const params = new URLSearchParams(search);
    return params.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const data = await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    return data.json();
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let reqNode = document.querySelector("#data");
  reqNode.innerHTML="";
  adventures.forEach((key) => {
      
  let newNode = document.createElement("div");
  newNode.className="col-6 col-lg-3 mb-4";
  newNode.innerHTML=`
  <a id=${key.id} href="detail/?adventure=${key.id}">
  <div class="activity-card">
          
  <img class="img-responsive" src= ${key.image}>
  <h5 class="category-banner">${key.category}</h5>
  <div class="adventure-card-text text-md-center w-100 mt-3">
  <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
    <h5 class="text-left">${key.name}</h5>
    <p>${key.costPerHead}</p>
  </div>
  <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3"">
    <h5 class="text-left">Duration</h5>
    <p>${key.duration} hours</p>
  </div>
</div>
</div>
</a>
`
reqNode.appendChild(newNode);
});




}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
    const filteredList= list.filter((key)=>key.duration>=low &&
    key.duration<=high);
    console.log(filteredList);
    return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList = list.filter((key)=>categoryList.includes(key.category));
  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(filters["duration"].length);
  let filterList = [];
  if(filters["duration"].length>0 && filters["category"].length>0){
    console.log("first case");
    let choice = filters["duration"].split("-");
    filterList=filterByCategory(list,filters["category"]);
    filterList=filterByDuration(filterList,choice[0],choice[1]);
  }
  else if(filters["duration"].length>0){
    console.log("2nd case");
    let choice = filters["duration"].split("-");
    console.log(choice);
   filterList=filterByDuration(list,choice[0],choice[1]);
    
  }
  else if(filters["category"].length>0){
    console.log("3rd case");
    filterList=filterByCategory(list,filters["category"]);
  }
  else {
    filterList = list;
  }

  // Place holder for functionality to work in the Stubs
  return filterList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  // localStorage.setItem("category",JSON.stringify(filters["category"]));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const localStore = localStorage.getItem("filters");


  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStore);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value=filters["duration"];
  const reqNode = document.getElementById("category-list");
  filters["category"].forEach((key)=>{    
    let pill = document.createElement("span");
    pill.className="category-filter";
    pill.textContent=key;
    reqNode.appendChild(pill);
})

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
