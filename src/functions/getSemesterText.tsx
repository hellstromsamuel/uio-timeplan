export const getSemesterText = (currentSemesterCode: string) => {
  const semesterSeason = currentSemesterCode.slice(-1);
  const semesterYear = parseInt(currentSemesterCode.slice(0, 2));

  return semesterSeason === "h"
    ? "Høst 20" + semesterYear
    : "Vår 20" + semesterYear;
};
