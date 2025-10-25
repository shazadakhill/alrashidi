import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import Heading from '../../components/heading/heading';
import ApiURL from '../../../jsonFiles/api/api.json'
import axios from "axios"

class ContactInfo extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        this.mounted = true;


        axios.get(`${ApiURL.domain}${ApiURL.settings}`).then(
            response => {
                if (this.mounted) {
                    const detail = response.data;
                    this.setState({
                        companyEmail: detail.email,
                        companyNumber: detail.number,
                        companyAddress: detail.address,
                        companyEmail2: detail.email2,
                        companyNumber2: detail.number2,
                        companyAddress2: detail.address2,
                    })
                }
            });


    }


    componentWillUnmount() {
        this.mounted = false;
    }

    state = {
        companyEmail: "",
        companyNumber: "",
        companyAddress: "",
        companyEmail2: "",
        companyNumber2: "",
        companyAddress2: "",
    }

    render() {
        const { t } = this.props;
        return (
            <div className="contactInfo ">
                <hr style={{ color: "#000", margin: "10px" }} />

                <Container>
                    <Row>
                        <Col md={4}>
                            <Heading type="h5" >{t("contactUs.phoneNumber")}</Heading>
                            <p>  {this.state.companyNumber}</p>
                            <p>  {this.state.companyNumber2}</p>
                            <hr style={{ color: "#000", margin: "10px" }} />
                        </Col>

                        <Col md={4}>
                            <Heading type="h5"> {t("contactUs.companyAddress")}</Heading>
                            <p>{this.state.companyAddress}</p>
                            <hr style={{ color: "#000", margin: "10px" }} />
                        </Col>
                        <Col md={4}>
                            <Heading type="h5"> {t("contactUs.emailAddress")}</Heading>
                            <p> {this.state.companyEmail}</p>
                            <p> {this.state.companyEmail2}</p>
                            <hr style={{ color: "#000", margin: "10px" }} />
                        </Col>
                    </Row>
                </Container>

            </div >
        )
    }
};
export default withTranslation()(ContactInfo);
