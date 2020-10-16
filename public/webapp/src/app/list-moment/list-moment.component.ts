import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list-moment',
  templateUrl: './list-moment.component.html',
  styleUrls: ['./list-moment.component.css']
})

export class ListMomentComponent implements OnInit {
  momentList = [];
  @ViewChild('momentPic') momentPic: ElementRef;
  imgSrc:string | ArrayBuffer ='./../../assets/images/default.jpg';
  form: FormGroup;
  updateFormOpen=false;

  ngOnInit(){}

  constructor(public router: Router, private apiService: UserService,public fb: FormBuilder) {
    this.form = this.fb.group({
      comment: ['', Validators.required],
      tags: ['', Validators.required],
      momentPic:[null]
    });
  }

  public getMomentList() {
    this.apiService.getMomentListByUserId().subscribe(
      (data) => {
        this.momentList = data;
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }

  public deleteMoment(id) {
    this.apiService.deleteMoment(id).subscribe(
      (data) => {
        alert('Moment deleted');
        this.getMomentList();
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }
  
  editMoment(momentData) {
    this.updateFormOpen=true;
    this.form.patchValue(momentData);
    this.imgSrc=momentData.imageUrl;
  }

  updateMoment() {
    const formData = new FormData();
    for (const key in this.form.value) {
      formData.append(key, this.form.value[key]);
    }
      this.apiService.updateMoment(this.form.get('id').value, formData).subscribe(
        (data) => {
          this.updateFormOpen=false;
          this.form.reset();
          this.momentPic.nativeElement.value = '';
          alert('Moment updated');
          this.getMomentList();
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
