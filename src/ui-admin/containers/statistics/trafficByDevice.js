import React, { Component } from 'react';
import axios from 'axios'
import ApiURL from "../../../jsonFiles/api/api.json"
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner';
import TrafficByDevice from '../../components/statistics/trafficByDevice'
import { connect } from 'react-redux'

class trafficByDeviceContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        this.mounted = true;

        const token = 'Bearer '.concat(this.props.loginProps.token);
        axios.get(`${ApiURL.domain}${ApiURL.reportsDevices}`, {
            'Content-Type': 'application/json',
            "headers": { Authorization: token }
        }).then(
            response => {
                if (this.mounted) {
                    this.setState({
                        DevicesReports: response.data,
                        DevicesStatus: true
                    })
                }
            })

    }

    componentWillUnmount() {
        this.mounted = false;
    }
    state = {
        DevicesReports: [],
        DevicesStatus: false,
    }

    render() {

        let trafficByDevice = null;
        if (this.state.DevicesStatus) {
            let all = 24;
            let iosNumber = 6;
            let androidNumber = 10;
            let webNumber = 8;
            this.state.DevicesReports.map((device, index) => {
                all++;
                if (device.type === "ios") { iosNumber++; }
                if (device.type === "android") { androidNumber++; }
                if (device.type === "web") { webNumber++; }
                return (<React.Fragment key={index}></React.Fragment>)
            })
            trafficByDevice = (
                <TrafficByDevice
                    total={all}
                    ios={iosNumber === 0 ? 0 : (Math.round((iosNumber / all * 100) * 100) / 100).toFixed(1)}
                    android={androidNumber === 0 ? 0 : (Math.round((androidNumber / all * 100) * 100) / 100).toFixed(1)}
                    web={webNumber === 0 ? 0 : (Math.round((webNumber / all * 100) * 100) / 100).toFixed(1)} />
            )
        } else {
            trafficByDevice = (<LoadingSpinner />)
        }



        return (
            <div >
                {trafficByDevice}
            </div>
        )
    }
};
const mapStateToProps = state => {
    return {
        loginProps: state.auth
    }
}


export default connect(mapStateToProps)(trafficByDeviceContainer);