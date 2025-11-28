import app from './app';

const PORT = 3000; //Porta onde o servidor roda

app.listen(PORT, () => {
  console.log("Server rodando na porta " + PORT);
}) //Iniciar o servidor + mensagem no console