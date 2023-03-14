import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ApiService } from '../Service/api.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Header } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addtasks',
  templateUrl: './addtasks.component.html',
  styleUrls: ['./addtasks.component.css']
})
export class AddtasksComponent implements OnInit {
  addForm: any;
  project_id: any;
  memberID: any;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private projectservice: ApiService,
    private url: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.addForm = this.formbuilder.group({
      Project_id: ['', [Validators.required]],
      memberID: ['', [Validators.required]],
      taskID: ['', [Validators.required, Validators.maxLength(255), Validators.min(1), Validators.pattern("^[0-9]+$")]],
      description: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      status: ['Planned', [Validators.required]],
      due_date: ['', [Validators.required]]

    }
    )
  }
  ngOnInit(): void {
    this.project_id = this.url.snapshot.params['Project_id'];
    this.memberID = this.url.snapshot.params['memberID'];

    console.log(this.project_id);
    console.log(this.memberID);
    this.addForm.patchValue({ Project_id: this.project_id });
    this.addForm.patchValue({ memberID: this.memberID });
  }
  onSubmit() {
    if (this.addForm.valid) {
      this.projectservice.createTasks(this.addForm.value).subscribe({
        next: (data: any) => {
          this.toastr.success('Task created successfully', 'Success');
          setTimeout(() => {
            this.router.navigate(['/view-members/' + this.project_id]);
          }, 1500);
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error('Failed to create task', 'Error');
        }
      });
    }
    else {
      this.toastr.error('Please Fill the form first', 'Error');
    }
  }
  get id() {
    return this.addForm.get('taskID')
  }
}
