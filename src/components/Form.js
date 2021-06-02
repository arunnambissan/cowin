import React from 'react';

const Form = ({ children, onSubmit }) => {

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit && onSubmit();
        }}>
            {children}
        </form>
    )
}

export default Form;