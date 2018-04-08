import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Auth } from '../../../app/login/auth.service';
import { environment } from '../../../environments/environment';
import { Application } from './application.model';

@Injectable()
export class DataService {
  private API_ID;
  private ENVIRONMENT;
  private appDetails;
  private addApp;
  private appList;
  private data;
  private role;
  private operation;
  public searchterm;
  getSearchTerm: Observable<any>;
  private getSearchSubject = new Subject<any>();

  add: Observable<any>;
  private adSubject = new Subject<any>();

  constructor(private http: Http,private auth: Auth) {
    this.getSearchTerm = this.getSearchSubject.asObservable();
    this.add=this.adSubject.asObservable();
  }

  /**
   * fetchApplicationsList retrieve the list of applications
   * @return {Observable<Application[]>}
   */
  fetchApplicationsList (): Observable<Application[]> {
    this.data = {
     'AttributeName':'LoanOfficer_Name',
     'AttributeValue':this.auth.userInfo.nickname
    }
    this.role = this.auth.userInfo.user_metadata.role;
    if (this.role === 'admin'){
        this.operation = 'Scan';
     }else{
        this.operation = 'Retrieve';
    }
    console.log(this.appList)
    if(this.appList === undefined){
     this.appList = localStorage.getItem('appList') 
     console.log(this.appList)
    }
    return this.http.post(`${this.appList}`, {
      'data': this.data,
      'Client_Name': this.auth.userInfo.user_metadata.client_name,
      'Operation': this.operation,
      'TableName': 'VODOrders'
    })
      .map((res: Response) => res.json().Applications as Application[]);
  }
 
  /**
   * fetchApplicationsList retrieve the list of applications
   * @return {Observable<Application[]>}
   */
  fetchApplicationsDetails (appId): Observable<Application> {

    return this.http.post(`${this.appDetails}`, JSON.stringify({
      'OrderId': appId,
      'Client_Name': this.auth.userInfo.user_metadata.client_name,
      "LoanOfficer_Name": this.auth.userInfo.nickname,
      "LoanOfficer_Email": this.auth.userInfo.email
    }))
      .map((res: Response) => res.json() as Application);
  }
  
  saveNewApplication(appData) {
    return this.http.post(`${this.addApp}`,appData);
  }
  load() {
    return new Promise((resolve, reject) => {
    return this.http.get('assets/apivariables.json')
            .map(res => res.json())
            .subscribe((env_data) => {
            console.log(env_data);
            this.API_ID = env_data.API_ID
            this.ENVIRONMENT = env_data.ENVIRONMENT
            console.log('API_ID'+this.API_ID);
            console.log('ENVIRONMENT'+this.ENVIRONMENT);
            this.appDetails='https://'+this.API_ID+'.execute-api.us-east-1.amazonaws.com/'+this.ENVIRONMENT+'/getreportdetails/reportdetails'; 
            this.addApp='https://'+this.API_ID+'.execute-api.us-east-1.amazonaws.com/'+this.ENVIRONMENT+'/orderservice/initiate'; 
            this.appList='https://'+this.API_ID+'.execute-api.us-east-1.amazonaws.com/'+this.ENVIRONMENT+'/datalayer/persist'; 
            localStorage.setItem('appList',this.appList);
            });
	});
  }

  search(input){
    this.getSearchSubject.next(input);

  }

  addtoTop(ev)
  {
    this.adSubject.next(ev._body.slice(ev._body.indexOf("OrderId")+10, ev._body.indexOf("LookBack_Period")-3));
  }
}
