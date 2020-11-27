const years = (back) => {
  const year = new Date().getFullYear();
  return Array.from({length: back}, (v, i) => year - back + i + 1);
}

export default years;
