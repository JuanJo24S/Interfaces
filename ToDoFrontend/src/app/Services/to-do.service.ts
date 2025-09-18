import { Injectable } from '@angular/core';
import { NewToDo, ToDo } from '../Models/ToDo.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http: HttpClient) { }

  private url = `${environment.apiUrl}/to-do`;

  getAll(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.url}`);
  }

  create(newTodo: NewToDo) {
    return this.http.post<NewToDo>(`${this.url}/create`, newTodo).pipe(
      tap((response) => {
        console.log("Tareacreada con exito" + response);
      }),
      catchError((error) => {
        console.error("Error al crear la tarea;");
        return throwError(() => error);
      })
    )
  }

  update(toDo: ToDo, id: number) {
    return this.http.put<ToDo>(`${this. url}/update/${id}`, toDo).pipe(
      tap((response) => {
        console.log("Tarea actualizada con exito." + response)
      }),
      catchError((error) => {
        console.log("Error al obtener productos");
        return throwError(() => error);
      })
    )
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`).pipe(
      tap((response) => {
        console.log('Tarea eliminada con exito,' + response);
      }),
      catchError((error) => {
        console.error('Error eliminando tarea:', error);
        return throwError(() => error);
      })
    );
  }

  endToDo(estado: boolean, id: number) {
    return this.http.put<any>(`${this.url}/end/${id}`, { estado }).pipe(
      tap((response) => {
        console.log('Tarea terminada con éxito:', response);
      }),
      catchError((error) => {
        console.error('Error al terminar la tarea:', error);
        return throwError(() => error);
      })
    );
  }

}
