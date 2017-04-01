import { AlertService } from './../../services/alert.service';
import { CategoryService } from '../../services/category.service';
import { Userservice } from './../../services/userservice.service';
import { Category } from './../../models/category';
import { SelectItem } from 'primeng/primeng';
import { element } from 'protractor';
import { Activity } from './../../models/activity';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { AuthService } from './../../services/auth.service';
import { Component, NgZone, OnInit } from '@angular/core';
declare var moment: any;
@Component({
  selector: 'app-listActivities',
  templateUrl: './listActivities.component.html',
  styleUrls: ['./listActivities.component.css']
})

export class ListActivitiesComponent implements OnInit {

  displayDialog: boolean = false;
  activity:Activity;
  assigned:Activity[];
  created:Activity[];
  assignees: SelectItem[];
  categories:Category[];

  constructor(private authService:AuthService,
              private userService:Userservice,
              private categoryService:CategoryService,
              private activityService:ActivityService,
              private alertService:AlertService,
              private router:Router
              ) { }

  ngOnInit() {

 //get all the users List
    this.userService.getAll().subscribe(usrs=>{
      this.assignees = [];
      //get all the users and create
       usrs.forEach(user=> {

            this.assignees.push({label:user.username+'-('+ user.firstName+')' , value:user.username});
       });
    });
    this.categoryService.getAll().subscribe(cat=>this.categories=cat);
    let loggedInUser=this.authService.getCurrentUser();

    //get all assigned
     this.activityService.getAllAssigned(loggedInUser).
                          subscribe(act=>{
                            act.forEach(element => {
                              element.startDate=moment(element.startDate).toDate();
                              element.endDate=moment(element.endDate).toDate();
                            });
                            this.assigned=act
                          });

     //get all created
     this.activityService.getAllCreated(loggedInUser).
                          subscribe(act=>{

                            act.forEach(element => {

                              element.startDate=moment(element.startDate).toDate();
                              element.endDate=moment(element.endDate).toDate();
                            });
                            this.created=act
                          });
  }




   //edit activity
  editAct(act:Activity)
  {

   this.activity=act;
   this.displayDialog = true;
  }

  //update the Activity
  updateActivity(act:Activity)
  {

  this.activityService.update(act)
            .subscribe(
                data => {
                   console.log('Category updated - Service!');
                   this.alertService.success('Activty updated!');
                   this.displayDialog = false;

                },
                error => {
                    //this.alertService.error(error);
                    console.log(error);
                    this.alertService.error(error);
                     this.displayDialog = false;
                });
  }

  //viewActivity(act)
  viewActivity(act){
    // this.router.navigateByUrl(`/viewActivity/${act._id}`);

  this.router.navigate(['/viewActivity', act._id]);

  //this.router.navigate(['/viewActivity', act._id]);
    // this.activityService.viewActivity(act._id);
  }


}
