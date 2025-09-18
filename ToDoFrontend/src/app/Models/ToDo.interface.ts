export interface ToDo {
  id:          number;
  title:       string;
  description: string;
  estado:      number;
  priority:    number;
  dueDate:     Date;
  created_at:  Date;
  updated_at:  Date;
}

export interface NewToDo {
  id?:          number;
  title:       string;
  description: string;
  estado:      number;
  priority:    number;
  dueDate:     Date | string;
  created_at?:  Date;
  updated_at?:  Date;
}
