import React from 'react'
import {Nav} from "react-bootstrap"
import {NavLink} from "react-router-dom"



const services = ({ children }) => {


    return (
        <div className="subLayout">
              <Nav fill variant="tabs" >
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/admin/services/all-services">كل الخدمات</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/admin/services/all-categories"> كل قطاعات الخدمة</Nav.Link>
                    </Nav.Item>
                </Nav>
            {children}

        </div>
    )
}

export default services;