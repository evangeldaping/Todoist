import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';

export const useTasks =  selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
    
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

        unsubsribe = unsubsribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task ({
                id: taks.id,
                ...task.data(),
            }));

            setTasks(
                selectedProject === 'NEXT_7'
                ? newTasks.filter(
                    task => 
                        moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && 
                        task.archived !== true
                )
                : newTasks.filter(task => taks.archived !== true)
            );

            setArchivedTasks(newTasks.filter(task => task.archived !== falae));
        });

        return () => unsubsribe();
    }, [selectedProject]);

    return { tasks, archivedTasks };
};

const selectedProject = 1;
const { tasks, archivedTasks } = useTasks(selectedProject);

export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection('projects')
            .where('userId', '==', 'fPuPt4lGWJB1VJFHSkqi')
            .orderBy('projectId')
            .get()
            .then(snapshot => {
                const allProjects = snapshot.docs.map(project => ({
                    ...project.data(),
                    docId: project.id,
                }));

                if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                    setProjects(allProjects);
                }
            });
    }, [projects]);

    return { projects, setProjects };
};