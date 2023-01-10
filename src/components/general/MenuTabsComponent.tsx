import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { CalendarMonth, LibraryBooks, Task } from "@mui/icons-material";

export const MenuTabsComponent = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      aria-label="visible arrows tabs example"
      sx={{
        [`& .${tabsClasses.scrollButtons}`]: {
          "&.Mui-disabled": { opacity: 0.3 },
        },
        color: "black",
        marginTop: "10px",
      }}
    >
      <Tab
        icon={
          <CalendarMonth
            sx={{
              backgroundColor: value === 0 ? "primary.main" : "gray",
              color: "white",
              borderRadius: "5px",
              padding: "5px 10px 5px 10px",
              zIndex: 10,
            }}
          />
        }
        iconPosition="start"
        label="Kalender"
      />

      <Tab
        icon={
          <Task
            sx={{
              backgroundColor: value === 1 ? "primary.main" : "gray",
              color: "white",
              borderRadius: "5px",
              padding: "5px 10px 5px 10px",
            }}
          />
        }
        iconPosition="start"
        label="Eksamener"
      />
      <Tab
        icon={
          <LibraryBooks
            sx={{
              backgroundColor: value === 2 ? "primary.main" : "gray",
              color: "white",
              borderRadius: "5px",
              padding: "5px 10px 5px 10px",
            }}
          />
        }
        iconPosition="start"
        label="Pensumliste"
      />
    </Tabs>
  );
};
