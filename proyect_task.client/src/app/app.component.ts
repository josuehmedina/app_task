import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Tarea {
  id: number;
  title: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public tareas: Tarea[] = [];
  nuevaTareaNombre: string = '';
  private apiUrl = 'http://localhost:5232/api/tareas'; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTareas();
  }

  agregarTarea() {
    if (this.nuevaTareaNombre.trim() === '') {
      alert('Ingresa un nombre para la tarea');
      return;
    }

    const nuevaTarea = {
      title: this.nuevaTareaNombre,
      isCompleted: false
    };

    // POST a la API
    this.http.post(this.apiUrl, nuevaTarea).subscribe(
      (tareaGuardada: any) => {
        this.tareas.push(tareaGuardada); // agregar a la lista local
        this.nuevaTareaNombre = ''; // limpiar input
      },
      err => console.error(err)
    );
  }

  getTareas() {
    this.http.get<Tarea[]>(this.apiUrl).subscribe(
      (result) => {
        this.tareas = result;
        console.log(this.tareas);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  actualizarEstatus(tarea: any) {
    const id = tarea.id;

    // Aquí enviamos todos los campos que espera el modelo Tarea
    const tareaActualizada = {
      id: tarea.id,
      title: tarea.title,
      isCompleted: tarea.isCompleted
    };

    this.http.put(`${this.apiUrl}/${id}`, tareaActualizada).subscribe(
      () => console.log(`Tarea ${id} actualizada`),
      err => console.error(err)
    );
  }

  eliminarTarea(id: number) {
    const tarea = this.tareas.find(t => t.id === id);
    if (tarea && window.confirm(`¿Seguro que quieres eliminar "${tarea.title}"?`)) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(
        () => this.tareas = this.tareas.filter(t => t.id !== id),
        err => console.error(err)
      );
    }
  }

  title = 'proyect_task.client';
}
