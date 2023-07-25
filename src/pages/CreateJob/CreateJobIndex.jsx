import { useEffect, useState } from "react";
import CreateJobFields from "./CreateJobFields";
import JobLayout from "../../templates/JobLayout";

const CreateJobIndex = () => {

const [jobLayout, setJobLayout] = useState(null);

  useEffect(() => {
    const fetchJobLayout = () => {
        setJobLayout(JobLayout);
    }

    fetchJobLayout();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {
        jobLayout && <CreateJobFields jobLayout={jobLayout}/>
      }
    </>
  );
};

export default CreateJobIndex;
