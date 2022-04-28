import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentDisciplineComponent} from './student-discipline.component';
import {BrowserModule, By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StudentDisciplineService} from "../student-discipline.service";
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

  const studentDisciplineServiceSpy = jasmine.createSpyObj('StudentDisciplineService', ['getStudents', 'getPunishments']);
  studentDisciplineServiceSpy.getStudents.and.returnValue(of([student1, student2]));
  studentDisciplineServiceSpy.getPunishments.and.returnValue(of(['No Recess', 'Punishment 2']));

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

  describe('ngOnInit', ()=> {
    it('should call getStudents from the StudentDisciplineService and set the response to the components students array property', ()=> {
      const expectedStudents = [student1, student2];
      expect(component.students).toEqual(expectedStudents);
      expect(studentDisciplineServiceSpy.getStudents).toHaveBeenCalled();
    })

    it('should call getPunishments from the StudentDisciplineService and set the response to the components punishments array', ()=> {
      const expectedPunishments = ['No Recess', 'Punishment 2'];
      expect(component.punishments).toEqual(expectedPunishments);
      expect(studentDisciplineServiceSpy.getPunishments).toHaveBeenCalled();
    })


  });

  it('should display student select element', () => {
    const studentSelect = fixture.debugElement.query(By.css('#student'));
    expect(studentSelect).toBeTruthy();
  });

  it('should display violation input element', () => {
    const violationInput = fixture.debugElement.query(By.css('#violation'));
    expect(violationInput).toBeTruthy();
  });

  it('should display selected punishment dropdown selection element', () => {
    const punishmentDropdownSelection = fixture.debugElement.query(By.css('#punishment'));
    expect(punishmentDropdownSelection).toBeTruthy();
  });

  it('should display option for each student in the student dropdown', ()=> {
    component.students = [student1, student2];
    const studentSelect = fixture.debugElement.query(By.css('#student'));
    const options = studentSelect.queryAll(By.css('option'));

    expect(options.length).toEqual(2);

    const expectedText1 = student1.firstName + ' ' + student1.lastName;
    expect(options[0].nativeElement.textContent).toEqual(expectedText1);
  });

  it('should display option for each punishment in the punishment dropdown', ()=> {
    const punishment1 = 'punishment1';
    const punishment2 = 'punishment2';
    const punishment3 = 'punishment3';
    component.punishments = [punishment1, punishment2, punishment3];

    fixture.detectChanges();

    const punishmentSelect = fixture.debugElement.query(By.css('#punishment'));
    const options = punishmentSelect.queryAll(By.css('option'));

    expect(options.length).toEqual(3);

    const expectedPunishment1 = punishment1;
    const expectedPunishment2 = punishment2;
    const expectedPunishment3 = punishment3;

    expect(options[0].nativeElement.textContent).toEqual(expectedPunishment1);
    expect(options[1].nativeElement.textContent).toEqual(expectedPunishment2);
    expect(options[2].nativeElement.textContent).toEqual(expectedPunishment3);
  });
});
