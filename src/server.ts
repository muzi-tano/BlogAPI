import express from 'express';
import cors from 'cors';
import bordyParser from 'body-parser';

const server = express();

server.use(cors());
server.use(bordyParser.json());
server.use(bordyParser.urlencoded({ extended: true }));
server.use(express.static('public'));

server.get('/api/teste', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

server.listen (3000, () => {
  console.log('BlogAPI BackEnd rodando.....');
});