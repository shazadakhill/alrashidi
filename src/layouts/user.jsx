import React from 'react'
import UserNavbar from '../ui-user/components/userNavbar/userNavbar'
import UserFooter from '../ui-user/components/userFooter/userFooter'
import { Suspense } from 'react';
import Aux from '../hoc/hoc';
// import animationData from '../assets/animation';

// import Lottie from 'react-lottie';

import { Col, Container, Row } from 'react-bootstrap';
import Logo from "../assets/logo.png"



const User = ({ children }) => {

    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: animationData,
    //     rendererSettings: {
    //         preserveAspectRatio: "xMidYMid slice"
    //     }
    // }
    return (
        <Aux >
            <div className="">
                <Suspense fallback={
                    // <div style={{ position: "relative", top: "1vw", width: "100%" }}>
                    //     <Lottie options={defaultOptions} height={400} width={400} />
                    // </div>
                    <div style={{ position: "relative", top: "15vh", width: "100%", margin: "auto" }}>
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
                    </div>
                }>



                    <UserNavbar />
                    <div className="MainLayout">
                        {children}
                    </div>
                    <UserFooter />
                </Suspense>
            </div>
        </Aux >
    )
}

export default User;