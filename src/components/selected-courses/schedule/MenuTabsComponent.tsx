import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";
import { CalendarMonth, LibraryBooks, Task } from "@mui/icons-material";

export const MenuTabsComponent = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const iconStyle = (index: number) => {
    return {
      backgroundColor: value === index ? "primary.main" : "gray",
      color: "white",
      borderRadius: "5px",
      padding: "5px 10px 5px 10px",
      zIndex: 10,
    };
  };

  const TabIcon = (icon: React.ReactElement, label: string) => {
    return <Tab icon={icon} iconPosition="start" label={label} />;
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
      {TabIcon(<CalendarMonth sx={iconStyle(0)} />, "Timeplan")}
      {TabIcon(<Task sx={iconStyle(1)} />, "Eksamener")}
      {TabIcon(<LibraryBooks sx={iconStyle(2)} />, "Pensumliste")}
    </Tabs>
  );
};
