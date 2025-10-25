import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../styles/_userStyling/components/heading.scss'
const Heading = (props) => {

    function renderSwitch(type) {
        switch (type) {
            case 'h1':
                return <h1>{props.children}</h1>;
            case 'h2':
                return <h2>{props.children}</h2>;
            case 'h3':
                return <h3>{props.children}</h3>;
            case 'h4':
                return <h4>{props.children}</h4>;
            case 'h5':
                return <h5>{props.children}</h5>;
            case 'h6':
                return <h6>{props.children}</h6>;
            default:
                return props.children;
        }
    }
    return (
        <div className={` heading `}>
            <Container style={{ alignItems: "center" }}>
                <Row>
                    <Col>
                        {renderSwitch(props.type)}
                    </Col>
                </Row>
            </Container>
        </div>
    )
};
export default Heading;