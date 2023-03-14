import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../Service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  addForm: any;
  faeye = faEye;
  faeyes = faEyeSlash;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private projectservice: ApiService,
    private toastr: ToastrService
  ) {
    this.addForm = this.formbuilder.group({
      firstname: ['', [Validators.required, Validators.maxLength(255), Validators.pattern("^[a-zA-Z]+$")]],
      lastname: ['', [Validators.required, Validators.maxLength(255), Validators.pattern("^[a-zA-Z]+$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      gender: ['', Validators.required],
      age: ['18', [Validators.required]],
      username: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]],
      password: ['', [Validators.required, Validators.min(8), Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=[^@#$%^&+=]*[@#$%^&+=]).{8,30}')


      ]],
    }
    )
  }
  onSubmit() {
    if (this.addForm.valid) {
      this.projectservice.createUser(this.addForm.value).subscribe({
        next: (data: any) => {
          this.toastr.success('User created successfully', 'Success');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 9500);
          console.log(this.addForm.value)

        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error('Email already exists', 'Error');
        }
      });
    }
    else {
      this.toastr.error('please fill the form with your credentials', 'Error');
    }
  }


  get firstname() {
    return this.addForm.get('firstname')
  }

  get lastname() {
    return this.addForm.get('lastname')
  }
  get age() {
    return this.addForm.get('age')
  }
  get email() {
    return this.addForm.get('email')
  }
  get username() {
    return this.addForm.get('username')
  }
  get password() {
    return this.addForm.get('password')
  }
  get gender() {
    return this.addForm.get('gender')
  }
  showPassword = false;
  password1 = '';
  visibility = false;

  toggleVisibility() {
    this.visibility = !this.visibility;
  }

  sliderOptions = {
    floor: 1,
    ceil: 120,
    step: 1,

  };


}
