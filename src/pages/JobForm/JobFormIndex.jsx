import { Container } from "@mui/material";
import JobFields from "./JobFields";
import JobBrief from "../../components/JobBrief";

const JobFormIndex = () => {
  return (
    <>
      <Container>
        <JobBrief />
        <div style={{ marginTop: 20 }} />
        <JobFields />
      </Container>
    </>
  );
};

export default JobFormIndex;
