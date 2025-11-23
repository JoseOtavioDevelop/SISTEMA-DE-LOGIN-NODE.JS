import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const validateUser = async (request, response, next) => {
  const { body } = request;

  if (body.nome_completo === "") {
    return response
      .status(400)
      .json({ message: "nome completo cannot be empty" });
  }

  if (body.email === "") {
    return response.status(400).json({ message: "email cannot be empty" });
  }

  if (body.senha === "") {
    return response.status(400).json({ message: "senha cannot be empty" });
  }

  next();
};

const validateUserToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];

  if (!authHeader) {
    return response.status(401).json({
      erro: true,
      message: "Token não fornecido",
    });
  }

  // Pega só o token sem o "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    // Decodifica
    const decoded = jwt.verify(token, process.env.CHAVE_SECRET);

    // Salva o usuário no request para uso nas próximas rotas
    request.user = decoded;

    return next();
  } catch (error) {
    return response.status(403).json({
      message: "Token inválido",
      erro: error.message,
    });
  }
};

export default {
  validateUser,
  validateUserToken,
};
