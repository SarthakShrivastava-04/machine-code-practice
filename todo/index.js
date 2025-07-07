import express from 'express'
import cors from 'cors'

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json("server is healthy");
});

app.use('/api/auth', authRoutes);
app.use('api/todos', todoRoutes);

app.listen(PORT, () => console.log("server started"))