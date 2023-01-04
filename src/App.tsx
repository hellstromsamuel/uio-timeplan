import { useEffect, useRef, useState } from "react";
import "./styles/App.css";
import { CircularProgress } from "@mui/material";
import { CoursePage } from "./components/CoursePage";
import { calculateSemestersFromToday } from "./functions/calculateSemestersFromToday";
import { calculateCurrentSemesterCode } from "./functions/calculateCurrentSemesterCode";
import { apiGetCoursesInSemester } from "./uio-api/apiGetCoursesInSemester";

const baseUrl = "https://data.uio.no/studies/v1/course/";
const currentSemesterCode = calculateCurrentSemesterCode();
const allSemesters = calculateSemestersFromToday(currentSemesterCode);

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const allCoursesUseRef = useRef<{ [courseCode: string]: string[] }>({});

  useEffect(() => {
    apiGetCoursesInSemester(
      allCoursesUseRef.current,
      allSemesters[allSemesters.length - 1].value,
      allSemesters[0].value,
      setLoading
    );
  }, [allCoursesUseRef]);

  return (
    <div className="App">
      <h1>Søk etter emner på UIO</h1>
      {loading ? (
        <div className="loadingContainer">
          <CircularProgress size={100} />
        </div>
      ) : (
        <CoursePage
          allAvailableCourses={allCoursesUseRef.current}
          baseUrl={baseUrl}
          currentSemesterCode={currentSemesterCode}
          allSemesters={allSemesters}
        />
      )}
    </div>
  );
};

export default App;
