import React from 'react';
import { ToastContainer } from 'react-toastify';
import Routing from './Routes/Routes';
import './scss/App.scss'

function App() {
  return (
    <>
      <Routing/>
      <ToastContainer/>
    </>
  )
}

export default App