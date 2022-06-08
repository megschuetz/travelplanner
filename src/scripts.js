// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './css/styles.css';
import './images/turing-logo.png';
import Travelers from './traveler';
import Trips from './trips';
import Destinations from './destinations'
import {travelersData, destinationsData, tripsData} from './apiCalls';

//Query Selectors
const travelerName = document.querySelector('h2')
const tripsDisplay = document.querySelector('.trips')


const displayedUsersID = Math.floor(Math.random() * 50)

Promise.all([travelersData, destinationsData, tripsData])
  .then((data) => {
    travelerHelper(data[0].travelers);
    displayAllTrips(data[2].trips, data[1].destinations)
    console.log('data', data)
  })
  .catch((error) => console.log(error));


function travelerHelper(data) {
  const travelRepo = new Travelers(data)
  travelerName.innerText = travelRepo.findTraveler(displayedUsersID)
}

function displayAllTrips(tripData, destinationsData) {
  const tripsRepo = new Trips(tripData)
  const allTrips = tripsRepo.getAllTrips(displayedUsersID)
  console.log('trips', allTrips)

  const destinationsRepo = new Destinations(destinationsData, allTrips)
  const destinationsOfTrips = destinationsRepo.findDestinations()
  console.log('dest', destinationsOfTrips)

  let tripsData;

  allTrips.forEach((trip) => {
    const matchingDest = destinationsOfTrips.find()
    tripsData += 
    `<section class="card">
      <img alt="image-here">
      <div>
        <p>Destination</p>
        <p>Date</p>
        <p>Cost Estimate</p>
        <p>Guests</p>
      </div>
    </section>`
  })
}