/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import PersonForm from "../components/PersonForm";
import Filter from "../components/Filter";
import Persons from "../components/Persons";
import personServices from "../services/persons";
import Message from "../components/Message";


export default function App() {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });

  const hookPersons = () =>{
    console.log('effect');
    personServices
      .getPersons()
      .then(initialPersons => setPersons(initialPersons))
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
    };
    
    console.log(objectPerson);
    if (newName === "" || newPhone === "") return;

    const existingPerson = persons.find(person => person.name === newName)

    if(existingPerson){
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      const newPerson = {...existingPerson, number: newPhone} 

      if(confirmed){
        personServices
          .updatedPhone(existingPerson.id , newPerson)
          .then(returnedPerson => {
            const updatedPersons = persons.map(person => person.id !== existingPerson.id ? person : returnedPerson)
            setPersons(updatedPersons);
            setNewName("");
            setNewPhone("");
            setMessage({
              text: `${returnedPerson.name} number has been update`,
              type: 'success'
            })
            setTimeout(()=>{
              setMessage({text:null, type:null})
            },5000)
          })
          .catch(
            setMessage({
              text: `Information of ${existingPerson.name} has already been removed from server`,
              type: 'error'
            }),
            setTimeout(()=>{
              setMessage({text:null, type:null})
            },5000),
            setNewName(""),
            setNewPhone("")
          )
      }
    }else{
      //update object persons
      personServices
        .addContact(objectPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          //clean inputs
          setNewName("");
          setNewPhone("");
          setMessage({
            text: `${newPerson.name} has been added in your contacts`,
            type: 'success'
          })
            setTimeout(()=>{
              setMessage({text:null, type:null})
            },5000)
        })
    }

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
      <Message message={message.text} type={message.type}/>
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
        setPersons={setPersons}
      />
    </section>
  );
}
