class Travelers {
  constructor(data){
    this.travelRepo = data 
  }

  findTraveler(id){
    return this.travelRepo.find(traveler => traveler.id === id).name
  }
}

export default Travelers;