import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/web-socket.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../../entities/Message';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs';
import { Room } from '../../../entities/Room';
import { RoomService } from '../../services/room.service';
import { formatInput, reorderedItems } from '../../utils/utils';
import { environment } from '../../../environments/environment';

const DEFAULT_ROOM: Room = { id: 0, name: '' };

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  userCount?: number;
  selectedRoom: Room = DEFAULT_ROOM; // Selected room object
  rooms: Room[] = []; // List of available rooms

  private page: number = 0;
  private size: number = 20;
  private subscriptions: Subscription[] = [];

  constructor(
    private websocketService: WebsocketService,
    private messageService: MessageService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = reorderedItems(rooms, environment.defaultRoom);
      this.selectedRoom = this.rooms[0];
      this.loadMessages();
      this.websocketService.setRoomId(this.selectedRoom.id); // Inform the service about the initial room ID
    });

    this.subscriptions.push(
      this.websocketService.messages$
        .pipe()
        // tap((message) => console.log('Received message:', message))
        .subscribe((message) => {
          this.messages = [message, ...this.messages];
        })
    );

    this.subscriptions.push(
      this.websocketService.userCount$
        .pipe
        // tap((userCount) => console.log('Received user count:', userCount))
        ()
        .subscribe((userCount) => {
          this.userCount = userCount;
        })
    );

    this.subscriptions.push(
      this.websocketService.roomsList$.subscribe((room) => {
        const tempRooms = [...this.rooms, room].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        this.rooms = reorderedItems(tempRooms, environment.defaultRoom);
      })
    );
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  messageForm = new FormGroup({
    sender: new FormControl('', [Validators.required, Validators.minLength(1)]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  get sender() {
    return this.messageForm.get('sender');
  }

  get content() {
    return this.messageForm.get('content');
  }

  onSubmit() {
    if (this.messageForm.valid) {
      this.sendMessage();

      this.messageForm.patchValue({
        content: '',
      });
    }
  }

  roomChanged(room: Room): void {
    this.selectedRoom = room;
    this.messages = [];
    this.loadMessages();
    // Whenever the user selects a different room, inform the WebsocketService about the new room ID
    this.websocketService.setRoomId(this.selectedRoom.id);
  }

  sendMessage(): void {
    const sender = this.messageForm.get('sender')?.value;
    const content = this.messageForm.get('content')?.value;

    if (sender && content) {
      this.websocketService.sendMessage({ sender, content } as Message);
    }
  }

  loadMoreMessages(): void {
    this.page++; // Increment page number
    this.loadMessages();
  }

  private loadMessages(): void {
    this.messageService
      .getMessages(this.selectedRoom.id, this.page, this.size)
      .subscribe((messages) => {
        this.messages = [...this.messages, ...messages];
      });
  }

  createGroup(groupName: string) {
    this.websocketService.sendRoomListRequest(formatInput(groupName));
  }
}
