import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { projects } from 'src/projects';
import { MatPaginator } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationInstance } from 'ngx-pagination';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NzModalService } from 'ng-zorro-antd/modal';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { FilterPipe } from 'ngx-filter-pipe';


@Component({
  selector: 'app-viewprojects',
  templateUrl: './viewprojects.component.html',
  styleUrls: ['./viewprojects.component.css'],
  providers: [FilterPipe]
})

export class ViewprojectsComponent implements OnInit {
  projects: any;
  p: number = 1;
  dataSource: any;
  searchTerm: any;
  fatrash = faTrash;
  faPen = faPen;
  facalandar = faCalendar;
  faeye = faEye;
  faplus = faUserPlus;









  sortData(sort: Sort) {
    const data = this.projects.slice();
    if (!sort.active || sort.direction === '') {
      this.projects = data;
      return;
    }

    this.projects = data.sort((a: { id: string | number; start_date: string | number; end_date: string | number; }, b: { id: string | number; start_date: string | number; end_date: string | number; }) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'start_date': return this.compare(a.start_date, b.start_date, isAsc);
        case 'end_date': return this.compare(a.end_date, b.end_date, isAsc);
        default: return 0;
      }
    });
  }

  originalProjects: any[] | undefined;
  constructor(private projectservice: ApiService, private router: Router, private toastr: ToastrService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.projectservice.getProjects().subscribe(
      (result: any) => {
        console.log(result)
        this.projects = result.data;
        this.originalProjects = [...result.data];
      }



    )


  }

  deleteproject(project: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this project!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.projectservice.deleteProjects(project.id).subscribe(data => {
          this.projects = this.projects.filter((u: any) => u !== project);
          this.toastr.success('Project Deleted successfully', 'Success');
        });
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  filterData() {
    this.projects = this.projects.filter((d: { name: string | any[]; }) => d.name.indexOf(this.searchTerm) !== -1);

  }
  onKeyUp() {
    if (!this.searchTerm) {
      this.projects = this.originalProjects
    }
  }
  onKeyDown(event: { keyCode: number; }) {
    if (!this.searchTerm) {
      this.filterData();
    } else if (event.keyCode === 8) {
      this.filterData();
    }
  }

  onEdit(project_id: number) {
    this.router.navigate(['/edit-projects', project_id]);
  }
  onMem(project_id: number) {
    this.router.navigate(['/view-members', project_id]);
  }
  onMemm(project_id: number) {
    this.router.navigate(['/add-members', project_id]);
  }

}



