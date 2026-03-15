import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';

type TodoPageCopyKey =
  | 'heroBadge'
  | 'languageLabel'
  | 'heroTitle'
  | 'heroDescription'
  | 'remainingLabel'
  | 'completedLabel'
  | 'totalLabel'
  | 'todoTitleLabel'
  | 'todoPlaceholder'
  | 'addTodoButton'
  | 'allFilterButton'
  | 'activeFilterButton'
  | 'completedFilterButton'
  | 'toggleTodoAriaLabel'
  | 'deleteTodoButton'
  | 'emptyStateTitle'
  | 'emptyStateDescription';

const TODO_PAGE_COPY: Record<'en' | 'fr', Record<TodoPageCopyKey, string>> = {
  en: {
    heroBadge: 'Angular starter',
    languageLabel: 'Language',
    heroTitle: 'Plan your day with a fast, local-first todo board.',
    heroDescription:
      'Standalone Angular components, signal-based state, Tailwind styling, and browser persistence. No backend required.',
    remainingLabel: 'Remaining',
    completedLabel: 'Completed',
    totalLabel: 'Total',
    todoTitleLabel: 'Todo title',
    todoPlaceholder: 'Add a task that matters',
    addTodoButton: 'Add todo',
    allFilterButton: 'All',
    activeFilterButton: 'Active',
    completedFilterButton: 'Completed',
    toggleTodoAriaLabel: 'Toggle',
    deleteTodoButton: 'Delete',
    emptyStateTitle: 'Nothing here yet.',
    emptyStateDescription: 'Add your first todo to start tracking tasks in this browser.'
  },
  fr: {
    heroBadge: 'Demarrage Angular',
    languageLabel: 'Langue',
    heroTitle: 'Planifiez votre journee avec un tableau de taches rapide et local.',
    heroDescription:
      'Composants Angular standalone, etat base sur les signaux, styles Tailwind et sauvegarde dans le navigateur. Aucun backend requis.',
    remainingLabel: 'Restantes',
    completedLabel: 'Terminees',
    totalLabel: 'Total',
    todoTitleLabel: 'Titre de la tache',
    todoPlaceholder: 'Ajoutez une tache importante',
    addTodoButton: 'Ajouter',
    allFilterButton: 'Toutes',
    activeFilterButton: 'Actives',
    completedFilterButton: 'Terminees',
    toggleTodoAriaLabel: 'Basculer',
    deleteTodoButton: 'Supprimer',
    emptyStateTitle: 'Aucune tache pour le moment.',
    emptyStateDescription: 'Ajoutez votre premiere tache pour commencer a la suivre dans ce navigateur.'
  }
};

@Component({
  selector: 'app-todo-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-page.component.html'
})
export class TodoPageComponent {
  private readonly localeId = inject(LOCALE_ID);

  readonly todoService = inject(TodoService);
  readonly draftTitle = signal('');
  readonly isFrench = computed(() => this.localeId.startsWith('fr') || this.getPathname().startsWith('/fr'));
  readonly englishHref = '/';
  readonly frenchHref = '/fr';
  readonly copy = computed(() => (this.isFrench() ? TODO_PAGE_COPY.fr : TODO_PAGE_COPY.en));

  submitTodo(): void {
    this.todoService.addTodo(this.draftTitle());
    this.draftTitle.set('');
  }

  trackByTodoId(_: number, todo: { id: string }): string {
    return todo.id;
  }

  private getPathname(): string {
    return typeof window === 'undefined' ? '/' : window.location.pathname;
  }
}
