import React, { Component } from 'react';
import axios from 'axios'
import ApiURL from "../../../jsonFiles/api/api.json"
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner';
import { connect } from 'react-redux'
import UsersByZones from '../../components/statistics/usersByZones ';

class usersByZonesContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        this.mounted = true;


        const token = 'Bearer '.concat(this.props.loginProps.token);
        axios.get(`${ApiURL.domain}${ApiURL.reportsEmployees}`, {
            'Content-Type': 'application/json',
            "headers": { Authorization: token }
        }).then(
            response => {
                if (this.mounted) {
                    this.setState({
                        EmployeesReports: response.data,
                        EmployeesStatus: true
                    })
                }
            })

        axios.get(`${ApiURL.domain}${ApiURL.governorate}`).then(
            response => {
                let governorates = response.data
                this.setState({ Governorates: governorates })
                let governoratesNames = [], zonesNames = [], zonesIds = [], governoratesIds = [];
                governorates.map((governorate, index) => {
                    return (
                        <React.Fragment key={index}>
                            {governoratesNames.push(governorate.name)}
                            {governoratesIds.push(governorate.id)}
                            {governorate.zones.map((zone, indexx) => {
                                return (<React.Fragment key={indexx}>
                                    {zonesNames.push(zone.name)}
                                    {zonesIds.push(zone.id)}
                                </React.Fragment>)
                            })}
                        </React.Fragment>)
                })
                governoratesNames.push("غير محدد")
                zonesNames.push("غير محدد")

                governoratesNames = Array.from(new Set(governoratesNames))
                zonesNames = Array.from(new Set(zonesNames))
                zonesIds = Array.from(new Set(zonesIds))
                governoratesIds = Array.from(new Set(governoratesIds))
                this.setState({
                    GovernoratesNames: governoratesNames,
                    ZonesNames: zonesNames,
                    ZonesIds: zonesIds,
                    GovernoratesIds: governoratesIds,
                    ZonesStatus: true
                })

            }
        )
        axios.get(`${ApiURL.domain}${ApiURL.accounts}`, { "headers": { Authorization: token } }).then(
            response => {
                if (this.mounted) {
                    this.setState({
                        Users: response.data,
                        UsersStatus: true
                    })
                }
            });


    }

    componentWillUnmount() {
        this.mounted = false;
    }
    state = {
        Governorates: [],

        GovernoratesNames: [],
        GovernoratesIds: [],
        ZonesNames: [],
        ZonesIds: [],
        Users: [],

        ZonesStatus: false,
        UsersStatus: false,

        PlaceType: "zone"

    }
    constructor(props) {
        super(props)
        this.placeTypeHandler = this.placeTypeHandler.bind(this)
    }


    placeTypeHandler = (placeType) => {
        this.setState({
            PlaceType: placeType
        })
    }

    render() {


        let usersByZones = null;

        if (this.state.ZonesStatus && this.state.UsersStatus) {

            let governoratesNames = this.state.GovernoratesNames;
            let governoratesIds = this.state.GovernoratesIds;
            let zonesNames = this.state.ZonesNames;
            let zonesIds = this.state.ZonesIds;
            let usersInZones = new Array(this.state.ZonesNames.length).fill(0)
            let usersInGovernorates = new Array(this.state.GovernoratesNames.length).fill(0)

            if (this.state.PlaceType === "zone") {
                this.state.Users.map((user, index) => {
                    if (user.zone !== null) {
                        for (let index = 0; index < zonesNames.length; index++) {
                            if (user.zone === zonesIds[index]) {
                                usersInZones[index]++
                            }
                        }
                    }
                    else { usersInZones[usersInZones.length - 1]++ }
                    return (<React.Fragment key={index}></React.Fragment>)
                })
            }
            else if (this.state.PlaceType === "governorate") {
                this.state.Users.map((user, index) => {
                    if (user.zone !== null) {
                        this.state.Governorates.map((gov, ind) => {
                            gov.zones.map((zon, ind) => {
                                if (user.zone === zon.id) {
                                    usersInGovernorates[governoratesIds.indexOf(gov.id)]++
                                }
                                return (<React.Fragment key={ind}></React.Fragment>)
                            })
                            return (<React.Fragment key={ind}></React.Fragment>)

                        })
                    } else { usersInGovernorates[usersInGovernorates.length - 1]++ }
                    return (<React.Fragment key={index}></React.Fragment>)
                })
            }
            usersByZones = (
                <UsersByZones
                    usersInZones={usersInZones}
                    usersInGovernorates={usersInGovernorates}
                    zonesNames={zonesNames}
                    governoratesNames={governoratesNames}
                    placeType={this.state.PlaceType}
                    handler={this.placeTypeHandler}
                />
            )
        } else {
            usersByZones = (<LoadingSpinner />)
        }
        return (
            <div >
                {usersByZones}
            </div>
        )
    }
};
const mapStateToProps = state => {
    return {
        loginProps: state.auth
    }
}


export default connect(mapStateToProps)(usersByZonesContainer);