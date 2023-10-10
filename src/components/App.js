import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const onAdoptPet = (petId) => {
    const updatedPets = pets.map((pet) => {
      if (pet.id === petId) {
        return { ...pet, isAdopted: true };
      }
      return pet;
    });
    setPets(updatedPets);
  };

  useEffect(() => {
    onFindPetsClick();
  }, [filters]);

  const onChangeType = (newType) => {
    setFilters({ type: newType });
  };

  const onFindPetsClick = () => {
    let apiUrl = "http://localhost:3001/pets";

    if (filters.type !== "all") {
      apiUrl += `?type=${filters.type}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setPets(data);
      });
  };
  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              filters={filters}
              onChangeType={onChangeType}
              onFindPetsClick={onFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
