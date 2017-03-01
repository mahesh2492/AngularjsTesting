import {ShowTaskComponent} from "./showtask.component";
import {RouterOutletMap, Router} from "@angular/router";
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

describe('ShowTaskComponent', function () {
  let de: DebugElement;
  let comp: ShowTaskComponent;
  let fixture: ComponentFixture<ShowTaskComponent>;
  let service: TaskService;
  let router: Router;

  class MockRouter {
    navigate():Promise<boolean>{
      return Promise.resolve(true)
    }
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTaskComponent],
      providers: [{provide: Router, useClass: MockRouter}, RouterOutletMap, TaskService],
      imports: [RouterTestingModule, CommonModule, FormsModule, HttpModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTaskComponent);
    comp = fixture.componentInstance;
    comp.tasks = [{
      date: '28/02/2017',
      title: 'Text Mining',
      description: 'Have to Give Presentation on Text Mining ',
      priority: 'high',
      _id: '12345678'
    }]
    de = fixture.debugElement.query(By.css('h1'));
    service = fixture.debugElement.injector.get(TaskService);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should create component', () => expect(comp).toBeDefined());


  it('it should be able to get data from service', () => {
    spyOn(service, 'getData').and.returnValue(
      Observable.of<any>(
        [{
          date: '28/02/2017',
          title: 'mahesh',
          description: 'I am cool',
          priority: 'high',
          _id: '12345'
        }]
      )
    );
    comp.ngOnInit();
    expect(comp.tasks).toEqual([{
      date: '28/02/2017',
      title: 'mahesh',
      description: 'I am cool',
      priority: 'high',
      _id: '12345'
    }])
  });

  it('it should be able to delete data from service',() =>{
    spyOn(window, "alert");
    spyOn(service,'remove').and.returnValue(
      Observable.of<any>(
        [{
          date: '',
          title: '',
          description: '',
          priority: '',
          _id: ''
        }]
      )
    );
    comp.delete(0);
    expect(window.alert).toHaveBeenCalledWith('Task is successfully removed');
    router.navigate([]).then(data => {
      expect(data).toBe(true);
    })

  });

  it('it should be able to edit data from service',() =>{
    spyOn(service,'remove').and.returnValue(
      Observable.of<any>(
        [{
          date: '',
          title: '',
          description: '',
          priority: '',
          _id: ''
        }]
      )
    );
    comp.edit(0);
    router.navigate([]).then(data => {
      expect(data).toBe(true);
    })

  });


});
