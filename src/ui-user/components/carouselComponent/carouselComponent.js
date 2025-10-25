
import React from 'react';
// import '../../home.css'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card1 from '../card/card1';
import '../../../styles/_userStyling/components/carouselComponent.scss'
import '../heading/heading'
import Heading from '../heading/heading';


const CarouselComponent = (props) => {
  const { t } = useTranslation();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1920 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1920, min: 767 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 767, min: 575 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 575, min: 0 },
      items: 1
    }
  };
  const items = props.items;
  var newItemsArray = [];
  for (let i = 0; i < items.length; i++) {
    var collectionName = items[i].title;
    var item = items[i].paperTemplates;

    for (let y = 0; y < item.length; y++) {
      newItemsArray = [...newItemsArray, { ...item[y], collectionName }]
    }
  }

  return (
    <div className="carouselComponent">

      <Heading type="h3">{t("carousel.heading")}</Heading>

      <Carousel responsive={responsive} className="smallerCardsContainer">

        {newItemsArray.sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        }).map((items) => {
          return <Card1
            collectionName={items.collectionName}
            collectionId={items.category}
            name={items.title}
            imgURL={items.image}
            id={items.id}
            key={items.id} >
          </Card1>
        })}

      </Carousel>

      <div className="viewAll"><Link to="/collections">{t('carousel.viewAll')}</Link></div>
    </div >
  )
}
export default CarouselComponent;