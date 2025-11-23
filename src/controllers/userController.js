import usersModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getAllUsersController = async (_, response) => {
  try {
    const [users] = await usersModel.getAllUsers();
    const filteredUsers = users.map((user) => ({
      id: user.user_id,
      nome_completo: user.nome_completo,
    }));
    response.status(200).json({
      erro: false,
      message: "Lista de usuários",
      users: filteredUsers,
    });
  } catch (error) {
    response.status(500).json({
      message: "Erro ao buscar usuários",
      erro: error.message,
    });
  }
};

const createUsersController = async (request, response) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(request.body.senha, salt);

  bcrypt.compare(request.body.senha, passwordHash);

  try {
    const newUser = await usersModel.createUsers(
      request.body,
      (request.body.senha = passwordHash)
    );
    delete newUser.nome_completo;
    delete newUser.email;
    delete newUser.senha;
    response.status(201).json({
      erro: false,
      message: "Usuário criado com sucesso",
      newUser,
    });
  } catch (error) {
    response.status(500).json({
      message: "Erro ao criar usuário",
      erro: error.message,
    });
  }
};

const deleteUsersController = async (request, response) => {
  try {
    const { id } = request.params;
    const [deleteUsersBD] = await usersModel.deleteUsers(id);
    response.status(201).json({
      erro: false,
      message: "Usuário deletado com Sucesso!",
      deleteUsersBD,
    });
  } catch (error) {
    response.status(500).json({
      message: "Erro ao deletar usuário",
      erro: error.message,
    });
  }
};

const updateUsersController = async (request, response) => {
  try {
    const { id } = request.params;
    const updateUsersBD = await usersModel.updateUsers(id, request.body);
    response.status(200).json({
      erro: false,
      message: "Usuário atualizado com Sucesso!",
      updateUsersBD,
    });
  } catch (error) {
    response.status(500).json({
      message: "Erro ao atualizar usuário",
      erro: error.message,
    });
  }
};

const loginUsersController = async (request, response) => {
  const { email, senha } = request.body;

  try {
    const [user] = await usersModel.loginUsers({ email });

    if (!user) {
      return response.status(401).json({
        erro: true,
        message: "Credenciais inválidas[email]",
      });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return response.status(401).json({
        erro: true,
        message: "Credenciais inválidas[senha]",
      });
    }

    const tokenUser = jwt.sign(
      { id: user.user_id, nome: user.nome_completo },
      process.env.CHAVE_SECRET,
      {
        expiresIn: "1d",
      }
    );

    response.status(200).json({
      erro: false,
      message: "Login realizado com sucesso",
      user: {
        id: user.user_id,
        tokenUser,
      },
    });
  } catch (error) {
    response.status(500).json({
      message: "Erro ao fazer login do usuário",
      erro: error.message,
    });
  }
};

const authenticateController = async (request, response) => {
  try {
    const user = await usersModel.routeProtectUsers(request.user.id);
    const filteredUsers = user.map((user) => ({
      id: user.user_id,
      nome_completo: user.nome_completo,
    }));

    response.status(200).json({
      erro: false,
      message: "autenticado",
      filteredUsers,
    });
  } catch (error) {
    response.status(500).json({
      message: "não autenticado",
      erro: error.message,
    });
  }
};

export default {
  getAllUsersController,
  createUsersController,
  deleteUsersController,
  updateUsersController,
  loginUsersController,
  authenticateController,
};
