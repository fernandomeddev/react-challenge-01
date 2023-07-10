import { Trash } from 'phosphor-react'
import checkedIcon from '../assets/checkedIcon.svg';
import circleIcon from '../assets/circleIcon.svg';

import styles from './Task.module.css';
import { useState } from 'react';

export interface  TaskType {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface TaskProps {
    task: TaskType
    onDeleteTask: (task: TaskType) => void;
    onCompletedTask: (task: TaskType) => void;
}

export function Task({ task, onDeleteTask, onCompletedTask }: TaskProps){

    // Marcar uma tarefa como concluida.
    // Deletar uma tarefa.

    const [ checked, setChecked ] = useState(task.isCompleted)

    function handleDeleteTask(){
        onDeleteTask(task)
    }
    
    function handleCompletedTask(){
        onCompletedTask(task)
        
        const currentState = checked;

        if (!currentState) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }
    
    return (
        <div className={styles.task}>
            <div className={styles.content}>
                {
                    checked ? 
                    <>
                        <img className={styles.checkButton}  src={checkedIcon} onClick={handleCompletedTask} alt="" />
                    </> : 
                    <>
                        <img className={styles.checkButton} onClick={handleCompletedTask} src={circleIcon} alt="" />
                    </>
                }
                
                
                
            </div>
            <div className={styles.content}>
                <p className={ task.isCompleted ? styles.taskCompleted : styles.content}>
                    {task.title}
                </p>
            </div>
            <div className={styles.trash}>
                <Trash onClick={handleDeleteTask} className={styles.trashIcon} size={16} />
            </div>
        </div>
    )
}