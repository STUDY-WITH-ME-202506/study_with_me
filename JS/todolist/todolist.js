
import { saveDeletedCount  } from './saveDeletedCount .js';

export function todolist() {

// ======= DOM 가져오기 ======== //
    const $todoList = document.getElementById('todoList');
    const $todoForm = document.getElementById('todo-form');
    const $todoInput = document.getElementById('todo-input')
    const $todoUl = document.getElementById('todo-ul');
    const $todosLeftCount = document.getElementById('todos-left-count');
    const $filters = document.querySelector('.filters');
    const $clearCompletedBtn = document.getElementById('clear-completed');
    const $todoToggleBtn = document.getElementById('todo-toggle-btn');
    const $toggleAllBtn = document.getElementById('toggle-all-button');


// ======== 상태관리 변수 및 상수 ======== //
    const state = {
        todos: [],
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

            if (completed) $li.classList.add('completed');
            else if (!completed && state.currentFilter === 'active') $li.classList.add('active');

            $li.dataset.id = id;
            $li.setAttribute('draggable', 'true');

            $li.innerHTML = `

        <div class="item-container">
          <input type="checkbox" class="todo-check" ${completed ? 'checked' : ''}>
          <span class="todo-text">${text}</span>
          <button class="delete-button">
              <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
            addDragEvents($li);
            $todoUl.append($li);
        });

        $todosLeftCount.textContent = state.todos.filter(todo => !todo.completed).length.toString();

        document.querySelectorAll('.filters button').forEach(($btn) => {
            if ($btn.id === `filter-${state.currentFilter}`) $btn.classList.add('active');
            else $btn.classList.remove('active');
        });
    }

    function createConfirmModal(onConfirm) {
        const $confirmModal = document.createElement('div');
        $confirmModal.id = 'confirmModal';
        $confirmModal.className = 'modal-overlay-internal';
        $confirmModal.innerHTML = `
      <div class="modal-content">
        <p>정말 완료된 항목을 모두 삭제할까요?</p>
        <div class="modal-buttons">
          <button id="confirmYes">삭제</button>
          <button id="confirmNo">취소</button>
        </div>
      </div>
    `;
        const $yes = $confirmModal.querySelector('#confirmYes');
        const $no = $confirmModal.querySelector('#confirmNo');

        $yes.addEventListener('click', () => {
            if (typeof onConfirm === 'function') {
                onConfirm();
            }
            $confirmModal.remove();
        });

        $no.addEventListener('click', () => {
            $confirmModal.remove();
        });

        $todoList.appendChild($confirmModal);
    }

    function clearCompletedTodos() {
        const deleted = state.todos.filter(todo => todo.completed);
        saveDeletedCount(deleted.length);
        state.todos = state.todos.filter(todo => !todo.completed);
        render();
    }

    function addTodo(newText) {
        state.todos.push({id: Date.now(), text: newText, completed: false});
        render();
    }

    function deleteTodo(targetId) {
        state.todos = state.todos.filter(todo => todo.id !== targetId);
        render();
    }

    function toggleTodo(targetId) {
        state.todos = state.todos.map(todo =>
            todo.id === targetId ? {...todo, completed: !todo.completed} : todo
        );
        render();
    }

    function toggleAllTodos() {
        if (state.todos.length === 0) return;
        const allCompleted = state.todos.every(todo => todo.completed);
        state.todos = state.todos.map(todo => ({...todo, completed: !allCompleted}));
        render();
    }

    let draggedElement = null;

    function addDragEvents($li) {
        $li.addEventListener('dragstart', e => {
            draggedElement = e.currentTarget;
            e.dataTransfer.effectAllowed = 'move';
            e.currentTarget.classList.add('dragging');
        });

        $li.addEventListener('dragend', e => {
            e.currentTarget.classList.remove('dragging');
            draggedElement = null;
        });

        $li.addEventListener('dragover', e => {
            e.preventDefault();
            const $over = e.currentTarget;
            if ($over !== draggedElement) $over.classList.add('drag-over');
        });

        $li.addEventListener('dragleave', e => {
            e.currentTarget.classList.remove('drag-over');
        });

        $li.addEventListener('drop', e => {
            e.preventDefault();
            const dropTarget = e.currentTarget;
            if (dropTarget !== draggedElement) {
                const fromId = +draggedElement.dataset.id;
                const toId = +dropTarget.dataset.id;

                const fromIndex = state.todos.findIndex(todo => todo.id === fromId);
                const toIndex = state.todos.findIndex(todo => todo.id === toId);

                const moved = state.todos.splice(fromIndex, 1)[0];
                state.todos.splice(toIndex, 0, moved);

                render();
            }
        });
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
        createConfirmModal(clearCompletedTodos);
    });

    $todoForm.addEventListener('submit', e => {
        e.preventDefault();
        const newTodoText = $todoInput.value.trim();
        if (newTodoText) addTodo(newTodoText);
        $todoInput.value = '';
        $todoInput.focus();
    });

    $todoUl.addEventListener('click', e => {
        const $li = e.target.closest('.todo-item');
        if (!$li) return;
        const todoId = +$li.dataset.id;
        if (e.target.matches('.delete-button i') || e.target.closest('.delete-button')) {
            createConfirmModal(() => deleteTodo(todoId));
        } else if (e.target.matches('.todo-check')) {
            toggleTodo(todoId);
        }
    });

    $toggleAllBtn.addEventListener('click', toggleAllTodos);

    render();

}