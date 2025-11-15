const validateUser = async (request, response, next) => {
  const { body } = request;

  if (body.nome_completo === '') {
   return response.status(400).json({ message: 'nome completo cannot be empty'})
  }

  if (body.email === '') {
   return response.status(400).json({ message: 'email cannot be empty'})
  }
  
  if (body.senha === '') {
   return response.status(400).json({ message: 'senha cannot be empty'})
  }
  
  next ();
 }

export default {
 validateUser,
}; 