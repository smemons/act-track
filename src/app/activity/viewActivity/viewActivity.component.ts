import { Task } from './../../models/task';
import { AlertService } from './../../services/alert.service';
import { TaskService } from './../../services/task.service';
import { ActivityService } from './../../services/activity.service';
import { Activity } from './../../models/activity';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewActivity',
  templateUrl: './viewActivity.component.html',
  styleUrls: ['./viewActivity.component.css']
})
export class ViewActivityComponent implements OnInit {
  displayDialog:Boolean=false;
  activity={};
  model: any = {};
  tasks:Task[];
  loading = false;
  constructor(private route: ActivatedRoute,private router: Router,
              private taskService:TaskService,
              private alertService:AlertService,
              private activityService:ActivityService,
              private cd:ChangeDetectorRef) { }

  ngOnInit() {
      this.tasks=[];
      let id=this.route.snapshot.params['id'];
      this.activityService.getActivity(id).subscribe(act=>this.activity=act);
      //get all tasks associated with this activity
      this.taskService.getAllByActivityId(id).subscribe(tasks=>this.tasks=tasks);
  }

  goback()
  {
    this.activityService.back();
  }

  showTaskDialog()
  {

    this.displayDialog=true;
  }
  close()
  {
    this.displayDialog=false;
  }
  saveTask(id:String)
  {
     this.loading=true;
     this.model.activityId=id;
      event.preventDefault();
      this.taskService.create(this.model).subscribe(
                data => {
                   console.log('Task created - Service!');
                    this.alertService.success("Task saved!");
                    //this.taskService.getAllByActivityId(id).subscribe(tasks=>this.tasks=tasks);
                    this.tasks.push(data);
                    this.cd.detectChanges();

                },
                error => {

                    console.log(error);
                    this.alertService.error(error._body);
                    this.loading = false;
                });

      this.displayDialog = false;
      this.loading=false;
  }

}
