import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
};

function TodoForm(props) {
    const {onSubmit} = props;
    const [value, setValue] = useState('');

    function handleValueChange(event){
        setValue(event.target.value);
    }

    function handleSubmit(event){
        //prevent reloading browser
        event.preventDefault();
        if(!onSubmit) return;
        //co the them nhieu fill vao object de submit
        const formValue = {
            title: value
        };
        onSubmit(formValue);

        //reset form
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleValueChange}/>
        </form>
    );
}

export default TodoForm;