import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ApiService } from '../Service/api.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Header } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addmembers',
  templateUrl: './addmembers.component.html',
  styleUrls: ['./addmembers.component.css']
})
export class AddmembersComponent implements OnInit {
  addForm: any;
  project_id: any;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private projectservice: ApiService,
    private url: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.addForm = this.formbuilder.group({
      memberID: ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]+$")]],
      Member_email: ['', [Validators.required, Validators.maxLength(255), Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Role: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      Project_id: ['', [Validators.required]]
    }
    )
  }
  ngOnInit(): void {
    this.project_id = this.url.snapshot.params['id'];
    console.log(this.project_id);
    this.addForm.patchValue({ Project_id: this.project_id });
  }
  onSubmit() {
    if (this.addForm.valid) {
      this.projectservice.createMember(this.addForm.value).subscribe({
        next: (data: any) => {
          this.toastr.success('Member created successfully', 'Success')
          setTimeout(() => {
            this.router.navigate(['/view-projects']);
          }, 1000);


        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error('Failed to create member', 'Error');
        }
      });
    }
    else {
      this.toastr.error('Please Fill the form first', 'Error');
    }
  }

  get Member_email() {
    return this.addForm.get('Member_email')
  }
  get id() {
    return this.addForm.get('memberID')
  }
}
