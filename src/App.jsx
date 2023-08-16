import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import JobFormIndex from "./pages/JobForm/JobFormIndex";
import JobInfoIndex from "./pages/JobInfo/JobInfoIndex";
import JobListIndex from "./pages/JobList/JobListIndex";
import CreateJobIndex from "./pages/CreateJob/CreateJobIndex";
import AdminConsoleIndex from "./pages/AdminConsole/AdminConsoleIndex";
import JobPostingsIndex from "./pages/JobPostings/JobPostingsIndex";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Box className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AdminConsoleIndex />} />
            <Route path="/jobpostings" element={<JobPostingsIndex />} />
            <Route path="/createjob" element={<CreateJobIndex />} />
            <Route path="/joblist" element={<JobListIndex />} />
            <Route path="/jobinfo" element={<JobInfoIndex />} />
            <Route path="/jobform" element={<JobFormIndex />} />
          </Routes>
        </BrowserRouter>
      </Box>
      <Footer />
    </div>
  );
}

export default App;
