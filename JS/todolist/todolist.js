
import {saveDeletedCount} from './saveDeletedCount .js';

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
    const $filterActive = document.getElementById('filter-active');
    const $filterCompleted = document.getElementById('filter-completed');

// ======== 상태관리 변수 및 상수 ======== //
    const state = {
        todos: [],
        currentFilter: 'all',
    };

// ======== 핵심 로직 함수 정의 ========= //
    function render() {

        let todosToRender = [];

        // 필터에 따라 렌더링할 todo 리스트를 걸러냄
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

        // 기존 ul 내부 비움
        $todoUl.innerHTML = '';

        // 아무 항목도 없고, 전체 필터인 경우 '할 일이 없습니다' 메시지 표시
        /*if (todosToRender.length === 0 && state.currentFilter === 'all') {
            const $li = document.createElement('li');
            $li.classList.add('todo-empty');
            $li.textContent = '할 일이 없습니다';
            $todoUl.append($li);
            return;

            // 필터링된 항목들을 순회하며 li 요소 생성
        todosToRender.forEach(({id, text, completed}) => {
            const $li = document.createElement('li');
            $li.classList.add('todo-item');

            // 완료 여부에 따라 클래스 부여
            if (completed) $li.classList.add('completed');
            else if (!completed && state.currentFilter === 'active') $li.classList.add('active');

            $li.dataset.id = id;
            $li.setAttribute('draggable', 'true');
        }*/
        if (todosToRender.length === 0 && state.currentFilter === 'all') {
            const $li = document.createElement('li');
            $li.classList.add('todo-empty');
            $li.textContent = '할 일이 없습니다';
            $todoUl.append($li);
        } else {
            todosToRender.forEach(({id, text, completed}) => {
                const $li = document.createElement('li');
                $li.classList.add('todo-item');
                if (completed) $li.classList.add('completed');

                $li.dataset.id = id;
                $li.setAttribute('draggable', 'true');


                // 리스트 아이템 구조 설정
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

            // 남은 할 일 개수 표시
            $todosLeftCount.textContent = state.todos.filter(todo => !todo.completed).length.toString();

            // 필터 버튼 UI 업데이트 (선택된 버튼 강조)
            /*document.querySelectorAll('.filters button').forEach(($btn) => {
                if ($btn.id === `filter-${state.currentFilter}`) $btn.classList.add('active');
                else $btn.classList.remove('active');
            });*/
            document.querySelectorAll('.filters button').forEach(($btn) => {
                $btn.classList.toggle('active', $btn.id === `filter-${state.currentFilter}`);
            });
        }

        // ★★★ (수정/추가) 버튼 비활성화 로직 ★★★
        const hasTodos = state.todos.length > 0;
        const hasCompletedTodos = state.todos.some(todo => todo.completed);

        $filterActive.disabled = !hasTodos;
        $filterCompleted.disabled = !hasTodos;
        $toggleAllBtn.disabled = !hasTodos;
        // 완료된 항목 삭제 버튼은 '완료된 항목이 있을 때만' 활성화
        $clearCompletedBtn.disabled = !hasCompletedTodos;
    }

        // 확인 모달을 띄워서 사용자의 확인을 받은 뒤, `onConfirm()`을 실행
        function createConfirmModal(onConfirm) {
            if (document.getElementById('confirmModal')) {
                return;
            }
            const $confirmModal = document.createElement('div');
            $confirmModal.id = 'confirmModal';
            $confirmModal.className = 'modal-overlay-internal';
            $confirmModal.innerHTML = `
      <div class="modal-content">
        <p>정말 완료된 항목을 삭제할까요?</p>
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

        // 완료된 항목만 필터링해서 삭제하고, 삭제 개수를 로컬스토리지에 저장
        function clearCompletedTodos() {
            const deleted = state.todos.filter(todo => todo.completed);
            // 삭제 개수를 로컬에 저장
            saveDeletedCount(deleted.length);
            state.todos = state.todos.filter(todo => !todo.completed);
            render();
        }

        // 새로운 할 일을 목록에 추가하고 다시 렌더링
        function addTodo(newText) {
            state.todos.push({id: Date.now(), text: newText, completed: false});
            render();
        }

        // 특정 ID를 가진 할 일을 목록에서 제거하고 다시 렌더링
        function deleteTodo(targetId) {
            state.todos = state.todos.filter(todo => todo.id !== targetId);
            render();
        }

        // 특정 할 일의 완료 상태를 토글(완료 ↔ 미완료)하고 렌더링
        function toggleTodo(targetId) {
            state.todos = state.todos.map(todo =>
                todo.id === targetId ? {...todo, completed: !todo.completed} : todo
            );
            render();
        }

        // 모든 할 일을 한 번에 완료/미완료 상태로 토글
        function toggleAllTodos() {
            if (state.todos.length === 0) return;
            const allCompleted = state.todos.every(todo => todo.completed);
            state.todos = state.todos.map(todo => ({...todo, completed: !allCompleted}));
            render();
        }

        let draggedElement = null;

        // 드래그 앤 드롭 기능을 위해 할 일 항목에 필요한 이벤트를 부착
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
        // 투두리스트 패널을 열거나 닫는 토글 버튼
        $todoToggleBtn.addEventListener('click', e => {
            const isOpen = $todoList.classList.toggle('show');
            $todoToggleBtn.style.right = isOpen ? '400px' : '0';
        })

        // 필터 버튼 클릭 시 필터 상태를 변경하고 렌더링
        $filters.addEventListener('click', e => {
            if (!e.target.matches('button')) return;
            const buttonId = e.target.id;
            state.currentFilter = buttonId.substring(buttonId.indexOf('-') + 1);
            render();
        });

        // 완료된 항목을 모두 삭제할지 확인하는 모달 띄움
        $clearCompletedBtn.addEventListener('click', e => {
            createConfirmModal(clearCompletedTodos);
        });

        // 새로운 할 일을 입력하면 등록하고 인풋을 초기화
        $todoForm.addEventListener('submit', e => {
            e.preventDefault();
            const newTodoText = $todoInput.value.trim();
            if (newTodoText) addTodo(newTodoText);
            $todoInput.value = '';
            $todoInput.focus();
        });

        // 체크박스 클릭 시 완료 상태 변경, 삭제 버튼 클릭 시 삭제 모달 표시
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

        // 모든 할 일을 한 번에 체크/해제
        $toggleAllBtn.addEventListener('click', toggleAllTodos);

        render();

    }
