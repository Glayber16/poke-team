import express from 'express';
import teamRoutes from './routes/TeamsRoutes';

const app = express(); 
app.use(express.json());

app.use("/teams", teamRoutes); //Rota base dos times

export default app;