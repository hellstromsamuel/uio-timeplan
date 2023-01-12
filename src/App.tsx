import "./styles/App.css";
import { MainContent } from "./MainContent";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

export const App = () => {
  return (
    <div className="App">
      <div className="AppBarContent">
        <Toolbar>
          <Typography variant="h5" sx={{ color: "black" }}>
            <Link
              underline="none"
              sx={{ color: "black" }}
              href="https://uio-emner.netlify.app"
            >
              🧑‍🎓 UiO timeplan generator
            </Link>
          </Typography>
        </Toolbar>
      </div>

      <MainContent />
    </div>
  );
};
