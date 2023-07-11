import Footer from './components/Footer'
import Header from './components/Header'
import JobInfoIndex from './pages/JobInfo/JobInfoIndex';
import JobFormIndex from './pages/JobForm/JobFormIndex'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Header/>
      <div style={{ marginTop: 100 }} />
      <BrowserRouter>
				<Routes>
        <Route path="/" element={<JobInfoIndex/>} />
        <Route path="jobform" element={<JobFormIndex/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App;
