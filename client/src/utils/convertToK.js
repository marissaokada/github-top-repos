// Converts values >999 to K format (e.g, 1000 -> 1.0K)
const convertToK = (value) => {
  return Math.abs(value) > 999 ? Math.sign(value)*((Math.abs(value)/1000).toFixed(1)) + 'k' : Math.sign(value)*Math.abs(value);
};

export default convertToK;