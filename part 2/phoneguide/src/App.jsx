/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import PersonForm from "../components/PersonForm";
import Filter from "../components/Filter";
import Persons from "../components/Persons";

import axios from 'axios'

export default function App() {
  const [persons, setPersons] = useState([]);

  const hookPersons = () =>{
    console.log('effect');
    axios
      .get('http://localhost:3000/persons')
      .then(res =>{
        setPersons(res.data)
      })
  }

  useEffect(hookPersons,[])

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterPerson, setFilterPerson] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const objectPerson = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };

    if (newName === "" || newPhone === "") return;

    if (persons.find((el) => el.name === newName))
      return alert(`${newName} is already added to phonebook`);
    
    console.log(objectPerson);

    //update object
    setPersons(persons.concat(objectPerson));

    //clean inputs
    setNewName("");
    setNewPhone("");
  };


  const handleState = (setState) => (event) => {
    setState(event.target.value)
  }
  
  const handleName = handleState(setNewName)

  const handlePhone = handleState(setNewPhone)

  const handleFilterPerson = handleState(setFilterPerson)

  return (
    <section>
      <h2>Phonebook</h2>
      <Filter
        text="filter shown with"
        filterPerson={filterPerson}
        handleFilterPerson={handleFilterPerson}
      />
      <h2>Add a New</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newPhone={newPhone}
        handleName={handleName}
        handlePhone={handlePhone}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterPerson={filterPerson}
      />
    </section>
  );
}
