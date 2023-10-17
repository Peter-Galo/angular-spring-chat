import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Stomp, StompSubscription } from '@stomp/stompjs';
import { Message } from '../../entities/Message';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Room } from '../../entities/Room';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private readonly stompClient;
  private messagesSubject = new Subject<Message>();
  private userCountSubject = new Subject<number>();
  private roomsListSubject = new Subject<Room>();

  messages$ = this.messagesSubject.asObservable();
  userCount$ = this.userCountSubject.asObservable();
  roomsList$ = this.roomsListSubject.asObservable();

  private currentMessageSubscription: StompSubscription | undefined; // To store the current message subscription

  private currentRoomId: Number = 1; // Default or initial room ID

  // Method to set a new room ID and adjust the subscriptions accordingly
  setRoomId(newRoomId: Number): void {
    this.currentRoomId = newRoomId;
    this.subscribeToMessages(); // Re-subscribe to adapt to the new room ID
  }

  constructor() {
    const ws = new SockJS(environment.websocketUrl);
    this.stompClient = Stomp.over(ws);
    this.connect();
  }

  private connect(): void {
    this.stompClient.connect(
      {},
      this.initializeSubscriptions,
      this.errorCallback
    );
  }

  private initializeSubscriptions = (): void => {
    this.subscribeToMessages();
    this.subscribeToUserCount();
    this.subscribeToRoomsList();
    // Trigger an initial user count request once subscriptions are ready.
    this.sendUserCountRequest();
  };

  private errorCallback(error: string): void {
    console.error('STOMP error:', error);
  }

  disconnect(): void {
    this.stompClient.disconnect(() => console.log('Disconnected'));
  }

  sendMessage(message: Message): void {
    const tempMessage = {
      ...message,
      timestamp: new Date().toISOString(),
    };
    this.stompClient.send(
      `${environment.sendEndpoint}/${this.currentRoomId}`,
      {},
      JSON.stringify(tempMessage)
    );
  }

  sendUserCountRequest(): void {
    this.stompClient.send(`${environment.sendUserCountEndpoint}`);
  }

  sendRoomListRequest(groupName: string): void {
    this.stompClient.send(`${environment.roomsListEndpoint}`, {}, groupName);
  }

  private subscribeToMessages(): void {
    // Unsubscribe from the current subscription if it exists
    if (this.currentMessageSubscription) {
      this.currentMessageSubscription.unsubscribe();
    }

    // Subscribe to the new topic and store the subscription object
    this.currentMessageSubscription = this.stompClient.subscribe(
      `${environment.messageTopic}/${this.currentRoomId}`,
      (messageOutput) => {
        this.messagesSubject.next(JSON.parse(messageOutput.body));
      }
    );
  }

  private subscribeToUserCount(): void {
    this.stompClient.subscribe(
      environment.userCountTopic,
      (userCountOutput) => {
        this.userCountSubject.next(+JSON.parse(userCountOutput.body));
      }
    );
  }

  private subscribeToRoomsList(): void {
    this.stompClient.subscribe(environment.roomsListTopic, (room) => {
      console.log(JSON.parse(room.body));
      this.roomsListSubject.next(JSON.parse(room.body));
    });
  }
}
