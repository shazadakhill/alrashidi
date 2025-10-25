import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { sendSearch } from '../../../reduxFolder/action/sendSearchAction';
import { Form, FormControl, Button } from 'react-bootstrap'
import { AiOutlineSearch } from "react-icons/ai";

class search extends Component {
    componentDidMount() {

    }


    state = {
        searchText: ""
    }

    handleSearchInput = event => {
        this.setState({
            searchText: event.target.value
        });
    };
    handleSearchSubmit = () => {
        if (this.state.searchText) {
            let text = this.state.searchText;
            this.props.sendSearch(text);
            this.setState({ searchText: "" })
            this.props.history.push('/searchResult');
        } else {
            alert("Please enter some search text!");
        }
    };
    handleSearchKeyUp = event => {
        event.preventDefault();
        if (event.key === 'Enter' && event.keyCode === 13) {
            this.handleSearchSubmit();
        }
    }
    handleFormSubmit = e => e.preventDefault();
    render() {

        const { t } = this.props;

        return (
                <Form className="d-flex custom-Form" onSubmit={this.handleFormSubmit} >
                    <Button variant="outline-dark" size="sm" onClick={()=>{this.handleSearchSubmit(); this.props.closeSideMenueHundler();} } className="custom-Button ml-2"><AiOutlineSearch className="custom-Button icon" /></Button>
                    <FormControl
                        type="search"
                        value={this.state.searchText} 
                        placeholder={t('userNavbar.search')}
                        className="mr-2  custom-FormControl"
                        aria-label="Search"
                        onChange={this.handleSearchInput}
                    />
                </Form>
        )
    }
};
export default connect(null, { sendSearch })(withTranslation()(withRouter(search)));