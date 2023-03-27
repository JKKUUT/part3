const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("tiny"));
app.use(express.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

//3.1

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

//3.2

app.get("/info", (req, res) => {
  const date = new Date();
  const message = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;
  res.send(message);
});

//3.3

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

//3.4

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number missing" });
  }
  if (persons.some((p) => p.name === body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const person = {
    id: Math.floor(Math.random() * 97645),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
