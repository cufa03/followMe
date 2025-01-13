import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  userPassword: string,
  hashPassword: string
) => {
  const result = await bcrypt.compare(userPassword, hashPassword);
  return result;
};
