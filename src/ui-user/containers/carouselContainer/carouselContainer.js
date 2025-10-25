import React, { Component } from 'react';
import axios from 'axios'
import CarouselComponent from '../../components/carouselComponent/carouselComponent';
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner';
import ApiURL from '../../../jsonFiles/api/api.json'
class CarouselContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        this.mounted = true;
        axios.get(`${ApiURL.domain}${ApiURL.collections}`).then(
            response => {
                if (this.mounted) {
                    this.setState({
                        Items: response.data,
                        ItemsStatus: true
                    })
                }
            })
    }


    componentWillUnmount() {
        this.mounted = false;
    }

    state = {
        Items: [],
        ItemsStatus: false,
    }

    render() {
        return (
            <div className="carouselContainer  ">
                {this.state.ItemsStatus
                    ? <CarouselComponent items={this.state.Items}></CarouselComponent>
                    : <LoadingSpinner/>
                }
            </div >
        )
    }
};
export default CarouselContainer;
