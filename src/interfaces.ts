interface ITodo {
  id: string,
  title: string,
  completed: boolean
}

interface ITodoItemProps {
  key: string,
  todo: ITodo;
  editing?: boolean;
  onSave: (val: any) => void;
  onDestroy: () => void;
  onEdit: () => void;
  onCancel: (event: any) => void;
  onToggle: () => void;
}

interface ITodoItemState {
  editText: string
}

interface ITodoFooterProps {
  completedCount: number;
  onClearCompleted: any;
  nowShowing?: string;
  count: number;
}


interface ITodoModel {
  key: any;
  todos: ITodo[];
  onChanges: any[];

  subscribe(onChange: any): void;

  inform(): void;

  addTodo(title: string): void;

  toggleAll(checked: any): void;

  toggle(todoToToggle: any): void;

  destroy(todo: any): void;

  save(todoToSave: any, text: any): void;

  clearCompleted(): void;
}

interface IAppProps {
  model: ITodoModel;
}

interface IAppState {
  editing: string | null;
  nowShowing?: string;
  values: {
    newTodo: string;
  };
}
