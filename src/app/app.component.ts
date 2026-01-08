import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomConfirmComponent } from './core/shared/components/custom-confirm/custom-confirm.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CustomConfirmComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ConnectaFront';
}
