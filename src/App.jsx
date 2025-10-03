
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Authentication/components/Register'
import ResetPassword from './components/Authentication/components/ResetPassword'
import Login from './components/Authentication/components/Login'
import AfterLogin from './components/Profile/AfterLogin'
import Profile from './components/Profile/UserProfile'
import Jobs from './components/JobVacancies/Jods'
import JobDetails from './components/JobVacancies/JobDetail'
import { AuthProvider } from './components/Authentication/components/firebase/firebase';
import UploadJob from './components/JobVacancies/UploadJob'
import Resume from './components/Resume/resume'
import LearnAcademy from './components/Learnings/Learnings'
import Connect from './components/Connect/Connect'
import Community from './components/Community/Community'
import CareerPath from './components/CareerPath/CareerPath'
import SavedRoadmaps from './components/CareerPath/SavedRoadmaps'
import Main from './components/Entrepreneurs/Main'
function App() {
  return (
    <AuthProvider>
      <BrowserRouter >
        <Routes>
          <Route index element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/home' element={<AfterLogin />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/apply" element={<Jobs />} />
          <Route path="/job" element={<JobDetails />} />
          <Route path="/post/job" element={<UploadJob />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/learnings" element={<LearnAcademy />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/community" element={<Community />} />
          <Route path="/careerpath" element={<CareerPath />} />
          <Route path="/career-path/saved" element={<SavedRoadmaps />} />
          <Route path="/entrepreneurs" element={<Main />} />
          {/* <Route path="/learnings" element={<StitchDesign />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
