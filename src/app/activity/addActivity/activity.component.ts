import { ActivityLookup } from './../../models/actLookup';
import { ActLookupService } from '../../services/actLookup.service';

import { Status } from './../../models/status';
import { UtilityService } from './../../services/utility.service';
import { ActivityService } from './../../services/activity.service';
import { AlertService } from './../../services/alert.service';
import { Userservice } from './../../services/userservice.service';
import { Category } from './../../models/category';
import { User } from './../../models/user';
import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {SelectItem} from 'primeng/primeng';
declare var moment: any;
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
      model : any = {};
      loading = false;
      users : User[];
      foundUsers : string[];
      isChild : boolean;
      parentTitle : string;
      category : string;
      categories : SelectItem[];
      status : string;
      statuses : SelectItem[];

      focus : string;
      focuses : SelectItem[];

      dept : string[];
      depts : SelectItem[];

      phase : string;
      phases : SelectItem[];

      visibility : string[];
      visibilities : SelectItem[];

  constructor(private userService:Userservice,
              private utilityService:UtilityService,
              private alertService:AlertService,
              private activityService:ActivityService,
              private actLookupService:ActLookupService,
              private router:Router,
             ) { }

  ngOnInit() {

   //check if request is coming for a child activity to be created
   debugger;
   let parentUrl=this.router.url;
   this.isChild=false;
   if(parentUrl==='/addChildActivity')
   {
      this.model=this.utilityService.getPassedActivity();
      this.model.startDate = moment(this.model.startDate).toDate();
      this.model.endDate = moment(this.model.endDate).toDate();
      this.model.parentId=this.model._id;
      this.parentTitle =  this.model.title;
      this.model.title="";
      this.model.desc="";
      this.isChild=true;
      this.model._id=undefined;
      this.model.level=this.model.level+1;
   }

    // //get all the dept List
    this.depts = [];
    this.utilityService.getAllDepts().subscribe(depts=>{

      this.depts=this.utilityService.getSelectItemPublished(depts,null);

    });

    this.utilityService.getAllCategories().subscribe(cat=>this.categories=cat);

  //get all Status
this.statuses=[];
    this.utilityService.getAllStatus().subscribe(sts=>{
      this.statuses=this.utilityService.getSelectItemPublished(sts,null);
  });

   //get all focus areas
this.focuses=[];
    this.utilityService.getAllFocuses().subscribe(foc=>{
       this.focuses=this.utilityService.getSelectItemPublished(foc,"Focus Area");
  });

  /////////////////////
   //get all visiblities areas
this.visibilities=[];
    this.utilityService.getAllVisibilities().subscribe(vis=>{
     this.visibilities=this.utilityService.getSelectItemPublished(vis,null);
  });
  /////////////////////
   //get all phases areas
this.phases=[];
    this.utilityService.getAllPhases().subscribe(phase=>{
       this.phases=this.utilityService.getSelectItemPublished(phase,"Phase");
    });
  }
  createActivity(){

        this.loading = true;

         this.activityService.create(this.model)
            .subscribe(

                data => {
                   let al=new ActivityLookup();
                   al.actId=data._id;
                   al.parentId=this.model.parentId;
                   al.level=this.model.level;
                   this.actLookupService.create(al).subscribe(dt=>{
                      console.log(dt);
                   },
                   er=>
                   {
                     console.log(er);
                   });
                   this.alertService.success('Activty created!');
                    this.router.navigate(['/home']);
                },
                error => {
                    //this.alertService.error(error);
                    console.log(error._body);
                    this.alertService.error(error._body);
                    this.loading = false;
                });

  }

//typeahead feature needed by input box
//for searching of users
  searchTypeAheadUsers(event)
  {
   this.foundUsers=[];
    this.utilityService.getUsersTypeAhead(event.query).subscribe(data => {
            data.forEach(usr => {
              this.foundUsers.push(usr.username);
            });
  },error=>{
    console.log(error);
  });
}

//viewActivity
viewActivity(id:String)
{
  this.utilityService.viewActivity(id);
}
}
