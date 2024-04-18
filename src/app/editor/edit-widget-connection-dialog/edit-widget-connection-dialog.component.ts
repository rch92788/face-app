import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-widget-connection-dialog',
  templateUrl: './edit-widget-connection-dialog.component.html',
  styleUrls: ['./edit-widget-connection-dialog.component.sass']
})
export class EditWidgetConnectionDialog {
  constructor(
    public dialogRef: MatDialogRef<EditWidgetConnectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

}
