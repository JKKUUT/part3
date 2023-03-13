import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const submitti = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    setPersons([...persons, { name: newName }]);
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitti}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(e) => setNewName(e.currentTarget.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, i) => (
          <p key={i}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
