export const calculateSemestersFromToday = (semesterCode: string) => {
  let currentSemesterCode = semesterCode;
  const semesters: { value: string; text: string }[] = [];

  for (let i = 0; i < 4; i++) {
    const semesterSeason = currentSemesterCode.slice(-1);
    const semesterYear = parseInt(currentSemesterCode.slice(0, 2));

    const semesterText =
      semesterSeason === "h"
        ? "Høst 20" + semesterYear
        : "Vår 20" + semesterYear;

    semesters.push({
      value: currentSemesterCode,
      text: semesterText,
    });
    currentSemesterCode =
      semesterSeason === "h" ? semesterYear + "v" : semesterYear - 1 + "h";
  }
  return semesters;
};
