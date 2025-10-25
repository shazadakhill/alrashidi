
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getSearch } from '../../../reduxFolder/action/getSearchAction.js'
import SearchItem from '../../components/searchItem/serachItem'
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Col, Row } from 'react-bootstrap';
import Heading from '../../components/heading/heading.js';
import ApiURL from '../../../jsonFiles/api/api.json'
import "../../../styles/_userStyling/components/card.scss"
import Meta from "../../../jsonFiles/meta/meta.json"



class SearchPage extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        this.mounted = true;



        this.handleSearch();

        axios.get(`${ApiURL.domain}${ApiURL.services}`).then(
            response => {
                if (this.mounted) {
                    this.setState(
                        {
                            Items: response.data,
                            ItemsStatus: true
                        })
                }
                this.handleSearch();
            }
        );


    }
    componentDidUpdate(prevProps, prevState) {
        let prevSearch = prevProps.searchProps.searchText;
        let newSearch = this.props.searchProps.searchText;
        if (prevSearch !== newSearch) {
            window.scrollTo(0, 0)
            this.handleSearch();
        }
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    state = {
        Items: [],
        ItemsSearchReults: [],
        ItemsStatus: false,
    }

    handleSearch = () => {

        let searchText = this.props.searchProps.searchText;
        let results = this.state.Items.filter(item => item.title.replace(/ /g, '').toLowerCase().includes(searchText.replace(/ /g, '').toLowerCase()));

        this.setState({
            ItemsSearchReults: results,
        })

    };

    render() {

        const { t } = this.props;
        let results = null;
        if (this.state.ItemsStatus) {
            results = (
                <div className="col-12 card1" >

                    <Row className="div">
                        <Col xs={12}>
                            <Heading type="h5" >{t("searching.searchFor")}: "{this.props.searchProps.searchText}" /  {t("searching.num")}: {this.state.ItemsSearchReults.length}</Heading>
                        </Col>

                        {this.state.ItemsSearchReults.length > 0
                            ?
                            this.state.ItemsSearchReults.sort(function (a, b) {
                                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                                return 0;
                            }).map((result, index) => {
                                return <Col xs={12} sm={6} md={4} key={index} className="smallerCardsContainer">
                                    <SearchItem
                                        title={result.title}
                                        image={result.image}
                                        id={result.id}
                                        key={result.id}
                                        searchTerm={this.props.searchProps.searchText}
                                    >
                                    </SearchItem>
                                </Col>
                            }

                            ) : (
                                <p className={`resultsDetails `} >{t("searching.notFound")} </p>
                            )
                        }
                    </Row>
                </div >
            );
        } else {
            results = (
                <div className="col-12" style={{ marginTop: "60px" }}>
                    <LoadingSpinner />
                </div>)
        }

        return (
            <div className="SearchPage ">

                <Helmet>
                    <title>
                    {Meta.searchPage.title}
                    </title>
                    <meta charSet="utf-8" />
                    <meta
                        name="description"
                        content={Meta.searchPage.description} />
                </Helmet>

                <div className=" text-center" style={{ minHeight: "200px" }}>
                    {results}
                </div>
            </div>
        )
    }
};
const mapStateToProps = state => (
    {
        searchProps: state.searchReducer,
    });
export default connect(mapStateToProps, { getSearch })(withTranslation()(SearchPage));


