import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentDisciplineComponent} from './student-discipline.component';
import {BrowserModule, By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StudentDisciplineService} from "../student-discipline.service";
import {Student} from "../student";
import {StudentDetailsComponent} from "../student-details/student-details.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {of} from "rxjs";

describe('DetentionReportComponentComponent', () => {
  let component: StudentDisciplineComponent;
  let fixture: ComponentFixture<StudentDisciplineComponent>;

  const student1 = {
    firstName: 'bob',
    lastName: 'ross',
    id: '111',
    parentPhoneNumber: '555-5555',
    priorViolations: 0
  };

  const student2 = {
    firstName: 'cindy',
    lastName: 'waters',
    id: '222',
    parentPhoneNumber: '555-5555',
    priorViolations: 1
  };

  const studentDisciplineServiceSpy = jasmine.createSpyObj('StudentDisciplineService', ['getStudents']);
  studentDisciplineServiceSpy.getStudents.and.returnValue(of([student1, student2]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule],
      providers: [
        {provide: StudentDisciplineService , useValue: studentDisciplineServiceSpy}
      ],
      declarations: [StudentDisciplineComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup initial form with correct form controls', ()=> {
    const expectedFormValue = {
      student: '',
      violation: '',
      punishment: ''
    };

    expect(component.form.value).toEqual(expectedFormValue);
  });

  it('should display student select element', () => {
    const studentSelect = fixture.debugElement.query(By.css('#student'));
    expect(studentSelect).toBeTruthy();
  });

  it('should call getStudents from the StudentDisciplineService and set the response to the components students array property', ()=> {
    const expectedStudents = [student1, student2];
    expect(component.students).toEqual(expectedStudents);
    expect(studentDisciplineServiceSpy.getStudents).toHaveBeenCalled();
  });

  it('should display option for each student in the student dropdown', ()=> {
    component.students = [student1, student2];
    const studentSelect = fixture.debugElement.query(By.css('#student'));
    const options = studentSelect.queryAll(By.css('option'));

    expect(options.length).toEqual(2);

    const expectedText1 = student1.firstName + ' ' + student1.lastName;
    expect(options[0].nativeElement.textContent).toEqual(expectedText1);
  });
});
