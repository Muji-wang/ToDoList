import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  // 用來儲存新任務的輸入值
  newTodo: string = ''; 
  // 儲存待辦事項的陣列，包含任務內容、是否完成和編輯狀態
  todos: { task: string, completed: boolean, editing: boolean }[] = [];  

  ngOnInit() {
    // 初始化時從 localStorage 讀取待辦事項
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      // 解析並載入存儲的待辦清單
      this.todos = JSON.parse(savedTodos);  
    }
  }

  addTodo() {
    if (this.newTodo.trim()) {
      const newTask = { task: this.newTodo.trim(), completed: false, editing: false };
      this.todos.push(newTask);
      // 新任務添加後，清空輸入框
      this.newTodo = '';  
      // 每次修改待辦清單後，儲存到 localStorage
      this.saveTodos();  
    }
  }

  deleteTodo(index: number) {
    // 根據索引刪除項目
    this.todos.splice(index, 1);
    // 更新 localStorage
    this.saveTodos(); 
  }
  
  toggleEdit(index: number) {
    this.todos[index].editing = !this.todos[index].editing;  
    // 切換編輯模式
    console.log("開啟編輯模式");
  }

  saveEdit(index: number) {
    // 保存編輯並退出編輯模式
    this.todos[index].editing = false;  
    // 更新 localStorage
    this.saveTodos();  
  }

  updateTask(index: number) {
    if (this.todos[index].task.trim()) {
      // 如果任務內容不為空，保存並退出編輯模式
      this.todos[index].editing = false;  
      // 更新 localStorage
      this.saveTodos();  
      console.log("更新任務： ",this.todos[index].task);
    }
  }

  toggleCompletion(index: number) {
    // 切換完成狀態
    this.todos[index].completed = !this.todos[index].completed; 
    // 更新 localStorage
    this.saveTodos();
    console.log("切換完成狀態");
  }

  private saveTodos() {
    // 將待辦清單儲存到 localStorage
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
