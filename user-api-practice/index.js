import express from 'express';
import cors from 'cors';

const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [
    { id: 1, name: 'John Doe', email: 'john@email'},
    { id: 2, name: 'Jane Smith', email: 'jane@email' },
];

app.get('/', (req,res) => {
    res.json('Welcome to the User API');
});

app.get('/users', (req,res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if(user) res.json(user);
    res.status(404).json({message: "User not found"});
});

app.post('/users', (req, res) => {
    const {name, email} = req.body;
    if(!name || !email) res.status(400).json({message: "name and email are required"});

    const user = {
        id: users.length + 1,
        name,
        email
    };

    users.push(user);
    res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex =  users.findIndex(u => u.id === userId);

    if(userIndex === -1) return res.status(404).json({message: "User not found"});

    const {name, email} = req.body;
    users[userIndex] = {...users[userIndex], name, email};
    res.json(users[userIndex]);
});

app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1)
    return res.status(404).json({ message: 'User not found' });

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json(deletedUser);
});

app.listen(PORT, () => console.log("Server is running on port", PORT));