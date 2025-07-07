import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 
import { users } from '../data.js';

const SECRET_KEY = 'PBJWYNCXGNNDOT2OKJLW22TQGQXS6MCJOYYDMSSNOZXT2DIK';

const generateToken = (id) => {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: '1h' });
};

export const register = (req, res) => {
  const { name, email, password } = req.body;

  const userExists = users.find(u => u.email === email);
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword
  };
  users.push(newUser);

  res.json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser.id)
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id)
  });
};
