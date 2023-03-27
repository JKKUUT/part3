import axios from "axios";

export const getPersons = async () => {
  const response = await axios.get("http://localhost:3001/api/persons");
  return response;
};

export const createPerson = (newPerson) => {
  return axios.post("http://localhost:3001/api/persons", newPerson);
};

export const deletePerson = async (id) => {
  const response = await axios.delete(
    `http://localhost:3001/api/persons/${id}`
  );
  return response;
};
