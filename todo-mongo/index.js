import express from 'express';
import { configDotenv } from 'dotenv';

configDotenv();
const app = express();
app.use(express.json());



app.listen(process.env.PORT || 4000, () => console.log(`Server running at port ${PORT}`));
