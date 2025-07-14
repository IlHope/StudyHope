import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import MainPage from './Components/MainPage';
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import CourseDetail from './Components/CourseDetail';
import UserProfile from './Components/UserProfile';
import UserCourseDetail from './Components/UserCourseDetail';
import CourseTesting from './Components/CourseTesting';
import TestResult from './Components/TestResult';
import Footer from './Components/Footer';
import './css/App.css';

function App() {
   return (
       <div className="App">
           <div className="content">
               <Header />
               <Routes>     {/* Управляет маршрутизацией приложения, определяя, какой компонент отображать в зависимости от URL*/}
                   <Route path="/" element={<MainPage />}  />
                   <Route path="/register" element={<RegistrationForm />} />
                   <Route path="/login" element={<LoginForm />} />
                   <Route path="/course/:id" element={<CourseDetail />} />
                   <Route path="/profile" element={<UserProfile />} />
                   <Route path="/profile/course/:id" element={<UserCourseDetail />} />
                   <Route path="/profile/course/:courseId/testing" element={<CourseTesting />} />
                   <Route path="/profile/course/:courseId/testing/test-result" element={<TestResult />} />
               </Routes>
           </div>
       <Footer />
       </div>
   );
}

export default App;