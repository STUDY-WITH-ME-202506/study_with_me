
// ======= DOM 가져오기 ======== //
const $todoList = document.getElementById('todoList');
const $todoForm = document.getElementById('todo-form');
const $todoInput = document.getElementById('todo-input')
const $todoUl = document.getElementById('todo-ul');
const $todosLeftCount = document.getElementById('todos-left-count');
const $filters = document.querySelector('.filters');
const $clearCompletedBtn = document.getElementById('clear-completed');
const $todoToggleBtn = document.getElementById('todo-toggle-btn')

// ======== 상태관리 변수 및 상수 ======== //
const state = {
  // 모든 할 일 데이터를 담는 배열
  todos: [],
  // 현재 사용자가 어떤 하단 필터(모두보기-all, 진행중-active, 완료-completed)를 선택했는지
  currentFilter: 'all',
};

// ======== 핵심 로직 함수 정의 ========= //
function render() {

  let todosToRender = [];

  switch (state.currentFilter) {
    case 'all':
      todosToRender = state.todos;
      break;
    case 'active':
      todosToRender = state.todos.filter(todo => !todo.completed);
      break;
    case 'completed':
      todosToRender = state.todos.filter(todo => todo.completed);
      break;
  }

  $todoUl.innerHTML = '';

  if (todosToRender.length === 0 && state.currentFilter === 'all') {
    const $li = document.createElement('li');
    $li.classList.add('todo-empty');
    $li.textContent = '할 일이 없습니다';
    $todoUl.append($li);
    return;
  }
  todosToRender.forEach(({id, text, completed}) => {
    const $li = document.createElement('li');
    $li.classList.add('todo-item');

    if (completed) {
      $li.classList.add('completed');
    } else if (!completed && state.currentFilter === 'active') {
      $li.classList.add('active');
    }

    $li.dataset.id = id;

    $li.innerHTML = `
        <div class="item-container">
          <input type="checkbox" class="todo-check" ${completed ? 'checked' : ''}>
          <span class="todo-text">${text}</span>
          <button class="delete-button">
              <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;

    $todoUl.append($li);
  });

  $todosLeftCount.textContent = state.todos.filter(todo => !todo.completed).length.toString();

  document.querySelectorAll('.filters button').forEach(($btn) => {
    if ($btn.id === `filter-${state.currentFilter}`) {
      $btn.classList.add('active');
    } else {
      $btn.classList.remove('active');
    }
  });

}

function clearCompletedTodos() {
  state.todos = state.todos.filter(todo => !todo.completed);
  render();
}

function addTodo(newText) {
  state.todos.push({
    id: Date.now(),
    text: newText,
    completed: false,
  });
  render();
}

function deleteTodo(targetId) {
  state.todos = state.todos.filter(todo => todo.id !== targetId);
  render();
}

function toggleTodo(targetId) {
  state.todos = state.todos.map(todo =>
    todo.id === targetId ? { ...todo, completed: !todo.completed } : todo
  );
  render();
}

// ======== 이벤트 리스너 설정 ========== //
$todoToggleBtn.addEventListener('click', e => {
  const isOpen = $todoList.classList.toggle('show');

  $todoToggleBtn.style.right = isOpen ? '400px' : '0';
})


$filters.addEventListener('click', e => {
  if (!e.target.matches('button')) return;

  const buttonId = e.target.id;
  state.currentFilter = buttonId.substring(buttonId.indexOf('-') + 1);

  render();
});

$clearCompletedBtn.addEventListener('click', e => {
  clearCompletedTodos();
});

$todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const newTodoText = $todoInput.value.trim();

  if (newTodoText) {
    addTodo(newTodoText);
  }

  $todoInput.value = '';
  $todoInput.focus();
});

$todoUl.addEventListener('click', e => {

  const todoId = +e.target.closest('.todo-item').dataset.id;

  if (e.target.matches('.delete-button i')) {
    deleteTodo(todoId);
  } else if (e.target.matches('.todo-check')) {
    toggleTodo(todoId);
  }
});

render();
