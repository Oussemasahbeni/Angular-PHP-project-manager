import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { members } from 'src/members';
import { MatPaginator } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationInstance } from 'ngx-pagination';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewmembers',
  templateUrl: './viewmembers.component.html',
  styleUrls: ['./viewmembers.component.css']
})
export class ViewmembersComponent implements OnInit {

  MEMBERS: any;
  p: number = 1;
  dataSource: any;
  searchTerm: any;
  fatrash = faTrash;
  faPen = faPen;
  facalandar = faCalendar;
  id: any;
  faeye = faEye;
  faplus = faUserPlus;

  sortData(sort: Sort) {
    const data = this.MEMBERS.slice();
    if (!sort.active || sort.direction === '') {
      this.MEMBERS = data;
      return;
    }

    this.MEMBERS = data.sort((a: { memberid: string | number; proejctid: string | number; role: string | number; }, b: { memberid: string | number; proejctid: string | number; role: string | number; }) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'pid': return this.compare(a.memberid, b.memberid, isAsc);
        case 'proejctid': return this.compare(a.proejctid, b.proejctid, isAsc);
        case 'role': return this.compare(a.role, b.role, isAsc);
        default: return 0;
      }
    });
  }

  originalMEMBERS: any[] | undefined;
  constructor(private MEMBERService: ApiService, private router: Router, private url: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.MEMBERService.getMembers(this.id).subscribe(
      (result: any) => {
        console.log(result)
        console.log(this.id)
        this.MEMBERS = result.data;
        console.log(this.MEMBERS)
        // this.originalMEMBERS = [...result.data];
      }

    )
  }
  deletemember(member: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this member!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.MEMBERService.deleteMembers(member).subscribe(data => {
          this.MEMBERS = this.MEMBERS.filter((u: any) => u !== member);
          this.toastr.success('Member deleted successfully', 'Success');
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


  filterData() {
    this.MEMBERS = this.MEMBERS.filter((d: { name: string | any[]; }) => d.name.indexOf(this.searchTerm) !== -1);

  }
  onKeyUp() {
    if (!this.searchTerm) {
      this.MEMBERS = this.originalMEMBERS
    }
  }
  onKeyDown(event: { keyCode: number; }) {
    if (!this.searchTerm) {
      this.filterData();
    } else if (event.keyCode === 8) {
      this.filterData();
    }
  }

  onEdit(memberid: number, projectid: any) {
    this.router.navigate(['/edit-members', projectid, memberid]);
  }
  onMem(project_id: number, memberid: number) {
    this.router.navigate(['/view-tasks', project_id, memberid]);
  }

  onMemm(project_id: number, memberid: number) {
    this.router.navigate(['/add-tasks', project_id, memberid]);
  }

}





