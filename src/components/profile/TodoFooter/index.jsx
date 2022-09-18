import { Box } from '@chakra-ui/react';
import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCompletedTodosAsync,
  deleteTodosAsync,
  getTodosAsync,
  toggleTodosAsync,
  updateTodosAsync,
} from '../../../redux/todos/services';
import { editTodo, selectTodos } from '../../../redux/todos/todosSlice';
function TodoFooter() {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [title, setTitle] = useState();

  const todos = useSelector(selectTodos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  let yellowList = 0;
  let purpleList = 0;
  let aquaList = 0;
  let brownList = 0;
  let orangeList = 0;

  const filteredYellow = [];
  const filteredPurple = [];
  const filteredAqua = [];
  const filteredBrown = [];
  const filteredOrange = [];

  const items = useSelector((state) => {
    if (state.search === '') {
      return todos;
    }
    return state.todos.filter((todo) =>
      todo.title.toLowerCase().includes(state.search),
    );
  });
  items.forEach((todo) => {
    if (todo.class === 'yellow') {
      filteredYellow.push(todo);
      if (todo.completed) {
        yellowList += 1;
      }
    } else if (todo.class === 'purple') {
      filteredPurple.push(todo);
      if (todo.completed) {
        purpleList += 1;
      }
    } else if (todo.class === 'aqua') {
      filteredAqua.push(todo);
      if (todo.completed) {
        aquaList += 1;
      }
    } else if (todo.class === 'brown') {
      filteredBrown.push(todo);
      if (todo.completed) {
        brownList += 1;
      }
    } else if (todo.class === 'orange') {
      filteredOrange.push(todo);
      if (todo.completed) {
        orangeList += 1;
      }
    }
  });

  const handleDelete = async (id) => {
    await dispatch(deleteTodosAsync(id));
  };

  const handleToggle = (id, completed) => {
    dispatch(toggleTodosAsync({ id, data: { completed } }));
  };
  const handleClearCompleted = async (color) => {
    const activeTodos = [];
    await todos.forEach((todo) => {
      if (todo.class === color && todo.completed) {
        return activeTodos.push(todo);
      }
    });
    activeTodos.forEach((todo) => {
      dispatch(clearCompletedTodosAsync(todo.id));
    });
  };

  const handleEditTodo = (todo, id) => {
    setTitle(todo.title);
    dispatch(editTodo(todo, id));
  };
  const handleUpdateTodo = (action) => {
    console.log(action.title.length < 3);
    if (action.title.trim() === '' || action.title.length < 4) {
      return message.warning({
        content: 'En az 3 harf içermelidir',
        key: 'todos_validationUpdate',
      });
    }
    dispatch(updateTodosAsync(action));
  };

  return (
    todos.length > 0 && (
      <footer className='footer'>
        {filteredYellow.length > 0 && (
          <div className='list' style={{ backgroundColor: 'yellow' }}>
            <Box mt={3} textAlign={'center'}>
              Todo List 1
            </Box>
            {filteredYellow.map((todo, index) => (
              <div className='singleItem' key={index}>
                <input
                  type='checkbox'
                  readOnly
                  onClick={() => handleToggle(todo.id, !todo.completed)}
                  checked={todo.completed}
                />
                {todo.isEditing ? (
                  <input
                    value={title}
                    className='editInput'
                    ref={inputRef}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                ) : (
                  <p>{todo.title}</p>
                )}
                {todo.isEditing ? (
                  <TiTick
                    style={{ marginRight: 10, marginLeft: 10 }}
                    onClick={() => {
                      handleUpdateTodo({
                        todo: todo,
                        title: title,
                        id: todo.id,
                      });
                    }}
                  />
                ) : (
                  <BiEditAlt
                    className='editBtn'
                    onClick={() => handleEditTodo(todo, todo.id)}
                  />
                )}
                <AiOutlineDelete
                  className='deleteBtn'
                  onClick={() => handleDelete(todo.id)}
                />
              </div>
            ))}
            {yellowList !== 0 && (
              <span
                className='clearBtn'
                onClick={() => handleClearCompleted('yellow')}
              >
                Clear Completed
              </span>
            )}
          </div>
        )}
        {filteredPurple.length > 0 && (
          <div className='list' style={{ backgroundColor: 'purple' }}>
            <Box mt={3} textAlign={'center'}>
              Todo List 2
            </Box>
            {filteredPurple.map((todo, index) => (
              <div className='singleItem' key={index}>
                <input
                  type='checkbox'
                  readOnly
                  onClick={() => handleToggle(todo.id, !todo.completed)}
                  checked={todo.completed}
                />
                {todo.isEditing ? (
                  <input
                    value={title}
                    className='editInput'
                    ref={inputRef}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                ) : (
                  <p>{todo.title}</p>
                )}
                {todo.isEditing ? (
                  <TiTick
                    style={{ marginRight: 10, marginLeft: 10 }}
                    onClick={() => {
                      handleUpdateTodo({ title: title, id: todo.id });
                    }}
                  />
                ) : (
                  <BiEditAlt
                    className='editBtn'
                    onClick={() => handleEditTodo(todo, todo.id)}
                  />
                )}
                <AiOutlineDelete
                  className='deleteBtn'
                  onClick={() => handleDelete(todo.id)}
                />
              </div>
            ))}
            {purpleList !== 0 && (
              <span
                className='clearBtn'
                onClick={() => handleClearCompleted('purple')}
              >
                Clear Completed
              </span>
            )}
          </div>
        )}
        {filteredAqua.length > 0 && (
          <div className='list' style={{ backgroundColor: 'aqua' }}>
            <Box mt={3} textAlign={'center'}>
              Todo List 3
            </Box>
            {filteredAqua.map((todo, index) => (
              <div className='singleItem' key={index}>
                <input
                  type='checkbox'
                  readOnly
                  onClick={() => handleToggle(todo.id, !todo.completed)}
                  checked={todo.completed}
                />
                {todo.isEditing ? (
                  <input
                    value={title}
                    className='editInput'
                    ref={inputRef}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                ) : (
                  <p>{todo.title}</p>
                )}
                {todo.isEditing ? (
                  <TiTick
                    style={{ marginRight: 10, marginLeft: 10 }}
                    onClick={() => {
                      handleUpdateTodo({ title: title, id: todo.id });
                    }}
                  />
                ) : (
                  <BiEditAlt
                    className='editBtn'
                    onClick={() => handleEditTodo(todo, todo.id)}
                  />
                )}
                <AiOutlineDelete
                  className='deleteBtn'
                  onClick={() => handleDelete(todo.id)}
                />
              </div>
            ))}
            {aquaList !== 0 && (
              <span
                className='clearBtn'
                onClick={() => handleClearCompleted('aqua')}
              >
                Clear Completed
              </span>
            )}
          </div>
        )}
        {filteredBrown.length > 0 && (
          <div className='list' style={{ backgroundColor: 'brown' }}>
            <Box mt={3} textAlign={'center'}>
              Todo List 4
            </Box>
            {filteredBrown.map((todo, index) => (
              <div className='singleItem' key={index}>
                <input
                  type='checkbox'
                  readOnly
                  onClick={() => handleToggle(todo.id, !todo.completed)}
                  checked={todo.completed}
                />
                {todo.isEditing ? (
                  <input
                    value={title}
                    className='editInput'
                    ref={inputRef}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                ) : (
                  <p>{todo.title}</p>
                )}
                {todo.isEditing ? (
                  <TiTick
                    style={{ marginRight: 10, marginLeft: 10 }}
                    onClick={() => {
                      handleUpdateTodo({ title: title, id: todo.id });
                    }}
                  />
                ) : (
                  <BiEditAlt
                    className='editBtn'
                    onClick={() => handleEditTodo(todo, todo.id)}
                  />
                )}
                <AiOutlineDelete
                  className='deleteBtn'
                  onClick={() => handleDelete(todo.id)}
                />
              </div>
            ))}
            {brownList !== 0 && (
              <span
                className='clearBtn'
                onClick={() => handleClearCompleted('brown')}
              >
                Clear Completed
              </span>
            )}
          </div>
        )}
        {filteredOrange.length > 0 && (
          <div className='list' style={{ backgroundColor: 'orange' }}>
            <Box mt={3} textAlign={'center'}>
              Todo List 5
            </Box>
            {filteredOrange.map((todo, index) => (
              <div className='singleItem' key={index}>
                <input
                  type='checkbox'
                  readOnly
                  onClick={() => handleToggle(todo.id, !todo.completed)}
                  checked={todo.completed}
                />
                {todo.isEditing ? (
                  <input
                    value={title}
                    className='editInput'
                    ref={inputRef}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                ) : (
                  <p>{todo.title}</p>
                )}
                {todo.isEditing ? (
                  <TiTick
                    style={{ marginRight: 10, marginLeft: 10 }}
                    onClick={() => {
                      handleUpdateTodo({ title: title, id: todo.id });
                    }}
                  />
                ) : (
                  <BiEditAlt
                    className='editBtn'
                    onClick={() => handleEditTodo(todo, todo.id)}
                  />
                )}
                <AiOutlineDelete
                  className='deleteBtn'
                  onClick={() => handleDelete(todo.id)}
                />
              </div>
            ))}
            {orangeList !== 0 && (
              <span
                className='clearBtn'
                onClick={() => handleClearCompleted('orange')}
              >
                Clear Completed
              </span>
            )}
          </div>
        )}
      </footer>
    )
  );
}
export default TodoFooter;
