// App listing AIRLINES and DESTINATIONS. 
// Destination further specified by TYPE of flight (round-trip/layover, etc,)
// AIRLINE class DESTINATION class flights per day to destination


class Destinations {
    constructor(city, type) {
        this.city = city;
        this.type = type;
    }

    describe() {
        return `The trip to ${this.city} is a ${this.type} flight.`
    }
}

//Airline names should be linked to destination(s) 

class Airline {
    constructor(name) {
        this.name = name;
        this.destinations = [];
    }

    addDestination(destination) {
        if (destination instanceof Destinations) {
            this.destinations.push(destination);
        } else {
            throw new Error(`You can only add new instance of Destination. Argument is not a destination: ${destination}`);
        }
    }

    describe() {
        return `${this.name} airlines has ${this.destinations.length} flight destinations.`
    }
}

// Menu takes user-inputed data to assign/delete to Airline & Destinations classes.
// user can also view inputed data through menu prompts; information is seen via alert.

class Menu {
    constructor() {
        this.airlines = [];
        this.selectedAirline = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.addAirline();
                    break;
                case '2':
                    this.viewAirline();
                    break;
                case '3':
                    this.listAirlines();
                    break;
                case '4':
                    this.deleteAirline();
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) add airline
            2) view airline
            3) list airlines
            4) delete airline
        `);
    }

    showAirlineMenuOptions(airlineInfo) {
        return prompt(`
            0) back
            1) add destination
            2) remove destination
            ------------------------------
            ${airlineInfo}
        `)
    }

    addAirline() {
        let name = prompt('Enter name for new Airline:');
        this.airlines.push(new Airline(name));
    }

    listAirlines() {
        let airlineString = '';
        for (let i=0; i < this.airlines.length; i++) {
            airlineString += i + ') ' + this.airlines[i].name + '\n';
        }
        alert(airlineString);
    }

    viewAirline() {
        let index = prompt('Enter index of the Airline you wish to view:')
        if (index > -1 && index < this.airlines.length) {
            this.selectedAirline = this.airlines[index];

            let description = 'Airline: ' + this.selectedAirline.name + '\n';

            for (let i = 0; i < this.selectedAirline.destinations.length; i++) {
                description += i + ') ' + this.selectedAirline.destinations[i].city + 
                ' - ' + this.selectedAirline.destinations[i].type + '\n';
            }

            let selection = this.showAirlineMenuOptions(description);

            switch (selection) {
                case '1':
                    this.addDestination();
                    break;
                case '2':
                    this.removeDestination();
                    break;
            }
        }
    }

    deleteAirline() {
        let index = prompt('Enter name of Airline you wish to delete:');
        if (index > -1 && index < this.airlines.length) {
            this.airlines.splice(index, 1);
        }
    }

    addDestination() {
        let city = prompt('Enter destination here:');
        let type = prompt('Enter type of flight here (i.e. round-trip/layover):');
        this.selectedAirline.destinations.push(new Destinations(city, type));
    }

    removeDestination() {
        let index = prompt('Enter index of destination you wish to delete:');
        if (index > -1 && index < this.selectedAirline.destinations.length) {
            this.selectedAirline.destinations.splice(index, 1);
        }        
    }
}

//run our menu app

let menu = new Menu();
menu.start();