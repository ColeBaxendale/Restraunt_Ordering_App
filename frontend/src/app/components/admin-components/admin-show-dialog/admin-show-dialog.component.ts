import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { User } from '../../../../../types';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-show-dialog',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './admin-show-dialog.component.html',
  styleUrl: './admin-show-dialog.component.css',
})
export class AdminShowDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { owner: User }
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    console.log(this.data.owner.email);
    console.log(this.data.owner._id);
  }
}
