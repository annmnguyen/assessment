/**
 * This file can be used to store types and interfaces for data received from the API.
 * It's good practice to name your interfaces in the following format:
 * IMyInterfaceName - Where the character "I" is prepended to the name of your interface.
 * This helps remove confusion between classes and interfaces.
 */

/**
 * This represents a class as returned by the API
 */


enum ClassSemester {
  fall2022 = 'fall2022',
  spring2023 = 'spring2023',
  summer2023 = 'summer2023',
 }

 enum ClassStatus {
  active = 'active',
  inactive = 'inactive',
 }
 

export interface IUniversityClass {
  classId: string;
  title: string;
  description: string;
  meetingTime: string;
  meetingLocation: string;
  status: ClassStatus;
  semester: ClassSemester;
}

export interface IAssignment {
  assignmentID: string;
  classId: string;
  date: string;
  weight: number;

}


export interface IGrades {
  classId: string;
  grades: Map<string, number>;
  name: string;
  studentId: string;

}

enum StudentStatus {
  enrolled = 'enrolled',
  graduated = 'graduated',
  unenrolled = 'enrolled',
}

export interface IStudent {
  dateEnrolled: string;
  name: string;
  status: StudentStatus;
  universityId: string;
}

export interface IGradeTableRows {
  studentId: string;
  studentName: string;
  universityId: string;
  className: string;
  semester: string;

}

export interface IGradeTableProps {
  currClassID: string;
  classList: [];
  studentData: IGradeTableRows[];
}

export interface ISelection {
  class: string;
}

// cite from dependent drop in react typescript youtube video
export interface IDropdownProps {
  label?: string;
  selection: ISelection[];
}