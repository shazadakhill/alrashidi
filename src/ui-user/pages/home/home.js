import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import HomeDiv1 from '../../components/homeDiv1/homeDiv1';
import HomeDiv2 from '../../components/homeDiv2/homeDiv2';
import "../../../styles/_userStyling/pages/home.scss"
import CarouselContainer from '../../containers/carouselContainer/carouselContainer'
import HeaderNav from '../../components/headerNav/headerNav';
import Meta from "../../../jsonFiles/meta/meta.json"

const Home = (props) => {
  return (
    <div className="home">
      <Helmet>
        <title>
        {Meta.home.title}
        </title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={Meta.home.description} />
      </Helmet>
      <div className="div"> <Header></Header></div>
      <HeaderNav></HeaderNav>
      <div className="div"><HomeDiv1></HomeDiv1></div>
      <div className="div"><HomeDiv2></HomeDiv2></div>
      <div className="div"><CarouselContainer></CarouselContainer></div>
    </div>
  )
};
export default Home;