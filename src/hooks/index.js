import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

const collatedTasksExist = () => {};

export const useTasks =  selectedProject => {
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
        let unsubsribe =  firebase
        .firestore()
        .collection('tasks')
        .where('userId', '==', 'fPuPt4lGWJB1VJFHSkqi');

        unsubsribe = 
            selectedProject && !collatedTasksExist(selectedProject) ? 
            (unsubsribe = unsubsribe.where('projectId', '==', selectedProject))
            : selectedProject === 'TODAY'
            ? (unsubsribe = unsubsribe.where(
                'date',
                '==',
                moment().format('DD/MM/YYYY')
                ))
            : selectedProject === 'INBOX' || selectedProject === 0
            ? (unsubsribe =  unsubsribe.where('date', '==', ''))
            : unsubsribe;
    }, [selectedProject]);
}