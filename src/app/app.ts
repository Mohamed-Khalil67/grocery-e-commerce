import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  imports: [RouterOutlet, NgxSpinnerComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
