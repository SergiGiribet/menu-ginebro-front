import { Component, EventEmitter, Inject, Output, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../Services/Alert/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bulk-upload-modal',
  templateUrl: './bulk-upload-modal.component.html',
  styleUrls: ['./bulk-upload-modal.component.css'],
  imports: [CommonModule],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class BulkUploadModalComponent {
  selectedFile: File | null = null;

  constructor(
    private dialogRef: MatDialogRef<BulkUploadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { plantillaUrl: string, descripcion: string },
    private alertService: AlertService
  ) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) this.selectedFile = file;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.selectedFile = event.dataTransfer?.files?.[0] || null;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.alertService.show('warning', 'Has de seleccionar un json vàlid', '', 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        this.dialogRef.close(jsonData); // <-- Retorna JSON al componente padre
      } catch {
        this.alertService.show('error', 'El fitxer no és un JSON vàlid', '', 3000);
      }
    };
    reader.readAsText(this.selectedFile);
  }

  close(): void {
    this.dialogRef.close();
  }
}
