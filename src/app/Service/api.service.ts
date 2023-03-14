import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { projects } from 'src/projects';
import { tasks } from 'src/tasks';
import { members } from 'src/members';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AES, enc } from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  projectId: any;
  private isUserLoggedIn = new BehaviorSubject(false);
  currentLoginStatus = this.isUserLoggedIn.asObservable();
  

  private username = new BehaviorSubject('');
  currentUsername = this.username.asObservable();

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
   private token: any;


   

  constructor(private http: HttpClient,private route: ActivatedRoute) {
    
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });

   }
  updateUsername(username: string) {
    this.username.next(username);
  }
  baseUrl: String= 'http://localhost/backend/';
  getProjects() {
    return this.http.get<projects[]>(this.baseUrl+'viewprojects.php');
  } 
  getSingleProject(id:any){

    return this.http.get<projects[]>(this.baseUrl+'viewprojects.php?id='+id);
  }
  deleteProjects(id:any) {
    console.log(id);
    return this.http.delete(this.baseUrl+'deleteproject.php?id='+ id);  
  }  
  createProjects(project:any) {
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let data = JSON.stringify(project);
    return this.http.post(this.baseUrl+'addprojects.php', data, { headers }); 
     
  }

  login(email: any, password: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { email, password };
    let data = JSON.stringify(body);
    return new Observable((observer) => {
      this.http.post(this.baseUrl + 'login.php', data, { headers }).subscribe(
        (response) => {
          const data = JSON.stringify(response);
          const encryptedData = AES.encrypt(data,'ISETRADES2023').toString();
          const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now
          const encryptedDataWithExpiry = JSON.stringify({ expiryTime, encryptedData });  
          localStorage.setItem('user', encryptedDataWithExpiry);
          console.log(localStorage);
          observer.next(response);
          observer.complete();
        },
        (error) => {           
          console.error(error);
          observer.error(error);
        }
      );
    }); 
  }
  isAuthenticated(): boolean {
    return this.token != null;
  }

  getToken() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  setToken(token: string) {
    this.token = token;
  }
  changeLoginStatus(value: boolean) {
  this.isUserLoggedIn.next(value);
  }
        

        


createUser(user:any) {
    
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  let data = JSON.stringify(user);
  return this.http.post(this.baseUrl+'addusers.php', data, { headers }); 
  
}

  editProjects(project:any) {
      
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let data = JSON.stringify(project);
      return this.http.put(this.baseUrl+'updateprojects.php', project);  
    } 

  getTasks(projectid:any, memberid:any){
    return this.http.get<tasks[]>(this.baseUrl+'viewtasks.php?Project_id='+projectid+'&memberID='+memberid);

  }
  getSingleTask(Project_id:any,memberID:any,taskID:any){

    return this.http.get<tasks[]>(this.baseUrl+'viewsingletask.php?Project_id='+Project_id+'&memberID='+memberID+'&taskID='+taskID);
  }
    
  deleteTasks(id:any){
  console.log(id);
  return this.http.delete(this.baseUrl+'deletetasks.php?taskID='+ id);  
  }
  createTasks(task:any) {
    return this.http.post(this.baseUrl+'addtasks.php', task);  
  } 
  editTasks(task:any) {
    console.log(task);
    return this.http.put(this.baseUrl+'updatetasks.php',task);  
  } 
  getMembers(projectId:any) {
    return this.http.get<members[]>(this.baseUrl+'viewmembers.php?Project_id='+projectId);
  } 

  getSingleMember(id:number,pid:number) {
    return this.http.get<members[]>(this.baseUrl+'viewsinglemembers.php?Project_id='+pid+'&memberID='+id);
  } 
  
  deleteMembers(id:any) {
    return this.http.delete(this.baseUrl+'deletemembers.php?memberID='+id);  
  }  

  createMember(Member:any) {
    console.log(Member);
    return this.http.post(this.baseUrl+'addmembers.php', Member);  
  }  

  editMember(Member:any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let data = JSON.stringify(Member);
      return this.http.put(this.baseUrl+'updatemembers.php', Member);  
      
    }  
}