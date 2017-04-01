import { Category } from './../../models/category';
import { CategoryService } from '../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listCategory',
  templateUrl: './listCategory.component.html',
  styleUrls: ['./listCategory.component.css']
})
export class ListCategoryComponent implements OnInit {

  categories:Category[];
  constructor(private categoryService:CategoryService) { }

   ngOnInit()
  {
    this.getAllCategories().subscribe({

      next: cat => {

        console.log("Got rooms: ", cat);
        this.categories=cat;
      }
    });;
  }
  getAllCategories() {

    return this.categoryService.getAll();
  }

  deleteCat(cat:Category)
  {

  }
   editCat(cat:Category)
  {

  }
}
