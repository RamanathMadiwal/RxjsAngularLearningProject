import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { CourseRequested, CourseActionTypes, CourseLoaded, AllCoursesRequested, AllCoursesLoaded } from "./course.actions";
import { CoursesService } from "./services/courses.service";
import { mergeMap, map, withLatestFrom, filter } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { allCoursesLoaded } from "./courses.selectors";
import { AppState } from "../reducers";


@Injectable()
export class CourseEffects {
       @Effect()
       loadCourses$ =this.actions$.pipe(
                           ofType<CourseRequested>(CourseActionTypes.CourseRequested),
                           mergeMap(action =>this.coursesService.findCourseById(action.payload.courseId)),
                           map(course=> new CourseLoaded({course})
       ));

       @Effect()
       loadAllCourses$ =this.actions$.pipe(ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
       withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
       filter(([action,allCoursesLoaded])=>!allCoursesLoaded),
       mergeMap(action=>this.coursesService.findAllCourses()),map(courses=> new AllCoursesLoaded({courses})))
       
       constructor( private actions$:Actions , private coursesService: CoursesService,private store:Store<AppState>){

       }
}