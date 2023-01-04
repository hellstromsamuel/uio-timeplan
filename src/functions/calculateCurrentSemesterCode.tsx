export const calculateCurrentSemesterCode = () => {
  const today = new Date();
  const year = today.getFullYear();
  const startSemesterSpring = new Date(year - 1 + "-12-15");
  const startSemesterAutumn = new Date(year + "-07-15");
  const semesterSeason =
    today > startSemesterSpring && startSemesterAutumn > today ? "v" : "h";
  return year.toString().slice(-2) + semesterSeason;
};
