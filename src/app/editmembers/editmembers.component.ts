import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { ApiService } from '../Service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editmembers',
  templateUrl: './editmembers.component.html',
  styleUrls: ['./editmembers.component.css']
})
export class EditmembersComponent implements OnInit {
  addForm: any;
  project_id: any;
  member_id: any;
  data: any;
  projectdata: any;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private projectservice: ApiService,
    private url: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.addForm = this.formbuilder.group({
      Project_id: ['', Validators.required],
      memberID: ['', [Validators.required, Validators.maxLength(255)]],
      Member_email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Role: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      name: ['', Validators.required, , Validators.pattern("^[a-zA-Z]+$")]
    }
    )
  }

  ngOnInit(): void {
    this.member_id = this.url.snapshot.params['memberID'];
    this.project_id = this.url.snapshot.params['Project_id'];
    if (this.project_id > 0) {
      this.projectservice.getSingleMember(this.member_id, this.project_id).subscribe(
        (data: any) => {
          this.projectdata = data.data;
          console.log(data);
          console.log(this.projectdata);
          console.log(this.projectdata[0])
          this.addForm.patchValue(this.projectdata[0]);

        }
      )
    }
  }
  onEdit() {
    this.projectservice.editMember(this.addForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success('Member Edited successfully', 'Success');
        setTimeout(() => {
          this.router.navigate(['/view-members', this.addForm.value.Project_id]);
        }, 2000);
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('Failed to edit member', 'Error');
      }
    });
  }

  get Member_email() {
    return this.addForm.get('Member_email')
  }
}
