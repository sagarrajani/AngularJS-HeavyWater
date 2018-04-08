import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../app/shared/data/data.service';
import { Application } from '../../app/shared/data/application.model';
import {AnonymousSubscription} from "rxjs/Subscription";
import { LoadingSpinnerComponent } from '../ui/loading-spinner/loading-spinner.component';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/share';
import {Observable} from 'rxjs/Rx';
import {SearchfilterPipe} from '../../app/searchfilter.pipe'
import {merge} from 'rxjs/observable/merge';
import {of} from 'rxjs/observable/of';
import {mergeMap, map}from'rxjs/operators';
import { OnChanges,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  private items: any;
  private sub: any;
  private selectedItem: any;
  private selectedItemId: string;
  private timerSubscription: AnonymousSubscription;
  private search: string;
  private showSpinner: boolean =true;
  constructor(private router: Router, private route: ActivatedRoute, private data: DataService) {
        this.router.events.subscribe(ev => {
        this.sub = this.route.queryParams.subscribe(params => {
        let {order} = params;
        if(order && order != this.selectedItemId) {
          this.selectedItemId = order;
          this.loadItemDetails(this.selectedItemId);
        } else {
          this.selectedItemId = undefined;
          this.selectedItem = undefined;
        }
      });
      this.sub.unsubscribe();
    });
    this.search=undefined;
    this.items = this.data.fetchApplicationsList();
    this.items.subscribe(result => {console.log(result.length)});
    this.data.getSearchTerm.subscribe((res) => {
      this.search = res; 
    });

    // this.data.add.subscribe(()=>{console.log("hello")});
    this.data.add.subscribe(((ev)=> {
      try {
       let x=this.data.fetchApplicationsDetails(ev);
       this.items=x.mergeMap(latest => {
         const fullResult = this.items.map(featured => [latest,...featured]);
         return merge(of(latest,fullResult));
       });
      }
      catch(err) {
         console.log(err);
      }
      finally {
        this.items=this.data.fetchApplicationsList();
        this.items.subscribe(result => {console.log(result.length)});
      }
       
  }));
  }

 
   
  loadItemDetails(id) {
    this.selectedItem = this.data.fetchApplicationsDetails(id).map(data => {
      return {
        ...data,
        ORDER_ID: id,
      };
    }).share();
    console.log(this.selectedItem)
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log("hello");
  //   this.items=this.data.fetchApplicationsList();
  //   // changes.prop contains the old and the new value...
  // }

  ngOnInit() {
    // this.items.subscribe(result=>{console.log(result.length)});
    this.items.subscribe(()=>this.showSpinner=false);
  }
}
