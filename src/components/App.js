import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };

  }

  onChangeType = (event) => {
    this.setState({
      filters: {type: event.target.value },
    });
  };

  onFindPetsClick = () => {
    if (this.state.filters.type === "cat") {
      fetch("/api/pets?type=cat")
        .then((response) => response.json())
        .then((data) =>  
        this.setState({
          pets: data
        }));
    } else if (this.state.filters.type === "dog") {
      fetch("/api/pets?type=dog")
        .then((response) => response.json())
        .then((data) =>  
        this.setState({
          pets: data
        }));
    } else if (this.state.filters.type === "micropig") {
      fetch("/api/pets?type=micropig")
        .then((response) => response.json())
        .then((data) =>  
        this.setState({
          pets: data
        }));
    } else {
      fetch("/api/pets")
        .then((response) => response.json())
        .then((data) =>  
        this.setState({
          pets: data
        }));
    }
  };

  onAdoptPet = (id) => {
       const AdobtedPets = this.state.pets.map(pet => {
         if(pet.id === id){
           return {...pet, isAdopted: true}
         }
         else {
           return pet
         }
       })
       this.setState({
        pets: AdobtedPets
      })

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onFindPetsClick={this.onFindPetsClick}
                onChangeType={this.onChangeType}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
