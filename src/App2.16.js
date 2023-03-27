import axios from "axios";
import { useEffect, useState } from "react";
import { createPerson, deletePerson, getPersons } from "./Api";

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
  const poisto = (id) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(id).then(window.location.reload());
    }
  };
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={() => poisto(person.id)}>delete</button>
    </p>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState(null);

  const submitti = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    if (persons.some((person) => person.number === newNumber)) {
      return alert(`${newNumber} is already added to phonebook`);
    }

    createPerson({ name: newName, number: newNumber }).then((res) => {
      if (res.status === 200) {
        setNotification(`Added ${newName}`);
        setPersons(persons.concat(res.data));
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    });
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getPersons();
      setPersons(response.data);
    };
    getData();
  }, []);

  return (
    <div>
      <Notification message={notification} />
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
