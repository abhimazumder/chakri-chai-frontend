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
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Box className="content">
          <Routes>
            <Route path="/" element={<HomeIndex />} />
            <Route path="/joblist" element={<JobListIndex />} />
            <Route path="/jobinfo" element={<JobInfoIndex />} />
            <Route path="/jobform" element={<JobFormIndex />} />

            <Route
              element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/console" element={<AdminConsoleIndex />} />
              <Route path="/jobpostings" element={<JobPostingsIndex />} />
              <Route path="/createjob" element={<CreateJobIndex />} />
            </Route>
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
