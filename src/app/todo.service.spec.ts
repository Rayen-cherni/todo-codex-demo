import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('adds todos and persists them', () => {
    service.addTodo('Ship Angular starter');

    expect(service.todos()).toHaveLength(1);
    expect(service.todos()[0].title).toBe('Ship Angular starter');
    expect(JSON.parse(localStorage.getItem('todo-demo-codex.todos') ?? '[]')).toHaveLength(1);
  });

  it('toggles and deletes todos', () => {
    service.addTodo('Write tests');
    const todoId = service.todos()[0].id;

    service.toggleTodo(todoId);
    expect(service.todos()[0].completed).toBe(true);

    service.deleteTodo(todoId);
    expect(service.todos()).toHaveLength(0);
  });
});
