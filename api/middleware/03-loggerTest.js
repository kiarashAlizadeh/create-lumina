export const requestLogger = () => (req, res, next) => {
  // unComment to see in action
  // console.log('< -- middleware logger 03 -- >');
  next();
};
