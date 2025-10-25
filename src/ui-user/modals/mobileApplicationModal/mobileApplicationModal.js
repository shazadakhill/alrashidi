
import React, { useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ApiURL from '../../../jsonFiles/api/api.json'
import axios from "axios"
import Heading from '../../components/heading/heading';
import { Nav } from 'react-bootstrap'


function MobileApplicationModal(props) {

    const { t } = useTranslation();


    const [showApplicationsLinks, setShowApplicationsLinks] = useState(false);

    const handleClose = () => {
        setShowApplicationsLinks(false)
    };
    const handleShowApplicationsLinks = () => {
        setShowApplicationsLinks(true)
    };

    const [androidLink, setAndroidLink] = React.useState("");
    const [iosLink, setIosLink] = React.useState("");


    React.useEffect(() => {

        axios.get(`${ApiURL.domain}${ApiURL.settings}`).then(
            response => {
                const detail = response.data;
                setAndroidLink(detail.androidAppLink);
                setIosLink(detail.iosAppLink);

            });
    });



    return (
        <Container className={`MobileApplicationModal text-center `}>




            <Nav.Link onClick={handleShowApplicationsLinks}>
                <Heading type="h5">{t("headerNav.application")} </Heading>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118.28 127.13"><defs><style>.cls-1</style></defs><g id="Layer_2" data-name="Layer 2"><g id="mobile"><path className="cls-1" d="M103.75,41.88A5.23,5.23,0,0,0,98.44,47v3.49a5.24,5.24,0,0,0,5.31,5.15h10.33a4.2,4.2,0,0,0,4.2-4.2V42.76a.87.87,0,0,0-.88-.88h-5.93a.89.89,0,0,1-.88-.88V6.54A6.65,6.65,0,0,0,103.84,0H48.28a6.65,6.65,0,0,0-6.75,6.54V31.45a.91.91,0,0,1-.48.78L13.88,46.38l-.06,0C13,46.91-4.64,58.32,1.17,86c4.56,21.69,28.48,23.4,39.45,23a.88.88,0,0,1,.91.88v10.68a6.65,6.65,0,0,0,6.75,6.55h55.56a6.65,6.65,0,0,0,6.75-6.55V106.2a.89.89,0,0,1,.88-.88h2.61a4.2,4.2,0,0,0,4.2-4.2V92.41a.87.87,0,0,0-.88-.88H103.75a5.24,5.24,0,0,0-5.31,5.16v3.48a5.23,5.23,0,0,0,5.31,5.15H104a.88.88,0,0,1,.88.88v4.17a6.65,6.65,0,0,1-6.75,6.54H54a6.65,6.65,0,0,1-6.75-6.54V49.77a.88.88,0,0,1,.28-.65c1.56-1.4,4.75-3.65,11.1-7.24,14.14-8,13.68-17.24,13.48-18.82a.85.85,0,0,0-.15-.41c-4-5.51-12.16-.26-12.78.15l-.08,0L48.5,28.35a.88.88,0,0,1-1.28-.78V17.28A6.65,6.65,0,0,1,54,10.73H98.15a6.65,6.65,0,0,1,6.75,6.55V41a.88.88,0,0,1-.88.88ZM70,118.93a2.65,2.65,0,0,1,1.84-.73h8.38a2.56,2.56,0,0,1,2.6,2.52,2.49,2.49,0,0,1-.76,1.78,2.62,2.62,0,0,1-1.84.74H71.87a2.56,2.56,0,0,1-2.6-2.52A2.49,2.49,0,0,1,70,118.93ZM85.53,8.28H66.59a.88.88,0,0,1-.88-.88h0a.87.87,0,0,1,.88-.88H85.53a.88.88,0,0,1,.88.88h0A.89.89,0,0,1,85.53,8.28Z" /><path className="cls-1" d="M118.28,58.43v9.5A4.29,4.29,0,0,1,114,72.22H103.75a5.24,5.24,0,0,1-5.31-5.15V63.59a5.24,5.24,0,0,1,5.31-5.16Z" /><path className="cls-1" d="M118.28,75v9.5A4.29,4.29,0,0,1,114,88.77H103.75a5.24,5.24,0,0,1-5.31-5.15V80.14A5.24,5.24,0,0,1,103.75,75Z" /></g></g></svg>
            </Nav.Link>

            <Modal
                show={showApplicationsLinks}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                animation={false}
                size="lg"
                className={t("style.rtl")}
            >
                <Modal.Header closeButton >
                    <Modal.Title>
                        {t("headerNav.application")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row className="text-center">
                        <Col xs={12} style={{ marginTop: "20px" }}>
                            {t("headerNav.androidLink")}
                        </Col>
                        {androidLink === "" || androidLink === undefined || androidLink === null
                            ?<Col xs={12} style={{ marginTop: "20px" }}>/</Col>
                            : <Col xs={12} style={{ marginTop: "20px" }}>
                                <a href={androidLink} target="_blank" rel="noreferrer" > {t("link")}</a>
                            </Col>
                        }
                       
                        <Col xs={12} style={{ marginTop: "40px" }}>
                            {t("headerNav.iosLink")}
                        </Col>
                        {iosLink === "" || iosLink === undefined || iosLink === null
                            ?<Col xs={12} style={{ marginTop: "20px" }}>/</Col>
                            : <Col xs={12} style={{ marginTop: "20px" }}>
                                <a href={iosLink} target="_blank" rel="noreferrer" > {t("link")}</a>
                            </Col>
                        }

                    </Row>

                </Modal.Body>
            </Modal>
        </Container >
    );
}

export default MobileApplicationModal;