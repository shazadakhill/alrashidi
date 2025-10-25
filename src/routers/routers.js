import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import AuthVerify from "../common/AuthVerify";

// user and admin layouts
import UserLayout from '../layouts/user'
import AdminLayout from '../layouts/admin'
import ServicesLayout from "../layouts/adminSubLayouts/services"
import UsersLayout from "../layouts/adminSubLayouts/users"



// user pages
import Home from '../ui-user/pages/home/home';
import AboutUs from '../ui-user/pages/aboutUs/aboutUs';
import PrivacyPolicy from '../ui-user/pages/privacyPolicy/privacyPolicy';
import ContactUs from '../ui-user/pages/contactUs/contactUs';
import ServicesCollections from '../ui-user/pages/servicesCollections/servicesCollections';
import ServicesSubCollection from '../ui-user/pages/servicesSubCollection/servicesSubCollection';
import ServicesDetails from '../ui-user/pages/servicesDetails/servicesDetails';
import servicesApplication from '../ui-user/pages/servicesApplication/servicesApplication';
import NotFound from '../ui-user/pages/notFound/notFound';
import SearchPage from '../ui-user/pages/searchPage/searchPage';
import Auth from '../ui-user/pages/signPage/signPage';
import UserActivation from "../ui-user/pages/userActivation/userActivation"
import UserResetPasswordConfirm from "../ui-user/pages/userResetPasswordConfirm/userResetPasswordConfirm"

// user and employee pages
import Profile from '../ui-user/pages/profile/profile';
import UserApplications from '../ui-user/pages/userMyApplications/userMyApplications'
import EmployeeAssignedApplications from '../ui-user/pages/employeeAssignedApplications/employeeAssignedApplications'


// admin pages
import Dashboard from '../ui-admin/pages/dashboard/dashboard'
import Settings from'../ui-admin/pages/settings/settings'
import EmployeesReports from'../ui-admin/pages/employeesReports/employeesReports'
import ApplicationsReports from'../ui-admin/pages/applicationsReports/applicationsReports'

import AllUsers from "../ui-admin/pages/allUsers/allUsers"
import AllNormalUsers from "../ui-admin/pages/allUsers/allNormalUsers"
import AllEmployees from "../ui-admin/pages/allUsers/allEmployees"

import AllServices from "../ui-admin/pages/allServices/allServices"
import AllCategories from "../ui-admin/pages/allServices/allCategories"
import AddService from "../ui-admin/pages/allServices/addService"
import EditService from "../ui-admin/pages/allServices/editService"

import AllApplications from "../ui-admin/pages/allApplications/allApplications"


import { connect } from 'react-redux'
import { getToken } from '../reduxFolder/action/auth'
// import { logout } from '../reduxFolder/action/auth'



const Routing = (props) => {



  useEffect(() => {
    getToken();
  }, [])

  return (
    <Router >
      <Switch>
        <Route path='/admin/:path?' >
          {props.isAuth && props.loginProps.userType === "admin"
            ? <AdminLayout>
              <Switch>
                <Route exact path='/admin/dashboard' component={Dashboard} />
                <Redirect exact from='/admin' to="/admin/dashboard" />
                <Route exact path='/admin/settings' component={Settings} />
                <Route exact path='/admin/applications-reports' component={ApplicationsReports} />
                <Route exact path='/admin/employees-reports' component={EmployeesReports} />
                <Route path='/admin/users/:path?' exact>
                  <UsersLayout>
                    <Switch>
                      <Redirect exact from='/admin/users/' to="/admin/users/all-users" />
                      <Route path='/admin/users/all-users' component={AllUsers}></Route>
                      <Route path='/admin/users/all-normal-users' component={AllNormalUsers}></Route>
                      <Route path='/admin/users/all-employees' component={AllEmployees}></Route>
                    </Switch>
                  </UsersLayout>
                </Route>
                <Route path='/admin/services/:path?' >
                  <ServicesLayout>
                    <Switch>
                      <Redirect exact from='/admin/services/' to="/admin/services/all-services" />
                      <Route path='/admin/services/all-services' component={AllServices}></Route>
                      <Route path='/admin/services/all-categories' component={AllCategories}></Route>
                      <Route path='/admin/services/add-service' component={AddService}></Route>
                      <Route path='/admin/services/edit-service/:id' component={EditService}></Route>
                    </Switch>
                  </ServicesLayout>
                </Route>
                <Route path='/admin/applications' component={AllApplications} ></Route>

                <Route render={() => <NotFound></NotFound>}></Route>

              </Switch>
            </AdminLayout>

            : null}
        </Route>

        <Route>
          <UserLayout>
            <Switch>

              <Route exact path='/home' component={Home}></Route>
              <Redirect exact from='/' to="/home" />
              <Route path='/aboutUs' component={AboutUs}></Route>
              <Route path='/privacyPolicy' component={PrivacyPolicy}></Route>
              <Route path='/contactUs' component={ContactUs}></Route>
              <Route path='/collections' component={ServicesCollections}></Route>
              <Route path='/collection/:id' component={ServicesSubCollection}></Route>
              <Route path='/service/:id' component={ServicesDetails}></Route>
              <Route path='/searchResult' component={SearchPage}></Route>
              <Route path='/signin' component={Auth}></Route>
              <Route path="/auth/users/activation/" component={UserActivation} />
              <Route path="/auth/users/reset_password/" component={UserResetPasswordConfirm} />


              {!props.isAuth
                ? <Redirect exact from='/service-application/:id' to="/signin" />
                : <Route path='/service-application/:id' component={servicesApplication}></Route>
              }
              {props.loginProps.userType === "user"
                ? <>
                  <Route path='/profile' component={Profile}></Route>
                  <Route path='/my-applications' component={UserApplications}></Route>
                </> : null
              }



              {props.loginProps.userType === "employee"
                ? <>
                  <Route path='/profile' component={Profile}></Route>
                  {/* <Route path='/my-applications' component={UserApplications}></Route> */}
                  <Route path='/my-assigned-applications' component={EmployeeAssignedApplications}></Route>
                  <Route path='/my-applications' component={UserApplications}></Route>
                </>
                : null}


              {props.loginProps.userType === "admin"
                ? <Route path='/profile' component={Profile}></Route> : null}

              <Route render={() => <NotFound></NotFound>}></Route>
            </Switch>
          </UserLayout>
        </Route>

      </Switch>
      <AuthVerify/>
    </Router>
  )

};
const mapStateToProps = state => {
  return {
    isAuth: state.auth.token,
    loginProps: state.auth
  }
}
export default connect(mapStateToProps, { getToken })(withRouter(Routing));

