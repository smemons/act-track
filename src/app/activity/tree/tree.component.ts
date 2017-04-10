import { Tree } from './../../models/tree';
import { TreeBuilderService } from './../../services/treeBuilder.service';
import { TreeNode } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  actTree:TreeNode[]=[];
  constructor(private treeService:TreeBuilderService) { }

  ngOnInit() {

  //  let tree:TreeNode=[];
  //  tree.label="Root";
  //  tree.data="00";
  //  tree.expandedIcon="fa-folder-open";
  //  tree.collapsedIcon="fa-folder";

  //  tree.children=[];
  //  for (var index = 0; index < 5; index++) {
  //    let tree2:TreeNode=[];
  //  tree2.label="mylabel" +index;
  //  tree2.data="something";
  //  tree2.expandedIcon="fa-folder-open";
  //  tree2.collapsedIcon="fa-folder";
  //  tree.children.push(tree2);
  //  }

   this.actTree.push(this.treeService.treeBuilder());

    //  [
    //     {
    //         "label": "Documents",
    //         "data": "Documents Folder",
    //         "expandedIcon": "fa-folder-open",
    //         "collapsedIcon": "fa-folder",
    //         "children": [{
    //                 "label": "Work",
    //                 "data": "Work Folder",
    //                 "expandedIcon": "fa-folder-open",
    //                 "collapsedIcon": "fa-folder",
    //                 "children": [{"label": "Expenses.doc", "icon": "fa-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "fa-file-word-o", "data": "Resume Document"}]
    //             },
    //             {
    //                 "label": "Home",
    //                 "data": "Home Folder",
    //                 "expandedIcon": "fa-folder-open",
    //                 "collapsedIcon": "fa-folder",
    //                 "children": [{"label": "Invoices.txt", "icon": "fa-file-word-o", "data": "Invoices for this month"}]
    //             }]
    //     }
    // ]
  }

}
