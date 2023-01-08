import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

interface CourseAccordionProps {
  summary: string;
  content: React.ReactNode;
}

export const AccordionComponent = (props: CourseAccordionProps) => {
  return (
    <Accordion className="Accordion">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{ fontWeight: "bold" }}>{props.summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>{props.content}</AccordionDetails>
    </Accordion>
  );
};
