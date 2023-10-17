import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
})
export class CreateGroupComponent {
  @Output() createGroupEmitter = new EventEmitter<string>();
  showNewGroupInput = false;

  switchShowNewGroupInput(): void {
    this.createGroupForm.reset();
    this.showNewGroupInput = !this.showNewGroupInput;
  }

  createGroup(): void {
    if (this.createGroupForm.valid) {
      const createGroupName = this.createGroupForm.get('groupName')?.value;
      createGroupName && this.createGroupEmitter.emit(createGroupName);
      this.switchShowNewGroupInput();
    }
  }

  createGroupForm = new FormGroup({
    groupName: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  get groupName() {
    return this.createGroupForm.get('groupName');
  }
}
