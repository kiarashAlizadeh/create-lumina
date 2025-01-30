export const requestLogger = () => (req, res, next) => {
  console.log('< -- middleware logger 02 -- >');
  next();
};
