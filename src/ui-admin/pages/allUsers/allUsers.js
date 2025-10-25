import React, { Component } from 'react';
import UserDiv from '../../components/userDiv/userDiv';
import { Container } from 'react-bootstrap';
import ApiURL from '../../../jsonFiles/api/api.json'
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"
import axios from 'axios'
import { connect } from 'react-redux'

class AllUsers extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        this.mounted = true;


        const token = 'Bearer '.concat(this.props.loginProps.token);
        axios.get(`${ApiURL.domain}${ApiURL.accounts}`, { "headers": { Authorization: token } }).then(
            response => {
                if (this.mounted) {
                    this.setState({
                        Users: response.data,
                        UsersStatus: true
                    })
                }
            });

        axios.get(`${ApiURL.domain}${ApiURL.zone}`).then(
            response => {
                this.setState({
                    Zones: response.data,
                })

                axios.get(`${ApiURL.domain}${ApiURL.governorate}`).then(
                    response => {
                        if (this.mounted) {
                            this.setState({
                                Governorates: response.data,
                            })
                        }
                    })

            });

    }
    componentWillUnmount() {
        this.mounted = false;
    }
    state = {
        Users: null,
        UsersStatus: false,
        Governorates: [],
        Zones: []
    }


    render() {
        let users = null;
        let number = 1;
        if (this.state.UsersStatus) {
            users = (
                <>


                    {this.state.Users.filter(users => users.phone !== null).map((user, index) => {
                        return (
                            <React.Fragment key={index}>
                                {user.zone
                                    ? this.state.Zones.filter(zone => zone.id === user.zone).map((zone, index) => {
                                        return (<React.Fragment key={index}>
                                            <UserDiv
                                                id={user.id}
                                                fullName={user.fullName}
                                                nationalId={user.nationalId}
                                                phone={user.phone}
                                                number={number++}
                                                zone={zone.name}
                                                type="allUsers"
                                            >
                                            </UserDiv>
                                        </React.Fragment>)
                                    })
                                    : <UserDiv
                                        id={user.id}
                                        fullName={user.fullName}
                                        nationalId={user.nationalId}
                                        phone={user.phone}
                                        number={number++}
                                        type="allUsers"
                                    ></UserDiv>}

                            </React.Fragment>)
                    })}

                </>
            )
        } else {
            users = (<LoadingSpinner />)
        }
        return (
            <Container className="servicesSubServices">
                {users}
            </Container>
        )
    }
};
const mapStateToProps = state => {

    return {
        loginProps: state.auth
    }

}


export default connect(mapStateToProps)(AllUsers);