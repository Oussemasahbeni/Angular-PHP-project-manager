import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edittasks',
  templateUrl: './edittasks.component.html',
  styleUrls: ['./edittasks.component.css']
})
export class EdittasksComponent implements OnInit {
  addForm: any;
  project_id: any;
  memberID: any;
  member_id: any;
  task_id: any;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private projectservice: ApiService,
    private url: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.addForm = this.formbuilder.group({
      Project_id: ['', [Validators.required]],
      memberID: ['', [Validators.required, Validators.min(1)]],
      taskID: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      status: ['', [Validators.required]],
      due_date: ['', [Validators.required]]

    }
    )
  }

  ngOnInit(): void {
    this.project_id = this.url.snapshot.params['Project_id'];
    this.member_id = this.url.snapshot.params['memberID'];
    this.task_id = this.url.snapshot.params['taskID'];
    if (this.project_id > 0) {
      this.projectservice.getSingleTask(this.member_id, this.project_id, this.task_id).subscribe(
        (data: any) => {
          this.projectdata = data.data[0];
          console.log(data);

          console.log(this.projectdata);
          this.addForm.patchValue(this.projectdata);

        }
      )
    }
  }
  projectdata(projectdata: any) {
    throw new Error('Method not implemented.');
  }


  onEdit() {
    this.projectservice.editTasks(this.addForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success('Task Edited successfully', 'Success');
        setTimeout(() => {
          this.router.navigate(['/view-tasks', this.addForm.value.Project_id, this.addForm.value.memberID]);
        }, 2000);
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('Failed to edit task', 'Error');
      }
    });
  }

}
