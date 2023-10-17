import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Message } from '../../../../entities/Message';

@Component({
  selector: 'app-messagelist',
  templateUrl: './messagelist.component.html',
  styleUrls: ['./messagelist.component.css'],
})
export class MessagelistComponent {
  @Input() messages: Message[] = [];
  @Output() loadMore = new EventEmitter<void>();
  @ViewChild('scrollableContainer', { static: true })
  private scrollableContainer?: ElementRef;

  onScroll(): void {
    if (this.scrollableContainer) {
      const element = this.scrollableContainer.nativeElement;
      const atBottom =
        element.scrollHeight - element.scrollTop <= element.clientHeight + 5; // Adding some wiggle room

      if (atBottom) {
        console.log('At bottom, loading more...');
        this.loadMore.emit();
      }
    }
  }
}
