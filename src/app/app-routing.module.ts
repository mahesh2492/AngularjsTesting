import {Routes} from '@angular/router'
import {ShowTaskComponent} from "./showtask.component";
import {CreateTaskComponent} from "./createtask.component";



export const routes: Routes = [ {


  path: 'show',
  component: ShowTaskComponent
},{
  path : 'create/:indexSent'    ,
  component: CreateTaskComponent
},

  {
  path: 'create',
  component: CreateTaskComponent
}];
