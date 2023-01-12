import { useState } from "react";
import "./styles/App.css";
import { CircularProgress } from "@mui/material";
import { CoursePage } from "./components/CoursePage";
import { calculateCurrentSemesterCode } from "./functions/calculateCurrentSemesterCode";

const baseUrl = "https://data.uio.no/studies/v1/course/";
const currentSemesterCode = calculateCurrentSemesterCode();

export const MainContent = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="MainContent">
      {loading ? (
        <div className="loadingContainer">
          <CircularProgress size={100} />
        </div>
      ) : (
        <CoursePage
          setLoading={setLoading}
          baseUrl={baseUrl}
          currentSemesterCode={currentSemesterCode}
        />
      )}
    </div>
  );
};
