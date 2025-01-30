export const requestLogger = () => (req, res, next) => {
  console.log('< -- middleware logger 01 -- >');
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
};
