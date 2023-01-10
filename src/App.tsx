import "./styles/App.css";
import { MainContent } from "./MainContent";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const App = () => {
  return (
    <div className="App">
      <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
        <div className="AppBarContent">
          <Toolbar>
            <Typography variant="h6" sx={{ color: "black" }}>
              🧑‍🎓 UiO semester planlegger
            </Typography>
          </Toolbar>
        </div>
      </AppBar>

      <MainContent />
    </div>
  );
};
