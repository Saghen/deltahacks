module.exports.createLogger = ({ prefix, color }) => (...args) =>
  console.info(color?.(prefix) ?? prefix, "-", ...args);
