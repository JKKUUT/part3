import axios from "axios";

export const getPersons = async () => {
  const response = await axios.get("http://localhost:3001/persons");
  return response;
};

export const createPerson = (newPerson) => {
  return axios.post("http://localhost:3001/persons", newPerson);
};
