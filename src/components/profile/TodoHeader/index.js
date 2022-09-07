import { useDispatch } from 'react-redux';
import { setSearch } from '../../../redux/todos/todosSlice';

function TodoHeader() {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <header className='header'>
      <div className='title'>NotesApp</div>
      <input
        className='search'
        placeholder='Search..'
        onChange={handleSearch}
      />
    </header>
  );
}

export default TodoHeader;
