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
import HomeIndex from "./pages/Home/HomeIndex";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Box className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeIndex />} />
            <Route path="/console" element={<AdminConsoleIndex />} />
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
