require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});

pool.connect((erro, client, release) => {
  if (erro) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', erro.message);
    console.error('💡 Verifique suas credenciais no arquivo .env');
  } else {
    console.log('✅ Conectado ao PostgreSQL!');
    console.log(`📊 Banco: ${process.env.DB_NAME}`);
    console.log(`🏠 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    release();
  }
});

const criarTabela = async () => {
  const sql = `
  create table if not exists clientes (
    idc serial primary key not null,
    nome varchar(100) not null,
    cpf varchar(14) not null,
    email varchar(100) not null,
    telefone varchar(14) not null
  )
  `;
  
  try {
    await pool.query(sql);
    console.log('✅ Tabela clientes verificada/criada');
  } catch (erro) {
    console.error('❌ Erro ao criar tabela:', erro.message);
  }
};

criarTabela();

module.exports = pool;
