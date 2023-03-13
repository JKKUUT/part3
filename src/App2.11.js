import axios from "axios";
import { useEffect, useState } from "react";

const PersonForm = ({
  submitti,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <form onSubmit={submitti}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(e) => setNewName(e.currentTarget.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.currentTarget.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const AllPerson = ({ persons }) => {
  return (
    <div>
      {persons.map((person, i) => (
        <OnePerson key={i} person={person} />
      ))}
    </div>
  );
};

const OnePerson = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040 123 4567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    const getPersons = async () => {
      const response = await axios.get("http://localhost:3001/persons");
      setPersons(response.data);
    };
    getPersons();
  }, []);

  const submitti = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    if (persons.some((person) => person.number === newNumber)) {
      return alert(`${newNumber} is already added to phonebook`);
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Add a new person</h2>
      <PersonForm
        submitti={submitti}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <AllPerson persons={persons} />
    </div>
  );
};

export default App;
