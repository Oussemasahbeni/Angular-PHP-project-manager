import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ApiService } from '../Service/api.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-addprojects',
  templateUrl: './addprojects.component.html',
  styleUrls: ['./addprojects.component.css']
})

export class AddprojectsComponent {
  addForm: any;


  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private projectservice: ApiService,
    private toastr: ToastrService
  ) {
    this.addForm = this.formbuilder.group({
      id: ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]+$")]],
      description: ['', [Validators.required, Validators.maxLength(255), Validators.pattern("^[a-zA-Z]+$")]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]]
    },
      { validator: this.endDateValidator }

    )
  }
  endDateValidator(group: AbstractControl): ValidationErrors | null {
    const startDate = group.get('start_date')?.value;
    const endDate = group.get('end_date')?.value;

    console.log("startDate:", startDate);
    console.log("endDate:", endDate);

    if (startDate && endDate && startDate > endDate) {
      console.log("endDateInvalid");
      return { endDateInvalid: true };
    }

    console.log("valid");
    return null;
  }
  onSubmit() {
    if (this.addForm.valid) {
      this.projectservice.createProjects(this.addForm.value).subscribe({
        next: (data: any) => {
          this.toastr.success('Project created successfully', 'Success');
          setTimeout(() => {
            this.router.navigate(['/view-projects']);
          }, 1500);


        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error('Project ID exists already', 'Error');
        }
      });
    }
    else {
      this.toastr.error('Please Fill the form correctly ', 'Error');
    }
  }


  get id() {
    return this.addForm.get('id')
  }


}
