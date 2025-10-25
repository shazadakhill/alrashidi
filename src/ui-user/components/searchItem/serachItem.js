import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Highlighter from "react-highlight-words";
import Card from 'react-bootstrap/Card'
import { Col, Row } from 'react-bootstrap';
import '../../../styles/_userStyling/components/searchItem.scss'






const SearchItem = (props) => {
    const { t } = useTranslation();
    var searchTerm = props.searchTerm;


    return (
        <div className="searchItem">

            <Card>
                <div className="imageContainer">
                    <img src={props.image} alt={props.title} className="image " />
                </div>
                <Card.Body className="title">
                    <Card.Title >
                        <Highlighter style={{ backgroundColor: "" }}
                            highlightClassName="highlited"
                            searchWords={[searchTerm]}
                            autoEscape={true}
                            textToHighlight={props.title}
                        /></Card.Title>
                </Card.Body>

                <Row>
                    <Col className="link">
                        <Card.Link as={Link} to={{ pathname: "/service-application/" + props.id }}>{t("card.makeApplication")}</Card.Link>
                    </Col>
                    <Col className="link">
                        <Card.Link as={Link} to={{ pathname: "/service/" + props.id }}>{t("card.view")}</Card.Link>
                    </Col>
                </Row>
            </Card >
        </div>
    )
}
export default SearchItem;
