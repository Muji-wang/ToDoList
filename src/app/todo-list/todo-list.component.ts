import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface TodoItem {
  task: string;
  email: string;
  completed: boolean;
  editing: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoForm: FormGroup;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.todoForm = this.fb.group({
      newTodo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      todos: this.fb.array([])
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['todos']) {
        const todos: TodoItem[] = JSON.parse(params['todos']);
        while (this.todosArray.length) {
          this.todosArray.removeAt(0);
        }
        todos.forEach(todo => {
          this.todosArray.push(
            this.fb.group({
              task: [todo.task, [Validators.required]],
              email: [todo.email, [Validators.required, Validators.pattern(this.emailPattern)]],
              completed: [todo.completed],
              editing: [false]
            })
          );
        });
      }
    });

    this.todoForm.valueChanges.subscribe(() => {
      if (!this.todosArray.controls.some(control => control.get('editing')?.value)) {
        this.updateUrlState();
      }
    });
  }

  get todosArray() {
    return this.todoForm.get('todos') as FormArray;
  }

  private updateUrlState() {
    const todos = this.todosArray.value.map((todo: TodoItem) => ({
      task: todo.task,
      email: todo.email,
      completed: todo.completed,
      editing: false
    }));

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { todos: JSON.stringify(todos) },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  addTodo() {
    const newTodoControl = this.todoForm.get('newTodo');
    const emailControl = this.todoForm.get('email');
    
    if (newTodoControl?.valid && emailControl?.valid) {
      this.todosArray.push(
        this.fb.group({
          task: [newTodoControl.value, [Validators.required]],
          email: [emailControl.value, [Validators.required, Validators.pattern(this.emailPattern)]],
          completed: [false],
          editing: [false]
        })
      );
      newTodoControl.reset('');
    }
  }

  deleteTodo(index: number) {
    this.todosArray.removeAt(index);
  }

  toggleEdit(index: number) {
    const todo = this.todosArray.at(index);
    const isEditing = todo.value.editing;

    // 只在點擊「編輯」時切換編輯狀態
    this.todosArray.controls.forEach((todoControl, i) => {
      if (i === index && !isEditing) {
        todoControl.patchValue({ editing: true });
      }
    });
  }

  saveEdit(index: number) {
    const todo = this.todosArray.at(index);
    const taskControl = todo.get('task');
    const emailControl = todo.get('email');
    
    if (taskControl?.valid && emailControl?.valid) {
      todo.patchValue({ editing: false });
      this.updateUrlState(); 
    } else {
      taskControl?.markAsTouched();
      emailControl?.markAsTouched();
    }
  }

  cancelEdit(index: number) {
    const todo = this.todosArray.at(index);
    // 取得原始數據
    const originalValue = this.route.snapshot.queryParams['todos'] ? 
      JSON.parse(this.route.snapshot.queryParams['todos'])[index] : null;
      
    if (originalValue) {
      // 恢復原始數據
      todo.patchValue({
        task: originalValue.task,
        email: originalValue.email,
        editing: false
      });
    } else {
      todo.patchValue({ editing: false });
    }
    this.updateUrlState();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.todoForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.todoForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return fieldName === 'email' ? 'Email 為必填' : '任務欄位為必填';
      }
      if (field.errors['pattern']) {
        return '請輸入有效的 Email 格式';
      }
    }
    return '';
  }
}
