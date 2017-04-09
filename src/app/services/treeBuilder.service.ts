import { Activity } from './../models/activity';
import { TreeNode } from 'primeng/primeng';
import { Tree } from './../models/tree';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TreeBuilderService {

constructor(private http:Http) { }


//get one activity by id
  getActivityByLevel(level)
  {
     return this
      .http
      .get('/api/activity/byLevel/'+level)
      .map((response: Response) => response.json());
  }

//get one activity by id
  getActivityByParentId(id)
  {
     return this
      .http
      .get('/api/activity/allByParentId'+id)
      .map((response: Response) => response.json());
  }

//build a set of node
treeBuilder():TreeNode
{
  debugger;
  let treeRoot:TreeNode=[];
  treeRoot.label="IT Projects";
   treeRoot.data="00";
   treeRoot.expandedIcon="fa-folder-open";
   treeRoot.collapsedIcon="fa-folder";
   treeRoot.expanded=true;
   treeRoot.children=[];
  this.getActivityByLevel(0).subscribe(act=>{
      act.forEach(elm => {
        let node:TreeNode=[];
        node.label=elm.title;
        node.data=elm._id;
        node.expandedIcon="fa-folder-open";
        node.collapsedIcon="fa-folder";
        node.expanded=true;
        this.addChildNode(elm.parentId,node);
        treeRoot.children.push(node);
      });
  },
  error=>{
    console.log('Error fetching data for activity by level'+error);
  })
  return treeRoot;
}

//add child node
addChildNode(id:string,node:TreeNode)
{
  this.getActivityByParentId(id).subscribe(act=>
  {

  }
  ,
  error=>{
    console.log("addchildnode error: "+error);
  });
}

}
