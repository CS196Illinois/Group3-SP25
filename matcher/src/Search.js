import React from "react";

export const Search = (props) => {
    return (
        <input
            type="text"
            placeholder="Search..."
            className={props.className}
        />
    );
};