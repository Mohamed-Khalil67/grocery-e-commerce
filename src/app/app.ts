import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { ToastsComponent } from './shared/ui/toasts/toasts.component';

@Component({
  imports: [RouterOutlet, NgxSpinnerComponent, ToastsComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
