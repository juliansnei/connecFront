import { Component } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-custom-confirm',
  imports: [ConfirmDialogModule],
  templateUrl: './custom-confirm.component.html',
  styleUrl: './custom-confirm.component.css'
})
export class CustomConfirmComponent {

}
