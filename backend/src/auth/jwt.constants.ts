export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'supersecretchangeme',
  expiresIn: '7d',
};
