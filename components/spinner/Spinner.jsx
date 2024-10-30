import React from "react";

import "./styles.scss";

const Spinner = ({isLogin }) => {
    return (
        <div className={`loadingSpinner`}>
            <svg className="spinner" viewBox="0 0 50 50">
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                ></circle>
            </svg>
        </div>
    );
};

export default Spinner;