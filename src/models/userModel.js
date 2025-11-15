import database from "../database/database.js";

const getAllUsers = async () => {
  try {
    const ListUsers = await database.execute("SELECT * FROM  usersBD");
    return ListUsers;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

const createUsers = async (user) => {
  try {
    const { nome_completo, email, senha } = user;
    const queryCheckValidate = `SELECT 1 FROM usersBD WHERE email = ? LIMIT 1`;
    const queryUser = `INSERT INTO usersBD (nome_completo, email, senha) VALUES(?, ?, ?)`;

    const checkEmail = async () => {
      const [validateEmail] = await database.execute(queryCheckValidate, [
        email,
      ]);
      return validateEmail.length > 0;
    };
    checkEmail();

    const [createNewUser] = await database.execute(queryUser, [
      nome_completo,
      email,
      senha,
    ]);
    return { id: createNewUser.insertId, nome_completo, email, senha };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

const deleteUsers = async (id) => {
  try {
    const queryDeleteUser = `DELETE FROM usersBD WHERE user_id = ?`;
    const deleteUserBD = await database.execute(queryDeleteUser, [id]);
    return {
      affectedRows: deleteUserBD.affectedRows,
    };
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  }
};

const updateUsers = async (id, user) => {
  try {
    const { nome_completo, email, senha } = user;
    const queryUpdateUser = `UPDATE usersBD SET nome_completo = ?, email = ?, senha = ? WHERE user_id = ?`;

    const [updateUsersid] = await database.execute(queryUpdateUser, [
      nome_completo,
      email,
      senha,
      id,
    ]);
    return {
      affectedRows: updateUsersid.affectedRows,
    };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

const loginUsers = async (user) => {
  const { email } = user;
  const queryLoginUser = `SELECT * FROM usersBD WHERE email = ? LIMIT 1`;

  try {
    const [loginUser] = await database.execute(queryLoginUser, [email]);
    return loginUser;
} catch (error) {
    console.error("Erro ao fazer login do usuário:", error);
    throw error;
} 
};

export default {
  getAllUsers,
  createUsers,
  deleteUsers,
  updateUsers,
  loginUsers,
};
