import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmOptions } from '../shared/models/confirm-options.model';

@Injectable({
  providedIn: 'root'
})
export class CustomConfirmationService {

  constructor() { }
  private confirmationService = inject(ConfirmationService)

   private readonly defaultConfig = {
    icon: 'pi pi-question-circle',
    position: 'center' as const,
    acceptLabel: 'Aceptar',
    rejectLabel: 'Rechazar',
    severity: 'info' as const,
    dismissableMask: true,
    rejectVisible: false
  };
  
  show(options: ConfirmOptions): void {
    this.confirmationService.confirm({
      header: options.header,
      message: options.message,
      icon: options.icon ?? this.defaultConfig.icon,
      position: options.position ?? this.defaultConfig.position,
      acceptLabel: options.acceptLabel ?? this.defaultConfig.acceptLabel,
      rejectLabel: options.rejectLabel ?? this.defaultConfig.rejectLabel,
      acceptButtonStyleClass: `p-button-sm confirm-${options.severity ?? this.defaultConfig.severity}`,
      rejectButtonStyleClass: 'p-button-sm p-button-text',
      dismissableMask: this.defaultConfig.dismissableMask,
      rejectVisible: options.visibleButton ?? this.defaultConfig.rejectVisible,
      accept: options.onAccept,
      reject: options.onReject
    });
  }

   showDelete(message: string, onConfirm: () => void): void {
    this.show({
      header: 'Confirmar eliminación',
      message,
      icon: 'pi pi-exclamation-triangle',
      severity: 'danger',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      visibleButton: true,
      onAccept: onConfirm
    });
  }
  showWarning(message: string, onConfirm: () => void): void {
    this.show({
      header: 'Advertencia',
      message,
      icon: 'pi pi-exclamation-triangle',
      severity: 'warn',
      acceptLabel: 'Continuar',
      rejectLabel: 'Cancelar',
      visibleButton: true,
      onAccept: onConfirm
    });
  }
  showSuccess(message: string, onConfirm?: () => void): void {
    this.show({
      header: 'Confirmación',
      message,
      icon: 'pi pi-check-circle',
      severity: 'success',
      acceptLabel: 'Aceptar',
      visibleButton: false,
      onAccept: onConfirm
    });
  }
   showInfo(message: string, onConfirm?: () => void): void {
    this.show({
      header: 'Información',
      message,
      icon: 'pi pi-info-circle',
      severity: 'info',
      acceptLabel: 'Entendido',
      visibleButton: false,
      onAccept: onConfirm
    });
  }
}
