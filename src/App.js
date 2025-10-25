import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './reduxFolder/store.js';
import { HelmetProvider } from 'react-helmet-async';


import Routers from './routers/routers'
import './styles/globalStyling.scss';
// import animationData from './assets/animation';

// import Lottie from 'react-lottie';
import { Col, Container, Row } from 'react-bootstrap';
import trust from "../src/assets/icons/turst.png"
import service from "../src/assets/icons/service.png"
import security from "../src/assets/icons/security.png"
import home from "../src/assets/icons/home.png"
import Logo from "../src/assets/logo.png"


const App = () => {


  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice"
  //   }
  // }

  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinner(false), 3300)
  }, []);

  return (spinner !== true

    ? <Provider store={Store}>
      <HelmetProvider>
        <BrowserRouter>
          <div className="App">
            <Routers />
          </div>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
    : <div style={{ position: "relative", top: "5vh", width: "100%", margin: "auto" }}>
      <Container>
        <Row>
          <Col xs={{ span: 10, offset: 1 }} md={{ span: 4, offset: 4 }}>
            <img className=" image img-fluid"
              style={{ width: "100%", height: "auto" }}
              alt=""
              src={home}
            >
            </img>
          </Col>
        </Row>
      </Container>
      
      <Container>
        <Row>
          <Col xs={{ span: 10, offset: 1 }} md={{ span: 4, offset: 4 }} >
            <img className=" image img-fluid"
              style={{ width: "100%", height: "auto" }}
              alt=""
              src={Logo}
            >
            </img>
          </Col>
        </Row>
      </Container>
      {/* <Lottie options={defaultOptions} height={300} width={300} /> */}
      <br /><br />
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Row>
              <Col xs={4}>
                <img className=" image img-fluid"
                  style={{ width: "100%", height: "auto" }}
                  alt="أمان"
                  src={security}
                >
                </img>
              </Col>
              <Col xs={4}>
                <img className=" image img-fluid"
                  style={{ width: "100%", height: "auto" }}
                  alt="انت بتأمر"
                  src={service}
                >
                </img>
              </Col>
              <Col xs={4}>
                <img className=" image img-fluid"
                  style={{ width: "100%", height: "auto" }}
                  alt="ثقة"
                  src={trust}
                >
                </img>
              </Col>


            </Row>
          </Col>


        </Row>
      </Container>
    </div>
  );
}

export default App;
