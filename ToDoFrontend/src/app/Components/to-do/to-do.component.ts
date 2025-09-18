import { Component, OnInit } from '@angular/core';
import { NewToDo, ToDo } from '../../Models/ToDo.interface';
import { ToDoService } from '../../Services/to-do.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-to-do',
  imports: [CommonModule, FormsModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export default class ToDoComponent implements OnInit {

  constructor(private toDoService: ToDoService) { }

  toDo: ToDo[] = [];

  modal: boolean = false;

  taskEditingId: number | null = null;

  edit(id: number) {
    this.taskEditingId = id;
  }

  closeEditModal() {
    this.taskEditingId = null;
  }

  showModal() {
    this.modal = !this.modal;
  }

  newToDo: NewToDo = {
    title: '',
    description: '',
    estado: 0,
    priority: 3,
    dueDate: ''
  };

  getPriorityLabel(priority: number): string {
    const labels: { [key: number]: string } = {
      1: 'Baja',
      2: 'Media',
      3: 'Normal',
      4: 'Alta',
      5: 'Muy alta'
    };
    return labels[priority] || 'Desconocida';
  }


  //Crud methods

  getAll() {
    this.toDoService.getAll().subscribe({
      next: (toDo: ToDo[]) => {
        console.log("Tareas obtenidas", toDo);
        this.toDo = toDo;
      }
    });
  }

  create() {
    this.toDoService.create(this.newToDo).subscribe({
      next: (response) => {
        console.log("Tarea creada exitosamente.", response);
        this.getAll();
        this.modal = !this.modal;
        this.resetForm();
        window.alert("Tarea creada con éxito.");
      },
      error: (err) => {
        console.error("Error al crear tarea", err);
      }
    })
  }

  update(toDo: ToDo, id: number) {
    this.toDoService.update(toDo, id).subscribe({
      next: (response) => {
        console.log("Tarea actualizada con exito", response);
        window.alert("Tarea actualizada.");
        this.getAll();
        this.closeEditModal();
      },
      error: (err) => {
        console.error("Error al actualizar la tarea", err);
      }
    })
  }

  delete(id: number) {
    this.toDoService.delete(id).subscribe({
      next: (response) => {
        console.log("Tarea eliminada con exito.", response);
        window.alert("Tarea eliminada con éxito.");
        this.getAll();

      },
      error: (err) => {
        console.error("Error al eliminar la tarea.", err);
      }
    })
  }

  endToDo(toDo: ToDo, id: number) {
    this.toDoService.endToDo(!toDo.estado, id).subscribe({
      next: (response) => {
        console.log("Tarea finalizada.", response);
        window.alert("Tarea finalizada.");
        this.getAll();

      },
      error: (err) => {
        console.error("Error al finalizar la tarea", err);
      }
    })
  }

  confirmDelete(): boolean {
    return window.confirm("¿Desea eliminar la tarea?");
  }


  resetForm() {
    this.newToDo = {
      title: '',
      description: '',
      estado: 0,
      priority: 3,
      dueDate: ''
    };
  }


  ngOnInit(): void {
    this.getAll();
  }

}
