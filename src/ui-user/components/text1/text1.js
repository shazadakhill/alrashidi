import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../styles/_userStyling/components/text1.scss'

const Text1 = (props) => {

    const { t } = useTranslation();

    return (
        <div className={` text1 ${t("style.rtl")}  text-center`}>
            <Container style={{ alignItems: "center" }}>
                <Row>
                   <Col xs={1}/>
                   <Col xs={10}><p className={` ${props.size==="small" ? "smaller" : null}`}> {props.children}</p></Col>
                   <Col xs={1}/>

                </Row>
            </Container>
        </div>
    )
};

export default Text1;