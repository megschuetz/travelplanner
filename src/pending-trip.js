class PendingTrip {
  constructor(userID, destinationID, travelers, date, duration,) {
    this.userID = userID;
    this.destinationID = destinationID;
    this.travelers = travelers;
    this.date = date;
    this.duration = duration;
    this.status = 'pending';
    this.suggestedActivities = []
  }
}

export default PendingTrip