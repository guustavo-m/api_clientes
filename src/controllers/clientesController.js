const ClientesModel = require('../models/clientesModel');

async function listarTodos(req, res) {
  try {
    const clientes = await ClientesModel.listarTodos();
    res.status(200).json(clientes);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar clientes', 
      erro: erro.message 
    });
  }
}

async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const cliente = await ClientesModel.buscarPorId(id);
    
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ 
        mensagem: `Cliente ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar cliente',
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { nome, cpf, email, telefone } = req.body;

    if (!nome || !cpf || !email || !telefone) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novocliente = await ClientesModel.criar({ 
      nome,
      cpf,
      email,
      telefone
    });
    
    res.status(201).json(novocliente);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar cliente',
      erro: erro.message 
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome, cpf, email, telefone } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!nome || !cpf || !email || !telefone) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const clienteAtualizado = await ClientesModel.atualizar(id, { 
        nome,
        cpf,
        email,
        telefone
    });
    
    if (clienteAtualizado) {
      res.status(200).json(clienteAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Cliente ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar cliente',
      erro: erro.message 
    });
  }
}

async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const deletado = await ClientesModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Cliente ${id} removido com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Cliente ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar cliente',
      erro: erro.message 
    });
  }
}

async function buscarPorNome(req, res) {
  try {
    const { nome } = req.params;
    const clientes = await ClientesModel.buscarPorNome(nome);
    res.status(200).json(clientes);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar clientes por nome',
      erro: erro.message 
    });
  }
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorNome
};
