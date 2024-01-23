class Travel{
    constructor(destination, days){
         this.days = days
         this.destination = destination
    }
    info(){
        console.log(`travel spot = ${this.destination} travel days: ${this.days}`)
    }
}

class TravelInfo extends Travel{
    
    constructor(destination,days,hotel){
      super(destination, days)
      this.hotel = hotel
    }
    addInfo(){
        super.info()
        console.log(` Hotel name = ${this.hotel}`)
    }

}

const travel1 = new Travel("Dhaka", 3)
// travel1.info()
const travel2 = new TravelInfo("Dhaka",7,"Hotel sheraton")

travel2.addInfo()
