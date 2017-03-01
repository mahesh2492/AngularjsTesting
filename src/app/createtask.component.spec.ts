import { Router, ActivatedRoute} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {async, TestBed, ComponentFixture} from "@angular/core/testing";
import {By}           from '@angular/platform-browser';
import {DebugElement} from "@angular/core";
import {TaskService} from "./task.service";
import {HttpModule} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {CreateTaskComponent} from "./createtask.component";

describe('CreateTaskComponent', function () {
  let de: DebugElement;
  let comp: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let service: TaskService;
  let router: Router;
  let route:ActivatedRoute;

  class MockRouter {
    navigate():Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  class MockActivatedRoute {
    params = Observable.of<any>({'indexSent':'1'})
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTaskComponent],
      providers: [{provide: Router, useClass: MockRouter},
        {provide: ActivatedRoute, useClass: MockActivatedRoute}, TaskService],
      imports: [RouterTestingModule, CommonModule, FormsModule, HttpModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    comp = fixture.componentInstance;
    comp.task = {
      date: '01/03/2017',
      title: 'Angular Testing Assignment',
      description: 'Have to give AngularJS Testing Assignment before akshay wakes up',
      priority: 'High',
      _id: '123'
    }
    de = fixture.debugElement.query(By.css('h1'));
    service = fixture.debugElement.injector.get(TaskService);
    router = fixture.debugElement.injector.get(Router);
    route=fixture.debugElement.injector.get(ActivatedRoute);
  });



  it('it should be able to update data in case of getting router parameter', () => {
    comp.index = '0';
    spyOn(window,'alert');
    spyOn(service, 'updateTask').and.returnValue(
      Observable.of<any>(
        [{
          date: '01/03/2017',
          title: 'Angular Testing Assignment',
          description: 'Have to give AngularJS Testing Assignment before akshay wakes up',
          priority: 'High'
        }]
      )
    );
    comp.submit();
    expect(window.alert).toHaveBeenCalledWith('Task is successfully updated');
    router.navigate([]).then(data => {
      expect(data).toBe(true);
    })

  });

  it('it should be able to generate an error in case of data not updated', () => {
    comp.index = '0';
    spyOn(console,'error');
    spyOn(service, 'updateTask').and.returnValue(
      Observable.throw(Error('Observable Error Occurs'))
    );
    comp.submit();
    expect(console.error).toHaveBeenCalled();

  });

  it('it should be able to add data in case of getting router parameter ', () => {
    comp.index= null;
    spyOn(window,'alert');
    spyOn(service, 'addTask').and.returnValue(
      Observable.of<any>(
        [{
          date: '01/03/2017',
          title: 'Angular Testing Assignment',
          description: 'Have to give AngularJS Testing Assignment before akshay wakes up',
          priority: 'High'
        }]
      )
    );
    comp.submit();
    expect(window.alert).toHaveBeenCalledWith('Task is successfully added');
    router.navigate([]).then(data => {
      expect(data).toBe(true);
    })

  });

  it('it should be able to generate error in case of router parameter is not there', () => {
    comp.index= null;
    spyOn(console,'error');
    spyOn(service, 'addTask').and.returnValue(
      Observable.throw(Error('Observable Error Occurs'))
    );
    comp.submit();
    expect(console.error).toHaveBeenCalled();

  });



});
