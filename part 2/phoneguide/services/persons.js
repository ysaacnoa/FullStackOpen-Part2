
import axios from 'axios'

const url = 'http://localhost:3000/persons'

const getPersons = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const addContact = (objectPerson) => {
  const request = axios.post(url, objectPerson)
  return request.then(response => response.data)
}

const removePerson = id => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

const updatedPhone = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject)
  return request.then(res => res.data)
}

export default{
  getPersons,
  addContact,
  removePerson,
  updatedPhone
}