import { Injectable } from '@angular/core';
import { Message } from '../../entities/Message';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messagesUrl = `${environment.baseUrl}${environment.messagesUrl}`;

  constructor(private http: HttpClient) {}

  getMessages(
    roomId: number,
    page: number,
    size: number
  ): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.messagesUrl}/${roomId}`, {
      params: {
        page: page.toString(),
        pageSize: size.toString(),
      },
    });
  }
}
