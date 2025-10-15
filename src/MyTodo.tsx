import { useState, useEffect } from "react";
import "./MyTodo.scss";
const KEY = "todo1.todos";
type Todo = { id: number; title: string; done: boolean };
const MyTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const loadTodos = () => {
    const json = localStorage.getItem(KEY);
    if (json) setTodos(JSON.parse(json));
  };
  const saveTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
    localStorage.setItem(KEY, JSON.stringify(newTodos));
  };
  useEffect(() => {
    loadTodos();
  }, []);
  const addTodo = () => {
    const n = todos.length;
    const id = n == 0 ? 1 : todos[n - 1].id + 1;
    saveTodos([...todos, { id, title, done: false }]);
    setTitle("");
  };
  const deleteTodo = (id: number) => {
    if (confirm("삭제하시겠습니까?"))
      saveTodos(todos.filter((t) => t.id != id));
  };
  const toggleTodo = (id: number) =>
    saveTodos(
      todos.map((todo) =>
        todo.id == id ? { ...todo, done: !todo.done } : todo
      )
    );
  return (
    <div id="MyTodo">
      <h1>할 일</h1>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>할일</td>
          </tr>
        </thead>
        <tbody>
          {todos.map(({ id, title, done }) => (
            <tr key={id} className={done ? "gray" : ""}>
              <td>{id}</td>
              <td>
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => toggleTodo(id)}
                />
                {title}
                <span onClick={() => deleteTodo(id)}>x</span>
              </td>
            </tr>
          ))}
          {todos.length == 0 && (
            <tr>
              <td></td>
              <td>할일이 없습니다</td>
            </tr>
          )}
        </tbody>
      </table>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="할일을 입력하세요"
      />
      <button type="button" onClick={() => addTodo()}>
        추가
      </button>
    </div>
  );
};
export default MyTodo;
