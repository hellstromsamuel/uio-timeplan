export const semesterCodeToText = (semesterCode: string | undefined) => {
  if (semesterCode) {
    const semesterSeason = semesterCode.slice(-1);
    const semesterYear = parseInt(semesterCode.slice(0, 2));

    return semesterSeason === "h"
      ? "Høst 20" + semesterYear
      : "Vår 20" + semesterYear;
  }
};
