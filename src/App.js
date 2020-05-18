import React, {useState,useEffect} from 'react';
import queryString from 'query-string';
import './App.scss';
// import ColorBox from './components/ColorBox/index';
import TodoList from './components/TodoList/';
import TodoForm from './components/TodoForm/';
import PostList from './components/PostList/';
import Pagination from './components/Pagination/';
import PostFiltersForm from './components/PostFiltersForm';
import Clock from './components/Clock';
function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love React! 😍 ' },
    { id: 2, title: 'We love React! 🥰 ' },
    { id: 3, title: 'They love React! 🚀 ' },
    ]);
  
    const [postList, setPostList] = useState([]);
    const [pagination, setPagination] = useState({
      _page : 1,
      _limit: 10,
      _totalRows: 1,
    });

    const [filters, setFilters] = useState({
      _limit: 10,
      _page: 1,
    })

    useEffect(() => {
      async function fetchPostList(){
        try {
          //_limit=10&_page=1
          //thu vien queryString bien obj thanh string
          const paramsString = queryString.stringify(filters);
          const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
          const response = await fetch(requestUrl);
          const responseJSON = await response.json();
          // console.log({responseJSON});
  
          const {data, pagination} = responseJSON;
          setPostList(data);
          setPagination(pagination);
        } catch (error) {
          console.log('Failed to fetch post list', error.message);
        }
    }
      fetchPostList();
    }, [filters]);

    function handleTodoClick(todo){
      console.log(todo);
      //tim vi tri can xoa index
      const index = todoList.findIndex(x => x.id = todo.id);
      if(index < 0) return;
      
      const newTodoList = [...todoList];
      newTodoList.splice(index,1);
      setTodoList(newTodoList);
    }

    function handleTodoFormSubmit(formValueS){
      console.log(`Form submit : ${formValueS}`);
      //add new todo to current todo list
      const newTodo =  {
        id: todoList.length + 1,
        ...formValueS
      }
      const newTodoList = [...todoList];
      newTodoList.push(newTodo);
      setTodoList(newTodoList);
    }

    function hanldlePageChange(newPage){
      console.log("New Page: ", newPage);
      setFilters({
        ...filters,
        _page: newPage
      })
    }

    function handleFiltersChange(newFilters){
      console.log("New Filters : ", newFilters);
      setFilters({
        ...filters,
        _page: 1,
        title_like: newFilters.searchTerm
      });
    }

    const [showClock, setShowclock] = useState(true)
  return (
    <div className="App">
      <h1>React hook - PostList</h1>

      {showClock && <Clock/>}
        <button onClick={()=>setShowclock(false)}>Hide Clock</button>
      {/* <TodoForm onSubmit={handleTodoFormSubmit}/> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick}/> */}
      {/* <ColorBox/> */}
      {/* <PostFiltersForm onSubmit={handleFiltersChange}/>
      <PostList posts={postList}/>
      <Pagination
        pagination={pagination}
        onPageChange={hanldlePageChange}
      /> */}
    </div>
  );
} 

export default App;
