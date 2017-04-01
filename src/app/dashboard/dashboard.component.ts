import { forEach } from '@angular/router/src/utils/collection';
import { SelectItem } from 'primeng/primeng';
import { Category } from './../models/category';
import { Activity } from './../models/activity';
import { Router } from '@angular/router';
import { AlertService } from './../services/alert.service';
import { ActivityService } from './../services/activity.service';
import { CategoryService } from './../services/category.service';
import { Userservice } from './../services/userservice.service';
import { AuthService } from './../services/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
declare var moment: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  events: any[];
  dialogVisible: boolean = false;
  activity:Activity;
  allActivities:Activity[];
  assigned:Activity[];
  created:Activity[];
  assignees: SelectItem[];
  categories:Category[];
   headerConfig: any;
  now = moment();

  constructor(private authService:AuthService,
              private userService:Userservice,
              private categoryService:CategoryService,
              private activityService:ActivityService,
              private alertService:AlertService,
              private router:Router,
              private cd: ChangeDetectorRef
              ) { }


  ngOnInit() {
    this.events=[];
    this.allActivities=[];
    //get all the users List
    this.userService.getAll().subscribe(usrs=>{
      this.assignees = [];
      //get all the users and create
       usrs.forEach(user=> {

            this.assignees.push({label:user.username+'-('+ user.firstName+')' , value:user.username});
       });
    });
    this.categoryService.getAll().subscribe(cat=>this.categories=cat);
    let uid=this.authService.getCurrentUser();

    this.activityService.getAllByUserId(uid).subscribe(acts=>{
      acts.forEach(element=>{

        let col=new Object();
        col["title"] = element.title;
        col['start']=moment(element.startDate).toDate();
        col['end']=moment(element.endDate).toDate();
        if(element.createdBy===uid)
        {
            col['color']=element.opened?'#5CB85C':'#D9534F';
        }
        else
        {
           col['color']=element.opened?'#337AB7':'#D9534F';
        }
        col['textColor']='black';

       this.events.push(col);
      })

    });

  this.headerConfig = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,basicWeek,basicDay'
		};

   }

handleDayClick(event) {

        this.activity = new Activity();
        this.activity.startDate = moment(event.date).toDate();
         this.activity.endDate = moment(event.date).toDate();
        this.activity.opened=true;
        this.dialogVisible = true;

        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        this.cd.detectChanges();
    }
    close()
    {
      this.dialogVisible=false;
      this.activity=new Activity();
    }

    saveActivity(act:Activity){

         debugger;
         this.activityService.create(act)
            .subscribe(
                data => {
                   console.log('Activity created - Service!');
                   this.alertService.success('Activty created!');
                   this.dialogVisible=false;
                   this.activity=new Activity();
                },
                error => {
                    //this.alertService.error(error);
                    console.log(error);
                    this.alertService.error(error);

                });

  }
}
