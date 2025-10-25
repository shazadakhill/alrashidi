import React, { Component } from 'react';
import axios from 'axios'
import ApiURL from "../../../jsonFiles/api/api.json"
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner';
import { connect } from 'react-redux'
import LatestApplications from '../../components/statistics/latestApplications';
import moment from 'moment';

class latestApplicationsContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        this.mounted = true;

        this.lastDaysHandler(31)

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
        DaysArray: [],
        ThisYearDays: [],
        LastYearDays: [],
        ApplicationDateType: "created_at"

    }
    constructor(props) {
        super(props)
        this.lastDaysHandler = this.lastDaysHandler.bind(this)
        this.applicationsDateTypeHandler = this.applicationsDateTypeHandler.bind(this)
    }


    lastDaysHandler = (number) => {
        var daysArray = [], thisYearDaysArray = [], lastYearDaysArray = [];
        for (var i = number - 1; i >= 0; i--) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            daysArray.push(moment(d).format("DD MM"))
            thisYearDaysArray.push(moment(d).format("DD MM YYYY"))
            lastYearDaysArray.push(moment(d).subtract(1, 'year').format("DD MM YYYY"))
        }
        this.setState({
            DaysArray: daysArray,
            ThisYearDays: thisYearDaysArray,
            LastYearDays: lastYearDaysArray,
        })

    }
    applicationsDateTypeHandler = (type) => {
        this.setState({
            ApplicationDateType: type
        })
    }
    render() {

        let latestApplications = null;

        if (this.state.ApplicationsStatus) {
            let thisYearDays = this.state.ThisYearDays;
            let lastYearDays = this.state.LastYearDays;
            let thisYearSales = new Array(this.state.DaysArray.length).fill(0)
            let lastYearSales = new Array(this.state.DaysArray.length).fill(0)
            let date;

            this.state.Applications.map((application, index) => {
                date =
                    this.state.ApplicationDateType === "created_at"
                        ? application.created_at
                        : this.state.ApplicationDateType === "accepted_at"
                            ? application.accepted_at
                            : this.state.ApplicationDateType === "payed_at"
                                ? application.payed_at
                                : this.state.ApplicationDateType === "done_at" ? application.done_at
                                    : null


                for (let index = 0; index < this.state.DaysArray.length; index++) {
                    if (moment(date).format("DD MM YYYY") === thisYearDays[index]) { thisYearSales[index]++ }
                    else if (moment(date).format("DD MM YYYY") === lastYearDays[index]) { lastYearSales[index]++ }
                    else { }
                }
                return (<React.Fragment key={index}></React.Fragment>)
            })
            latestApplications = (
                <LatestApplications
                    thisYearSales={thisYearSales}
                    lastYearSales={lastYearSales}
                    daysArray={this.state.DaysArray}
                    applicationDateType={this.state.ApplicationDateType}
                    handler={this.lastDaysHandler}
                    handler2={this.applicationsDateTypeHandler}
                />
            )
        } else {
            latestApplications = (<LoadingSpinner />)
        }

        return (
            <div >
                {latestApplications}
            </div>
        )
    }
};
const mapStateToProps = state => {
    return {
        loginProps: state.auth
    }
}


export default connect(mapStateToProps)(latestApplicationsContainer);