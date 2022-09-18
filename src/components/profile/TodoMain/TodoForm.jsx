import { message } from 'antd';

export function TodoForm({ todo, setTodo }) {
  return (
    <>
      <textarea
        className='textarea'
        placeholder='Enter your note here'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        autoFocus
      />
    </>
  );
}
