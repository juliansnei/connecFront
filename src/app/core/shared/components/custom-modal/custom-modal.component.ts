import { Component, effect, input, output, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CustomConfigModal } from '../../models/custom-config-moda.model';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-custom-modal',
  imports: [DialogModule,CheckboxModule,CommonModule,FormsModule,ButtonModule],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.css'
})
export class CustomModalComponent {

  visible = input<boolean>(false);
  visibleChange = output<boolean>();
  isModal = input<boolean>(true);
  position = input<'center' | 'right' | 'left'>('center')
  shiftLeft=input<boolean>(false);
  config = input<CustomConfigModal>();
  

  public constructor(){
    this.effectInitonfig();
  }


  onGuardar = output<number[]>(); // Emite los IDs seleccionados

  // Estado local: objeto que guarda qué items están seleccionados
  // Por ejemplo: { 1: true, 2: false, 3: true }
  itemsSeleccionados: { [key: number]: boolean } = {};

  // Método que se llama al hacer click en el botón extra
  accionBotonExtra(item: any) {
    console.log('Botón extra clickeado para:', item.nombre);
    // Aquí puedes hacer lo que necesites con ese item
    alert(`Editar: ${item.nombre}`);
  }

  // Método para cerrar el diálogo
  cerrarDialog() {
    this.visibleChange.emit(false);
  }

  // Método para guardar la selección
  guardarSeleccion() {
    // Obtener solo los IDs que están seleccionados (checked = true)
    const idsSeleccionados = Object.keys(this.itemsSeleccionados)
      .map(id => Number(id)) // Convertir a número
      .filter(id => this.itemsSeleccionados[id] === true); // Solo los que son true

    console.log('IDs seleccionados:', idsSeleccionados);
    
    // Emitir los IDs seleccionados al componente padre
    this.onGuardar.emit(idsSeleccionados);
  }
    
    private effectInitonfig(){
      effect(() => {
        const config = this.config();
        if(!config) return;

        const selectedIds = config.selectedIds ?? [];
        const listData = config.listData  ?? [];

        //clonado el estado 
        this.itemsSeleccionados = {};
        listData.forEach( item => {
          this.itemsSeleccionados[item.id] = selectedIds.includes(item.id)
        })
      })
    }

}
