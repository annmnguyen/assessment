/**
 * This file contains some function stubs(ie incomplete functions) that
 * you MUST use to begin the work for calculating the grades.
 *
 * You may need more functions than are currently here...we highly encourage you to define more.
 *
 * Anything that has a type of "undefined" you will need to replace with something.
 */
import {  IUniversityClass, IGradeTableProps, IGradeTableRows } from "../types/api_types";
/**
 * This function might help you write the function below.
 * It retrieves the final grade for a single student based on the passed params.
 * 
 * If you are reading here and you haven't read the top of the file...go back.
 */

import fetchGrades from "../App";
import fetchStudentNames from "../App";
import fetchAssignmentsInfo from "../App";
import { Class } from "@mui/icons-material";
import {} from "../types/api_types";

//citations for learning how to write for loops

// Title: How to write for loops in React JSX
// Author:Abhishek EH
// Date: June 27, 2021
// Availability: https://www.codingdeft.com/posts/react-for-loop/

//citations for extracting the values based on assignmentid

// Title:How to fetch matching values from a dictionary object in Typescript?
// Date: 2021
// Availability: https://stackoverflow.com/questions/61468804/how-to-fetch-matching-values-from-a-dictionary-object-in-typescript

// Title: Iterate over array of objects in Typescript
// Date: 2018
// Availability: https://stackoverflow.com/questions/46213989/iterate-over-array-of-objects-in-typescript

// Title: Render fetched API json object in react component Typescript
// Date: 2022
// Availability: https://stackoverflow.com/questions/73262021/render-fetched-api-json-object-in-react-component-typescript

// Title: How to extract an Array from API response
// Date: 2022
// Availability: https://stackoverflow.com/questions/69736646/how-to-extract-an-array-from-api-response/


/**
export async function calculateStudentFinalGrade(
  studentID: string,
  classAssignments: IAssignment[],
  klass: IUniversityClass
): Promise<number> {


  // fetch student grades for param inputs
  //const studentGrade = await fetchGrades(studentID, klass.classId);


  let totalWeightedScore = 0;
  classAssignments.forEach(assignment => {
   // const grade = studentGrade.get(assignment.assignmentID) || 0;
    //totalWeightedScore += grade * assignment.weight;
  });

  return totalWeightedScore; 
}
 */

/**
 * You need to write this function! You might want to write more functions to make the code easier to read as well.
 * 
 *  If you are reading here and you haven't read the top of the file...go back.
 * 
 * @param classID The ID of the class for which we want to calculate the final grades
 * @returns Some data structure that has a list of each student and their final grade.
  */
/** 
export async function calcAllFinalGrade(classID: string): Promise<IGradeTableProps> {
  const studentList = await fetchStudentNames(classID);
  const assignments = await fetchAssignments(classID);

  }
  return { 
    studentid:
    finalgrade: 

  }
  ;
}
*/
