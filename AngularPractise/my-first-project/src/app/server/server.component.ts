import { Component } from '@angular/core';

@Component({
  selector: 'ServerComponent',
  templateUrl: './server.component.html',
})
export class ServerComponent {
  firstname: string = 'saddam';
  lastname = 'kouthalam';
  age: number = 23;

  getFullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  enteredtxt = '';
  enteredText(event: any) {
      this.enteredtxt = event.target.value;
  }
}
