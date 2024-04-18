import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/owner/user.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from 'express';
import { User } from '../../../../../types';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-show-dialog',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './admin-show-dialog.component.html',
  styleUrl: './admin-show-dialog.component.css'
})
export class AdminShowDialogComponent implements OnInit{
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
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
