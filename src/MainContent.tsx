import { useEffect, useState } from "react";
import "./styles/App.css";
import "./styles/CoursePage.css";
import { Button, CircularProgress, Input, TextField } from "@mui/material";
import { calculateCurrentSemesterCode } from "./functions/calculateCurrentSemesterCode";
import { HeaderComponent } from "./components/header/HeaderComponent";
import { apiGetCoursesInSemester } from "./uio-api/requests/apiGetCoursesInSemester";
import { SelectedCourse } from "./uio-api/interfaces/SelectedCourse";
import { SelectedCoursesComponent } from "./components/selected-courses/SelectedCoursesComponent";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const baseUrl = "https://data.uio.no/studies/v1/course/";
const currentSemesterCode = calculateCurrentSemesterCode();

export const MainContent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [allSemesterCourses, setAllSemesterCourses] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  const getUsers = async () => {
    const data = await getDocs(collection(db, "users"));
    data.docs.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    apiGetCoursesInSemester(
      setAllSemesterCourses,
      currentSemesterCode,
      setLoading
    );
  }, [setLoading]);

  return (
    <div className="MainContent">
      {loading ? (
        <div className="loadingContainer">
          <CircularProgress size={100} />
        </div>
      ) : (
        <div className="CoursePage">
          <HeaderComponent
            baseUrl={baseUrl}
            currentSemesterCode={currentSemesterCode}
            allSemesterCourses={allSemesterCourses}
            selectedCourses={selectedCourses}
            setSelectedCourses={setSelectedCourses}
          />

          {selectedCourses.length > 0 && (
            <SelectedCoursesComponent selectedCourses={selectedCourses} />
          )}
        </div>
      )}
    </div>
  );
};
