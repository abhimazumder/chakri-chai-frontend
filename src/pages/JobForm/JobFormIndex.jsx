import { Container } from "@mui/material";
import JobFields from "./JobFields";
import JobBrief from "../../components/JobBrief";
import { useEffect } from "react";

const JobFormIndex = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

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
