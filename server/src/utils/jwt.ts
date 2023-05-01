import jwt from 'jsonwebtoken';

export const generateToken = (id: number) => {
  const token = jwt.sign(id, process.env.JWT_SECRET_KEY);
  return token;
};
