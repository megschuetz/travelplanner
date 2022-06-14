import './css/styles.css';
import './images/turing-logo.png';
import Travelers from './traveler';
import Trips from './trips';
import Destinations from './destinations';
import {travelersData, destinationsData, tripsData, addNewTrip, fetchData, tripsApi} from './apiCalls';
import dayjs from 'dayjs';

//Query Selectors
const submitNewTrip = document.querySelector('.submit-button');
const costThisYear = document.querySelector('#total-cost-this-year');
const doubleClickMsg = document.querySelector('h4');
const destinationsPicker = document.querySelector('.destinations-picker');
const datePicker = document.querySelector('.date-picker');
const durationPicker = document.querySelector('.duration-picker');
const form = document.querySelector('.selections');
const formContainer = document.querySelector('.planning-form');
const footer = document.querySelector('footer');
const guestPicker = document.querySelector('.guests-picker');
const messageBanner = document.querySelector('h3');
const passwordInput = document.querySelector('.password');
const popupLogin = document.querySelector('.login-form');
const signinButton = document.querySelector('.signin-btn');
const travelerName = document.querySelector('h2');
const tripsDisplay = document.querySelector('.trips');
const usernameInput = document.querySelector('.username');

//Event Listeners
destinationsPicker.addEventListener('input', checkInput);
datePicker.addEventListener('input', () => {checkDate(), checkInput()});
durationPicker.addEventListener('input', checkInput);
guestPicker.addEventListener('input', checkInput);

submitNewTrip.addEventListener('click', checkNumberOfClick);

usernameInput.addEventListener('input', checkLogIn);
passwordInput.addEventListener('input', checkLogIn);
signinButton.addEventListener('click', checkCredentials);

//Global Variables

let allDestinations;
let allTrips;
let allTravelers;
let newPendingTrip;
let today;
let validUserIds =[];
let usersID;

//HANDLE LOGIN

function checkLogIn() {
  if(usernameInput.value && passwordInput.value) {
    signinButton.disabled = false
    generateValidIds()
  };
};

function generateValidIds() {
  for (let i = 1; i < 51; i++) {
    validUserIds.push(`traveler${i}`)
  };
};

function checkCredentials() {
  event.preventDefault();
  if(validUserIds.includes(usernameInput.value) && passwordInput.value === 'travel') {
    usersID = Number(usernameInput.value.split('r').pop());
    loadUsersInfo();
  };
};

function loadUsersInfo() {
  popupLogin.classList.add('hidden');
  travelerName.classList.remove('hidden');
  formContainer.classList.remove('hidden');
  tripsDisplay.classList.remove('hidden');
  footer.classList.remove('hidden');
  loadAllData();
  buildFormHelper();
}

function loadAllData() {
  Promise.all([travelersData, destinationsData, tripsData])
    .then((data) => {
      travelerHelper(data[0].travelers);
      destinationsHelper(data[1].destinations);
      tripsHelper(data[2].trips);
    })
    .catch((error) => {console.log(error), displayErrorMessage()});
};

//HELPERS

function travelerHelper(data) {
  allTravelers = new Travelers(data);
  travelerName.innerText = `Welcome, ${allTravelers.findTraveler(usersID)}`;
};

function destinationsHelper(destinationsData) {
  allDestinations = new Destinations(destinationsData);
  displayDestinationOptions(allDestinations.destinationsRepo);
};

function tripsHelper(tripsData) {
  allTrips = new Trips(tripsData);
  const tripsPerTraveler = allTrips.getAllTrips(usersID);
  const totalCostThisYear = allTrips.totalCostPerYear(tripsPerTraveler, allDestinations);
  
  displayAllTrips(tripsPerTraveler);
  displayTotalCostThisYear(totalCostThisYear);
};

function buildFormHelper() {
  preventPickingPastDates();
  buildDropDown();
  displayDestinationOptions(allDestinations.destinationsRepo);
};

//DISPLAY ALL TRIPS

function displayAllTrips(tripsPerTraveler) {
  let tripsData = ''
  tripsPerTraveler.forEach((trip) => {
    const tripDestination = allDestinations.findDestination(trip);
    const tripTotalCost = allTrips.totalCostPerTrip(trip, tripDestination);
    const endDate = allTrips.getEndDate(trip);
    const tripTimeEra = allTrips.checkTripTimeEra(trip);
    
    tripsData += 
    `<section class="card">
      <div class="photo">
        <div class="status-label ${tripTimeEra}">
        <p>${tripTimeEra}</p>
        </div>
        <img class="trip-img" src=${tripDestination.image} alt=${tripDestination.alt} width="300" height="205">
      </div>
      <div class="trip-info">
        <p class="destination">${tripDestination.destination}</p>
        <p>${trip.date} - ${endDate}</p>
        <p>Estimated Cost: $${tripTotalCost}</p>
        <p>Guests: ${trip.travelers}</p>
      </div>
    </section>`
  });
  
  tripsDisplay.innerHTML = tripsData;
};

function displayTotalCostThisYear(totalCost) {
  costThisYear.innerText = `$${totalCost}`;
};

//FORM 

function displayDestinationOptions(destinations) {
  let options = '';
  destinations.forEach(destination => {
    options += 
    `<option value="${destination.id}">${destination.destination}</option>`
  });
  destinationsPicker.innerHTML += options;
};

function preventPickingPastDates() {
  today = dayjs(Date()).format('YYYY-MM-DD');
  datePicker.min = dayjs(today).add(1, 'day').format('YYYY-MM-DD');
};

function buildDropDown() {
  let numbers = '';
  for (let i = 1; i < 51; i++) {
    numbers += `<option value="${i}">${i}</option>`
  };
  durationPicker.innerHTML += numbers;
  guestPicker.innerHTML += numbers;
};

//WORK WITH FORM

function checkInput() {
  if(destinationsPicker.value && datePicker.value > today && durationPicker.value && guestPicker.value) {
    submitNewTrip.disabled = false;
  };
};

function checkDate() {
  if(datePicker.value < today){
    messageBanner.innerText = 'Opps, choose a date in the future!';
  };
};

let clickCounter = 0
function checkNumberOfClick(){
  clickCounter ++
  if(clickCounter === 1){
    estimateCost();
  } else if (clickCounter === 2) {
    postTrip(newPendingTrip);
  };
};

function estimateCost() {
  event.preventDefault();
  newPendingTrip = { 
    id: allTrips.tripsRepo.length + 1,
    userID: usersID,
    destinationID: Number(destinationsPicker.value),
    travelers: guestPicker.value,
    date: dayjs(datePicker.value).format('YYYY/MM/DD'),
    duration: durationPicker.value, 
    status: 'pending',
    suggestedActivities: []
  };
  const destination = allDestinations.findDestination(newPendingTrip);
  const newTripEstimatedCost = allTrips.totalCostPerTrip(newPendingTrip, destination);
  messageBanner.innerText = `Your trips estimated cost is $${newTripEstimatedCost}.`;
  submitNewTrip.innerText = 'Submit To Agent';
  toggleForm(doubleClickMsg, form);
};

function toggleForm(appear, hide) {
  appear.classList.remove('hidden');
  hide.classList.add('hidden');
};

function postTrip(trip) {
  event.preventDefault();
  addNewTrip(trip)
  .then(response => { 
    if(response.status === 422){
      displayErrorMessage()
    }
    return response.json()})
    .then(object => {
      fetchData(tripsApi).then(data => {
      tripsHelper(data.trips)
    })
  });
    toggleForm(form, doubleClickMsg);
    buildFormHelper();
    datePicker.value = '';
    messageBanner.innerText = 'Start Planning Your Trip';
    submitNewTrip.innerText = 'Estimate Cost';
    submitNewTrip.disabled = true;
};

function displayErrorMessage() {
  messageBanner.innerText = 'Oppsie daisy something went wrong!';
};