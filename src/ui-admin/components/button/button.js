import React from 'react';
import '../../../styles/_userStyling/components/button.scss'
import LoadingSpinner from "../loadingSpinner/loadingSpinner"

const Button = ({ isLoading,type, children, ...props }) => {

    return (
        <div className={` button `}>
            <button className="button" type={type} {...props}>
                {isLoading ? <LoadingSpinner /> : children}
            </button>
        </div>

    )
};
export default Button;

