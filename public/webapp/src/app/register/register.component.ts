import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    public router: Router,
    private apiService: UserService,
    public fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  ngOnInit() {}

  register() {
    if (this.userForm.valid) {
      this.apiService.addUser(this.userForm.value).subscribe(
        (data) => {
          alert('User Registration Successfully');
          this.router.navigate(['/login']);
        },
        (err) => {
          alert(err.error.message);
        });
    }else{
      return;
    }
  }

}
