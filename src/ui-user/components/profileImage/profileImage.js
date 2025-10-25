import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getToken } from '../../../reduxFolder/action/auth'
import LetteredAvatar from 'react-lettered-avatar';


const UserNavbar = (props) => {

    useEffect(() => {
        getToken();
    }, [])

    const arrayWithColors = [
        'rgb(100 141 182)',
        'rgb(103 129 122)',
        'rgb(170 159 83)',
        'rgb(180 131 80)',
        'rgb(121 75 105)',
        'rgb(44 62 80)'
    ];
    return (
        <span className="profileImage"  >

            <LetteredAvatar
                name={props.userName}
                size={props.size ?props.size :24}
                radius={150}
                color="#fff"
                backgroundColors={arrayWithColors}
            />
        </span >
    )
};
const mapStateToProps = state => {
    return {
        userName: state.auth.userName
    }
}
export default connect(mapStateToProps, { getToken })(UserNavbar);
