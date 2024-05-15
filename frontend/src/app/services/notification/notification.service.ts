import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, ViewContainerRef, createComponent } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../components/application/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private componentRef: ComponentRef<CustomSnackbarComponent> | null = null;

  constructor(private appRef: ApplicationRef, private injector: Injector) { }

  showMessage(viewContainerRef: ViewContainerRef, message: string, duration: number = 3000) {
    this.createSnackbar(viewContainerRef, message, 'message', duration);
  }

  showError(viewContainerRef: ViewContainerRef, message: string, duration: number = 3000) {
    this.createSnackbar(viewContainerRef, message, 'error', duration);
  }

  showConfirmation(viewContainerRef: ViewContainerRef, message: string, onConfirm: () => void, onCancel: () => void) {
    this.createSnackbar(viewContainerRef, message, 'confirmation', 0);
    this.componentRef?.instance.action.subscribe((action: string) => {
      if (action === 'confirm') {
        onConfirm();
      } else if (action === 'cancel') {
        onCancel();
      }
      this.destroy();
    });
  }

  private createSnackbar(viewContainerRef: ViewContainerRef, message: string, type: 'message' | 'confirmation' | 'error', duration: number) {
    // Destroy any existing snackbar before creating a new one
    if (this.componentRef) {
      this.destroy();
    }

    // Create component dynamically
    this.componentRef = createComponent(CustomSnackbarComponent, {
      environmentInjector: this.appRef.injector
    });

    // Set component properties
    this.componentRef.instance.message = message;
    this.componentRef.instance.type = type;
    this.componentRef.instance.duration = duration;

    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.componentRef.hostView);

    // Get DOM element from component
    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;

    // Append DOM element to the body
    document.body.appendChild(domElem);

    if (type !== 'confirmation') {
      setTimeout(() => {
        this.destroy();
      }, duration);
    }
  }

  destroy() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}