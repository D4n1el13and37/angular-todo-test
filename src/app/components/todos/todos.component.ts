import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  inputTitle: string = '';
  inputTodo: string = '';
  editingIndex: number | null = null;
  editingTitle: string = '';
  editingContent: string = '';

  constructor() {}

  ngOnInit(): void {
    this.todos = [
      {
        title: 'Monday',
        content: 'First todo',
        completed: false,
      },
      {
        title: 'Monday',
        content: 'Second todo',
        completed: true,
      },
    ];
  }

  isValidInput(title: string, content: string): boolean {
    return title.trim().length > 2 && content.trim().length > 2;
  }

  toggleDone(id: number) {
    this.todos.map((value, index) => {
      if (index == id) value.completed = !value.completed;
      return value;
    });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((value, index) => index != id);
    this.editingIndex = null;
  }

  addTodo() {
    if (!this.isValidInput(this.inputTitle, this.inputTodo)) {
      alert('Заголовок и задача должны быть длинне 2-х символов');
      return;
    }

    this.todos.push({
      title: this.inputTitle,
      content: this.inputTodo,
      completed: false,
    });

    this.inputTodo = '';
    this.inputTitle = '';
  }

  startEditing(index: number) {
    this.editingIndex = index;
    this.editingTitle = this.todos[index].title;
    this.editingContent = this.todos[index].content;
  }

  saveEditing(index: number) {
    if (!this.isValidInput(this.editingTitle, this.editingContent)) {
      alert('Заголовок и задача должны быть длинне 2-х символов');
      return;
    }
    if (this.editingIndex !== null) {
      this.todos[index].title = this.editingTitle;
      this.todos[index].content = this.editingContent;

      this.editingIndex = null;
      this.editingTitle = '';
      this.editingContent = '';
    }
  }
}
