import { Component, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from 'express';
import { User } from '../../../../types';

@Component({
  selector: 'app-admin-show-dialog',
  standalone: true,
  imports: [],
  templateUrl: './admin-show-dialog.component.html',
  styleUrl: './admin-show-dialog.component.css'
})
export class AdminShowDialogComponent {
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { owner: User }
  ) {}



  ngOnInit(): void {
    console.log(this.data.owner.email);
    console.log(this.data.owner._id);

    
  }

  loadUser(): void {

}
}
