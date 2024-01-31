import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Select, Typography } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
//import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';

/**
 * You will find globals from this file useful!
 */
import { GET_DEFAULT_HEADERS, BASE_API_URL , MY_BU_ID } from "./globals";
import { IUniversityClass, IStudent, IAssignment, IGrades} from "./types/api_types";
import BasicTable from "./components/GradeTable";



// citation for fetching api functions 
// Title: Fetching Data in React - Complete Tutorial
// Author: Cosden Solutions
// Date: May 2023
// Availability: Youtube:https://youtu.be/00lxm_doFYw?si=9StyAeczrptrwD7N



  function App() {
    // You will need to use more of these!
    const [currClassId, setCurrClassId] = useState<string>("");
    const [classList, setClassList] = useState<IUniversityClass[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [classAssignments, setClassAssignments] = useState([]);
    const [SelectedClass, setSelectedClass] = useState<string | null>(null);
    const [grades, setGrades] = useState<Map<string, number>>(new Map());
    const [StudentClassId, setStudentClassId] = useState<string[]>([]);
    const [StudentId, setStudentId] = useState<string[]>([]);
    const [tableData, setTableData] = useState<Array<{ studentId: any, studentName: any, universityID: any, className: any, semester: 'fall2022' }>>([]);


// citations for useEffect

// Title: RESTful API using Typescript and React Hooks
// Author: Diego Lorenzo Guana
// Date: August 7, 2023
// Availability:https://medium.com/@diegogauna.developer/restful-api-using-typescript-and-react-hooks-3d99bdd0cd39

// Title: Fetch and display data from an API with react
// Author: Rohanmalo
// Date: September 8, 2021
// Availability: https://medium.com/@64rohanmalo/fetch-and-display-data-from-an-api-with-react-228de56bb446 

// Title: Tutorial: Tic-Tac-Toe
// Availability: https://react.dev/learn/tutorial-tic-tac-toe 

// Title: How to correctly use TypeScript types for your API response
// Author: Vaclav Hrouda
// Date: Jan 31, 2022
// Availability: https://medium.com/@wujido20/runtime-types-in-typescript-5f74fc9dc6c4


    useEffect(() => {
      // classes selected should be under fall 2022 semester
      fetchClasses("fall2022");
    }, []);
    
    const handleClassChange = (event: SelectChangeEvent) => {
      // keep track of class selected from drag down option
      setCurrClassId(event.target.value as string); 
    };

    useEffect(() => {
      if (currClassId) {
        fetchStudents(currClassId);
        }
      }, [currClassId]); 


      useEffect(() => {
        // attempting to retrieve all the data from api requests to render data into table
        if (currClassId) {
          fetchSelectedClass(currClassId).then((classData) => {
            const name = classData;
      
            fetchStudents(currClassId).then(studentIds => {
              if (Array.isArray(studentIds)) {
                Promise.all(studentIds.map(studentId => 
                  Promise.all([
                    fetchNames(studentId), 
                    fetchUniversityIds(studentId) 
                  ]).then(([name, universityId]) => ({ studentId, name, universityId }))
                )).then(studentInfo => {
                  const combined = studentInfo.map(info => ({
                    studentId: info.studentId,
                    studentName: info.name,
                    universityID: info.universityId,
                    className: name,
                    semester: 'fall2022' as const 
                  }));
      
                  setTableData(combined);
                });
              }
            });
          });
        }
      }, [currClassId]);
   

      
// fetching all the classes provided in fall 2022 semester
    const fetchClasses = async (semester: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}/class/listBySemester/${semester}?BUID=${MY_BU_ID}`, {
          headers: GET_DEFAULT_HEADERS(),
        });
        const data = await response.json();
        setClassList(data);
      } catch (e:any) {
        setError("Failed to fetch data: " + e.message);
      } finally {
        setIsLoading(false);
      }
    };




  // fetch all enrolled students for a class based on class ID which returns students id
   
   const fetchStudents = async (classId: string) => {
    setIsLoading(true);
    try{
      const response = await fetch(`${BASE_API_URL}/class/listStudents/${classId}?BUID=${MY_BU_ID}`, {
        headers: GET_DEFAULT_HEADERS()});
      const data = (await response.json());
      console.log(data);
      return data.map((student: any) => student.studentId);
      } catch (e:any) {
        setError("Failed to fetch data: " + e.message);
      } finally {
       setIsLoading(false)
      }
    };



    
    // fetching students names based on their student id
 
    const fetchNames = async (studentId: string):  Promise<string[] | void>  => {
      setIsLoading(true);
      try{
        const response = await fetch(`${BASE_API_URL}/student/GetById/${studentId}?BUID=${MY_BU_ID}`, {
          headers: GET_DEFAULT_HEADERS()});
        const data = (await response.json());
        const studentname = data.map((student: IStudent) => student.name);
        console.log(studentname);
        return studentname;
        //setStudentId(studentname);
        } catch (e:any) {
          setError("Failed to fetch data: " + e.message);
        } finally {
         setIsLoading(false)
        }
      }; 




      // fetching university id based on student id

      const fetchUniversityIds = async (studentId: string): Promise<string[] | void> => {
      setIsLoading(true);
      try{
        const response = await fetch(`${BASE_API_URL}/student/GetById/${studentId}?BUID=${MY_BU_ID}`, {
          headers: GET_DEFAULT_HEADERS()});
        const data = (await response.json());
        const universityid = data.map((student: IStudent) => student.universityId);
        console.log(universityid);
        return universityid;
        //setStudentId(universityid);
        } catch (e:any) {
          setError("Failed to fetch data: " + e.message);
        } finally {
         setIsLoading(false)
        }
      }; 
      const updateStudentId = (universityIds: string[]) => {
  setStudentId(universityIds);
};
    



     // fetching assignment weights and ids to match with students' assignments based on classId

    const fetchAssignmentsInfo = async (classId: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}/class/listAssignments/${classId}?BUID=${MY_BU_ID}`, {
          headers: GET_DEFAULT_HEADERS()});
        const data = await response.json();
          
          // get only assignmentId and weight
        const assignmentsWithIdAndWeight = data.map((assignment: IAssignment) => ({
          assignmentId: assignment.assignmentID,
          weight: assignment.weight
          }));
      
        console.log(assignmentsWithIdAndWeight);
        setClassAssignments(assignmentsWithIdAndWeight);
      } catch (e:any) {
        setError("Failed to fetch data: " + e.message);
      } finally {
        setIsLoading(false);
      }
    };



    // fetching curClassId's class name based on classId

    const fetchSelectedClass = async (classId: string): Promise<string | void> => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}/class/GetById/${classId}?BUID=${MY_BU_ID}`, {
          headers: GET_DEFAULT_HEADERS()});
        const data = await response.json();
        console.log(data);
        return data;
        //setSelectedClass(data);
      } catch (e:any) {
        setError("Failed to fetch data: " + e.message);
      } finally {
        setIsLoading(false);
      }
    };
    const updateSelectedClass = (name: string) => {
      setSelectedClass(name);
    };



    // fetching grades for students based on studentId and classId

    const fetchGrades = async (studentId: string, classId: string): Promise<void> =>{
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}/student/listGrades/${studentId}/${classId}?BUID=${MY_BU_ID}`, {
          headers: GET_DEFAULT_HEADERS()});
        const data: IGrades[] = await response.json();
        console.log(data);
        let allGrades = new Map<string, number>();
        data.forEach(gradeEntry => {
          gradeEntry.grades.forEach((grade, assignmentId) => {
            allGrades.set(assignmentId, grade);
          });
        });
        setGrades(allGrades);
      } catch (e:any) {
        setError("Failed to fetch data: " + e.message);
      } finally {
        setIsLoading(false);
      }
    };
      

      
      

    const fetchSomeData = async () => {
      const res = await fetch("https://cat-fact.herokuapp.com/facts/", {
        method: "GET",
      });
      const json = await res.json();
      console.log(json);
    };
  
    // citation for displaying data 

    // title: React fetch data from API and display in table
    // author: Abhishek EH
    // date: November 24, 2022
    // availability: https://www.codingdeft.com/posts/react-fetch-data-api-display-table/#google_vignette

    // title: Handling onClick event in React with examples
    // author: Abhishek EH
    // date: October 9, 2021
    // availability: https://www.codingdeft.com/posts/react-onclick-event-with-examples/

    // title:React MUI FormControl API
    // availability: https://www.geeksforgeeks.org/react-mui-formcontrol-api/ 
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Grid container spacing={2} style={{ padding: "1rem" }}>
          <Grid xs={12} container alignItems="center" justifyContent="center">
            <Typography variant="h2" gutterBottom>
              Spark Assessment
            </Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography variant="h4" gutterBottom>
              Select a class
            </Typography>
            <div style={{ width: "100%" }}>
              <Select fullWidth={true} label="Class" value={currClassId} onChange={handleClassChange}>
                {/* You'll need to place some code here to generate the list of items in the selection */}
                {classList.map((classItem: IUniversityClass) => (
                  <MenuItem key={classItem.classId} value={classItem.classId}>
                      {classItem.title}
                  </MenuItem>
                  ))}
              </Select>
            </div>
          </Grid>
          <Grid xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Final Grades
            </Typography>
            <div> <BasicTable /> </div>
          </Grid>
        </Grid>
      </div>
    );
  }
  
  export default App;
  

