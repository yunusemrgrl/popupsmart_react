import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../../redux/todos/todosSlice';
import { TodoForm } from './TodoForm';

function TodoMain() {
  const active = localStorage.getItem('class');
  const [todo, setTodo] = useState('');
  const [category, setCategory] = useState(active ? active : 'yellow');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({ title: todo, class: category }));
    setTodo('');
  };
  const handleChange = (activeList) => {
    setCategory(activeList);
    localStorage.setItem('class', activeList);
  };
  return (
    <section className='main'>
      <form onSubmit={handleSubmit}>
        <TodoForm todo={todo} setTodo={setTodo} />
        <div className='main-footer'>
          <div className='categories'>
            <span
              className={active === 'yellow' ? 'active category' : 'category'}
              style={{ backgroundColor: 'yellow' }}
              onClick={() => handleChange('yellow')}
            ></span>
            <span
              className={active === 'purple' ? 'active category' : 'category'}
              style={{ backgroundColor: 'purple' }}
              onClick={() => handleChange('purple')}
            ></span>
            <span
              className={active === 'aqua' ? 'active category' : 'category'}
              style={{ backgroundColor: 'aqua' }}
              onClick={() => handleChange('aqua')}
            ></span>
            <span
              className={active === 'brown' ? 'active category' : 'category'}
              style={{ backgroundColor: 'brown' }}
              onClick={() => handleChange('brown')}
            ></span>
            <span
              className={active === 'orange' ? 'active category' : 'category'}
              style={{ backgroundColor: 'orange' }}
              onClick={() => handleChange('orange')}
            ></span>
          </div>
          <div className='footer-btn'>
            <button type='submit' className='btn addBtn'>
              ADD
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default TodoMain;
