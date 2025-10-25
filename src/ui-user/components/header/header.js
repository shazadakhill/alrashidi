import React from 'react';
import HeaderImg from "../../../assets/header.jpg"


const Header = (props) => {


  return (
    <div className="header" >
      <img className="img-fluid"
        style={{ width: "100%", height: "auto" }}
        src={HeaderImg}
        alt="header"></img>
    </div>
  )
};
export default Header;