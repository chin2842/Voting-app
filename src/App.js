import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./logo.png"
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Col, Container, Row } from 'reactstrap';



export default function App() {
  return (

    <BrowserRouter>

      <img src={Logo} width="200px" height="200px" />


      <AppRoutes />
    </BrowserRouter>




  )
}
