import { Status } from './../../models/status';
import { UtilityService } from './../../services/utility.service';
import { ActivityService } from './../../services/activity.service';
import { AlertService } from './../../services/alert.service';
import { Userservice } from './../../services/userservice.service';
import { Category } from './../../models/category';
import { User } from './../../models/user';
import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
    model: any = {};
    loading = false;
    users :User[];
    assignees: SelectItem[];
    categories:Category[];
    foundUsers:String[];
    statuses: SelectItem[];
  constructor(private userService:Userservice,
              private utilityService:UtilityService,
              private alertService:AlertService,
              private activityService:ActivityService,
              private router:Router ) { }

  ngOnInit() {
    // //get all the users List
    // this.userService.getAll().subscribe(usrs=>{
    //   this.assignees = [];
    //   //get all the users and create
    //    usrs.forEach(user=> {

    //         this.assignees.push({label:user.username+'-('+ user.firstName+')' , value:user.username});
    //    });
    // });



    this.utilityService.getAllCategories().subscribe(cat=>this.categories=cat);

    //get all Status
this.statuses=[];
    this.utilityService.getAllStatus().subscribe(sts=>{


    sts.forEach(status => {

      this.statuses.push({label:status.title, value:status._id});
    });
    })
  }
  createActivity(){

        this.loading = true;

         this.activityService.create(this.model)
            .subscribe(
                data => {
                   console.log('Category created - Service!');
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
}
