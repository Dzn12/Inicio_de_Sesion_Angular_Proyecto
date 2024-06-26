
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from './usuer.model'; // Asegúrate de ajustar la ruta correctamente
import { Capitulo } from './capitulo.model';
import { Obra } from './book.model';
import { Genero } from './genero.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  //private apiUrl = 'http://10.118.2.216:8000';
  private apiUrl = 'http://127.0.0.1:8000';

  private tokenKey = 'authToken'; // Define una clave para el token en el localStorage

  constructor(private http: HttpClient) { }

// Obra

  getObraById(id: number): Observable<Obra> {
    return this.http.get<Obra>(`${this.apiUrl}/api/obra/${id}`).pipe(
      catchError(this.handleError<Obra>('getObraById'))
    );
    }


  getGenerosByObraId(id: number): Observable<Genero[]> {
    return this.http.get<Genero[]>(`${this.apiUrl}/obra/${id}/generos`);
  }
  

  // Método para buscar libros por título
  searchBooksByTitle(titulo: string): Observable<Obra[]> {
    const url = `${this.apiUrl}/obra/busqueda/${titulo}`;
    return this.http.get<Obra[]>(url);
  }


// Método para obtener obras por género
getObrasByGenero(generoId: number): Observable<Obra[]> {
  const url = `${this.apiUrl}/generos/${generoId}`; // Endpoint en el backend Symfony
  return this.http.get<Obra[]>(url);
}

  


// Usuario

  registerUser(usuario: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/usuario/registro`, usuario).pipe(
      catchError(this.handleError<any>('registerUser'))
    );  
  }

  loginUser(usuario: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/usuario/login`, usuario).pipe(
      catchError(this.handleError<any>('loginUser'))
    );
  }

  // Método para guardar el token en el localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }


  // Método para obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/usuario/${userId}`).pipe(
      catchError(this.handleError<User>('getUser'))
    );
  }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/usuarios`).pipe(
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }
   

  
 updateUser(email: string, name: string, pswd: string): Observable<any> {
  const body = { name, pswd }; // Crear el cuerpo de la petición directamente como un objeto
 
  return this.http.put(`${this.apiUrl}/api/usuario/editar/${email}`, body).pipe(
    catchError(this.handleError<any>('updateUser'))
  );
}

deleteUser(userId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/api/usuarios/${userId}`).pipe(
    catchError(this.handleError<any>('deleteUser'))
  );
}

  getCapitulo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/capitulos/${id}`).pipe(
      catchError(this.handleError<any>('getCapitulo'))
    );
  }
  
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}