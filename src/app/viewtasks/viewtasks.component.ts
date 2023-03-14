import { Component, OnInit, } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { tasks } from 'src/tasks';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewtasks',
  templateUrl: './viewtasks.component.html',
  styleUrls: ['./viewtasks.component.css']
})
export class ViewtasksComponent implements OnInit {
  tasks: any;
  p: number = 1;
  dataSource: any;
  searchTerm: any;
  fatrash = faTrash;
  faPen = faPen;
  facalandar = faCalendar;
  faeye = faEye;
  faplus = faUserPlus;
  member_id: any;
  project_id: any;




  sortData(sort: Sort) {
    const data = this.tasks.slice();
    if (!sort.active || sort.direction === '') {
      this.tasks = data;
      return;
    }

    this.tasks = data.sort((a: { status: string | number; date: string }, b: { status: string | number; date: string }) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'status': return this.compare(a.status, b.status, isAsc);
        case 'date': return this.compare(a.date, b.date, isAsc);

        default: return 0;
      }
    });
  }

  originaltasks: any[] | undefined;
  constructor(private taskservice: ApiService, private router: Router, private url: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.member_id = this.url.snapshot.params['memberID'];
    this.project_id = this.url.snapshot.params['Project_id'];
    this.taskservice.getTasks(this.project_id, this.member_id).subscribe(
      (result: any) => {
        console.log(result)
        this.tasks = result.data;

        // this.originaltasks = [...result.data];
      }

    )
  }
  deletetask(task: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.taskservice.deleteTasks(task).subscribe(data => {
          this.tasks = this.tasks.filter((u: any) => u !== task);
          this.toastr.success('task deleted successfully', 'Success');
          setTimeout(() => {
            location.reload();
          }, 1500);




        });
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  onEdit(projectid: any, memberid: any, taskID: any) {
    this.router.navigate(['/edit-tasks', projectid, memberid, taskID]);
  }


}


