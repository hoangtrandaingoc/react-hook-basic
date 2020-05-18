import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

TodoList.propTypes = {
    todos: PropTypes.array,
    onTodoClick: PropTypes.func,
};
// k dung isRequired thi gan gia tri mac dinh 

TodoList.defaultProps = {
    todos: [],
    onTodoClick: null
}


function TodoList(props) {
    const {todos, onTodoClick} = props;

    // vi gia tri ban dau la null nen can xet dieu kien
    //chi thuc hien logic nhan vao 1 todo con UI thuc hien ben App
    function handleClick(todo){
        if(onTodoClick){
            onTodoClick(todo);
        }
    }

    return (
        <div>
            <ul className="todo-list">
                {
                    todos.map(todo =>(
                        <li 
                            key={todo.id} 
                            onClick={() => handleClick(todo)}
                        >
                            {todo.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default TodoList;