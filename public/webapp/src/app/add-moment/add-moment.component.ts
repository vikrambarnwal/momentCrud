import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.css'],
})
export class AddMomentComponent implements OnInit {
  @ViewChild('momentPic') momentPic: ElementRef;
  imgSrc:string | ArrayBuffer ='./../../assets/images/default.jpg';
  form: FormGroup;

  constructor(public router: Router, private apiService: UserService,
    public fb: FormBuilder) {
    this.form = this.fb.group({
      comment: ['', Validators.required],
      tags: ['', Validators.required],
      momentPic:[null]
    });
  }

  ngOnInit() {}

  addMoment() {
    const formData = new FormData();
    for (const key in this.form.value) {
      formData.append(key, this.form.value[key]);
    }
    this.apiService.addMoment(formData).subscribe(
      (data) => {
        alert('Moment Added Successfully');
        this.router.navigate(['/listmoment']);
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }

  uploadFile(event) {
    const file = event.target.files[0] as File;
    this.form.get('momentPic').setValue(file);
    this.form.get('momentPic').updateValueAndValidity();

    const reader = new FileReader();
        reader.onload = e => this.imgSrc = reader.result;
        reader.readAsDataURL(file);
  }
}
