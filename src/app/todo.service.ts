import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, isDevMode, signal } from '@angular/core';
import { Todo, TodoFilter } from './todo.model';

const STORAGE_KEY = 'todo-demo-codex.todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly todosState = signal<Todo[]>(this.loadTodos());
  private readonly filterState = signal<TodoFilter>('all');

  readonly todos = this.todosState.asReadonly();
  readonly filter = this.filterState.asReadonly();
  readonly filteredTodos = computed(() => {
    const filter = this.filterState();
    const todos = this.todosState();

    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  });

  readonly remainingCount = computed(() => this.todosState().filter((todo) => !todo.completed).length);
  readonly completedCount = computed(() => this.todosState().filter((todo) => todo.completed).length);

  addTodo(title: string): void {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    this.todosState.update((todos) => [
      {
        id: this.generateId(),
        title: trimmedTitle,
        completed: false,
        createdAt: new Date().toISOString()
      },
      ...todos
    ]);
    this.persistTodos();
  }

  toggleTodo(id: string): void {
    this.todosState.update((todos) =>
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed
            }
          : todo
      )
    );
    this.persistTodos();
  }

  deleteTodo(id: string): void {
    this.todosState.update((todos) => todos.filter((todo) => todo.id !== id));
    this.persistTodos();
  }

  setFilter(filter: TodoFilter): void {
    this.filterState.set(filter);
  }

  private loadTodos(): Todo[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }

    const rawTodos = localStorage.getItem(STORAGE_KEY);

    if (!rawTodos) {
      return [];
    }

    try {
      const parsedTodos = JSON.parse(rawTodos) as Todo[];
      return Array.isArray(parsedTodos) ? parsedTodos : [];
    } catch {
      if (isDevMode()) {
        console.warn('Unable to parse persisted todos.');
      }
      return [];
    }
  }

  private persistTodos(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todosState()));
  }

  private generateId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}
