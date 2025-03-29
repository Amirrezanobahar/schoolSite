import React from 'react'
import './adminStyle.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import axios from 'axios'
import Navbar from './navbar'
// import Students from './requestComponents/Students';
// import Teachers from './requestComponents/Teachers';
// import Ban from './requestComponents/Ban';
// import SendEmailStudents from './requestComponents/SendEmailStudents';
// import SendEmailTeachers from './requestComponents/SendEmailTeachers';
// import LogOut from './requestComponents/LogOut';


export default function Admin() {




  // }

  // const teachersList = async () => {

  //   const response = await axios.get('http://127.0.0.1/v1/user/teachers')

  // }

  // const banUser = async () => {

  //   const response = await axios.post('http://127.0.0.1/v1/user/ban/:email')

  // }

  // const sendEmailForStudents = async () => {

  //   const response = await axios.post('http://127.0.0.1/v1/sms/users')

  // }

  // const sendEmailForTeachers = async () => {

  //   const response = await axios.post('http://127.0.0.1/v1/sms/teachers')

  // }

 

  //   onClick={studentsList}
  //  onClick={teachersList}
  // onClick={banUser}
  // onClick={sendEmailForStudents}
  // onClick={sendEmailForTeachers}
  //  onClick={logOut}

  return (

    <div>
      <Navbar/>
    </div>
  )
}
