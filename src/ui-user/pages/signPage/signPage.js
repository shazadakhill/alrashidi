
import React from 'react';
import UserAuth from '../../modals/authModal/authModal';
import image from "../../../assets/authintication.png"
import { Helmet } from 'react-helmet';
import Meta from "../../../jsonFiles/meta/meta.json"


const signPage = (props) => {
    const style = {
        backgroundImage: `url(${image})`,
        backgroundPosition: 'top',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: "40vw",
        position: "relative",
        top: "-5vw"
    }

    return (
        <div style={style} >
            <Helmet>
                <title>
                {Meta.signPage.title}
                </title>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content={Meta.signPage.description} />

            </Helmet>
            <div style={{ position: "relative", top: "36vw" }}>
                <UserAuth></UserAuth>
            </div>
        </div>
    );
}

export default signPage;