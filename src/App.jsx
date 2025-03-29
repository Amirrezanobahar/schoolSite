import { useRef, useState, useEffect } from 'react'
import Header from './Components/Header/Header'
import Navbar from './Components/Header/Navbar'
import './fonts/font.css'
import './app.css'
import './Pages/Home/Home.css'
// import './Pages/teachers/teachers.css'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home/Home'
import { Context } from './Context'
import Form from './Components/Header/Register'
import Login from './Components/Header/Login'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import ProtectedRoute from './Components/ReactprotectRoute'
import UserPanel from './Components/UserPanel'
import Students from './Components/panel/AdminPanel/requestComponents/Students'
import Teachers from './Components/panel/AdminPanel/requestComponents/Teachers'
import Ban from './Components/panel/AdminPanel/requestComponents/Ban'
import SendEmailStudents from './Components/panel/AdminPanel/requestComponents/SendEmailStudents'
import SendEmailTeachers from './Components/panel/AdminPanel/requestComponents/SendEmailTeachers'
import AddTeacher from './Components/panel/AdminPanel/requestComponents/AddTeacher'
// import UploadFile from './Components/panel/TeacherPanel/requestTComponent/UploadFile'
import Comments from './Components/panel/TeacherPanel/requestTComponent/Comments'
import TeacherDetails from './Components/TeacherDetails'
import AddSpecifications from './Components/panel/TeacherPanel/requestTComponent/AddSpecifications'
import BestStudents from './Components/panel/AdminPanel/requestComponents/BestStudents'
import AddEvent from './Components/panel/AdminPanel/requestComponents/AddEvent'
import CardSlider from './Components/Home/CardSlider'
import UploadFile from './Components/panel/TeacherPanel/requestTComponent/UploadFile'
import SendMessageFStudents from './Components/panel/AdminPanel/requestComponents/SendMessageFStudents'
import SendMessagefteacher from './Components/panel/AdminPanel/requestComponents/SendMessagefteacher'
import AdminMessageFTeacher from './Components/panel/TeacherPanel/requestTComponent/AdminMessageFTeacher'




function App() {
  const bottumref = useRef(null);
  const akbarref = useRef(null);
  const cardsliderref = useRef(null);




  return (

    <Context.Provider value={{ bottumref, akbarref, cardsliderref }}>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>

          <Route path="/register" element={<Form />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/userPanel" element={<UserPanel />} />
            <Route path="/userPanel/students" element={<Students />} />
            <Route path="/userPanel/events" element={<AddEvent />} />
            <Route path="/userPanel/teachers" element={<Teachers />} />
            <Route path="/userPanel/bestStudents" element={<BestStudents />} />
            <Route path="/userPanel/ban" element={<Ban />} />
            <Route path="/userPanel/students/email" element={<SendEmailStudents />} />
            <Route path="/userPanel/students/message" element={<SendMessageFStudents/>} />
            <Route path="/userPanel/teachers/message" element={<SendMessagefteacher/>} />
            <Route path="/teacherPanel/adminMessageFT" element={<AdminMessageFTeacher/>} />
            <Route path="/userPanel/teachers/email" element={<SendEmailTeachers />} />
            <Route path="/userPanel/addTeacher" element={<AddTeacher />} />
            <Route path="/teacherPanel/upload" element={<UploadFile/>} />
            <Route path="/teacherPanel/comments" element={<Comments />} />
            <Route path="/teachers/:teacherId" element={<TeacherDetails />} />
            <Route path="/teacherPanel/Specifications" element={<AddSpecifications />} />
          </Route>

        </Routes>
        <Footer />
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
