import React, { Component } from 'react';
import Card from '../../components/card/card2';
import { Col, Row } from 'react-bootstrap';
import ApiURL from '../../../jsonFiles/api/api.json'
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"
import axios from 'axios'
import { connect } from 'react-redux'
import Heading from "../../components/heading/heading"
import { withTranslation } from 'react-i18next';




class UserMyApplications extends Component {
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
        Applications: null,
        ApplicationsStatus: false
    }
    render() {
        let application = null;
    const { t } = this.props;

        if (this.state.ApplicationsStatus) {
            application = (
                <span>
                    <Row className={`div smallerCardsContainer ${t("style.rtl") === "rtl" ? "rtl" : ""} text-center`}>
                        {this.state.Applications.map((applicationsItem, index) => {
                           return (
                                            <Col xs={12} sm={6} md={4} key={index}>
                                                <Card
                                                    key={index}
                                                    application={applicationsItem}
                                                >
                                                </Card>
                                            </Col>

                                        )
                                    })}
                    </Row>
                </span>
            )
        } else {
            application = (<LoadingSpinner />)
        }
        return (
            <div className="userMyApplication">
                <Heading type="h1" > {t("userMyApplications.heading1")}</Heading>
                {application}
            </div>
        )
    }
};
const mapStateToProps = state => {

    return {
        loginProps: state.auth
    }

}


export default  withTranslation()(connect(mapStateToProps)(UserMyApplications));