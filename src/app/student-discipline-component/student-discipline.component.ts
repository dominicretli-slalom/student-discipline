import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Student} from "../student";
import {StudentDisciplineService} from "../student-discipline.service";

@Component({
  selector: 'app-student-discipline',
  templateUrl: './student-discipline.component.html',
  styleUrls: ['./student-discipline.component.css']
})
export class StudentDisciplineComponent implements OnInit {
  students$ = this.studentDisciplineService.getStudents();
  punishments: string[];
  form: FormGroup = this.formBuilder.group({
    student: [''],
    violation: [''],
    punishment: [''],
  })

  constructor(private formBuilder: FormBuilder, private studentDisciplineService: StudentDisciplineService) {
  }

  ngOnInit(): void {
    // this.studentDisciplineService.getStudents().subscribe(response => {
    //   this.students = response;
    // });
    this.studentDisciplineService.getPunishments().subscribe(response => {
      this.punishments = response;
    })
  }

}
