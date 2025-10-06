import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

export const serverUrl="http://localhost:8000"
function App() {
  return (
    <Routes>
      <Route path="/signUp" element={<SignUp/>} />
      <Route path="/signIn" element={<SignIn/>} />
    </Routes>
  )
}

export default App
