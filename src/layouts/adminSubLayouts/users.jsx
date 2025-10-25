import React from 'react'
import {Nav} from "react-bootstrap"
import {NavLink} from "react-router-dom"



const users = ({ children }) => {


    return (
        <div className="subLayout">
              <Nav fill variant="tabs" >
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/admin/users/all-users"> كل المستخدمين </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/admin/users/all-normal-users">حسابات المستخدمين العاديين </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/admin/users/all-employees">حسابات الموظفين </Nav.Link>
                    </Nav.Item>
                </Nav>
            {children}

        </div>
    )
}

export default users;