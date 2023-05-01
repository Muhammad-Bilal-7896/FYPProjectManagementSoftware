import {
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

const addTask = async (
    taskObj: any,
    email: string,
    projectID: string,
    projects: any // Add the projects array as an argument
) => {
    const db = getFirestore();
    const projectRef = doc(db, "Data", "Projects", email, projectID);

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === projectID.toString()) {
            // Add a new task to the ProjectTasks array
            const newTask = taskObj;
            projects[i].ProjectTasks.push(newTask);
            const updatedProject: any = projects[i];
            console.log("Updated Project : ", updatedProject);

            try {
                await updateDoc(projectRef, updatedProject);
                console.log("New task added successfully");
                let message: string = "New task added successfully";
                enqueueSnackbar(
                    message,
                    {
                        variant: 'success', 
                        anchorOrigin: { vertical: 'bottom', horizontal: 'right' } 
                    },
                )
            } catch (error: any) {
                console.error("Error adding new task:", error);
                alert("Error adding new task:" + error?.Message);
            }
            break;
        }
    }
};

export default addTask;
