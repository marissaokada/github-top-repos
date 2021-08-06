// Converts values >999 to K format (e.g, 1000 -> 1.0K)
export const convertToK = (value) => {
  return Math.abs(value) > 999 ? Math.sign(value)*((Math.abs(value)/1000).toFixed(1)) + 'k' : Math.sign(value)*Math.abs(value);
};

// Creates an array of elements from start to end
export const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};
