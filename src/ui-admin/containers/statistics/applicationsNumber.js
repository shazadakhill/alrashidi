import React, { Component } from 'react';
import axios from 'axios'
import ApiURL from "../../../jsonFiles/api/api.json"
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner';
import ApplicationsNumber from '../../components/statistics/applicationsNumber'
import { connect } from 'react-redux'

class applicationsNumberContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        this.mounted = true;
        const token = 'Bearer '.concat(this.props.loginProps.token);

        axios.get(`${ApiURL.domain}${ApiURL.applications}`, { "headers": { Authorization: token } }).then(
            response => {
                if (this.mounted) {
                    this.setState({  
                        Applications: response.data,
                        ApplicationsStatus: true
                    })
                }
            });
    }

    componentWillUnmount() {
        this.mounted = false;
    }
    state = {
        Applications: [],
        ApplicationsStatus: false,
    }

    render() {

        let applicationsNumber = null;
        if (this.state.ApplicationsStatus) {
            let all = 0;
            let status1_Number = 0;
            let status2_Number = 0;
            let status3_Number = 0;
            let status4_Number = 0;
            let status5_Number = 0;
            let status6_Number = 0;



            this.state.Applications.map((application, index) => {
                all++;
                if (application.status === 1) { status1_Number++; }
                if (application.status === 2) { status2_Number++; }
                if (application.status === 3) { status3_Number++; }
                if (application.status === 4) { status4_Number++; }
                if (application.status === 5) { status5_Number++; }
                if (application.status === 6) { status6_Number++; }

                return (<React.Fragment key={index}></React.Fragment>)
            })
            
           
            applicationsNumber = (
                <ApplicationsNumber
                    total={all}
                    await_for_payment={status1_Number }
                    await_for_assign={status2_Number }
                    await_for_accept={status3_Number }
                    accepted_inprogress={status4_Number }
                    rejected={status5_Number }
                    finished={status6_Number } 
                    />
            )
        } else {
            applicationsNumber = (<LoadingSpinner />)
        }



        return (
            <div>
                {applicationsNumber}
            </div>
        )
    }
};
const mapStateToProps = state => {
    return {
        loginProps: state.auth
    }
}


export default connect(mapStateToProps)(applicationsNumberContainer);