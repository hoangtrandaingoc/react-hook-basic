import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};
PostFiltersForm.defaultPrrops = {
    onSubmit: null
}

function PostFiltersForm(props) {
    const {onSubmit} = props;
    const [searchTerm, setSearchTerm] = useState('');
    //tao ra obj giu ra tri khong thay doi sau moi lan render
    const typingTimeoutRef = useRef(null);

    //dung phuong phap debauce -  sau 3 giay khong go chu nua se submit
    function handelSearchTermChange(e){
        const value = e.target.value;
        setSearchTerm(value);

        if(!onSubmit) return;

        //Set -- 100 -- Clear, Set --  300 --> Submit
        //Set -- 300 --> Submit

        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(()=> {
            const formValues = {
                searchTerm: value,
            };
            onSubmit(formValues)
        },300);
        
    }

    return (
        <form>
            <input type="text" 
                value={searchTerm}
                onChange={handelSearchTermChange}
            />
        </form>
    );
}

export default PostFiltersForm;