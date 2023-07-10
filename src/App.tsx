/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import './globals.css';
import {v4 as uuidv4} from 'uuid';
import plusIcon from './assets/plus.svg'
import fileIcon from './assets/file.svg'
import styles from './App.module.css'

import { Header } from "./components/Header"
import { Task, TaskType } from './components/Task';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

const tasks = [
  {
    id: uuidv4(),
    title: 'Passear com o Cachorro',
    isCompleted: false,
  },
]


function App() {

  const [ listOfTasks, setListOfTasks ] = useState([...tasks])
  const [ newTaskText, setNewTaskText ] = useState('')
  const [ count, setCount ] = useState(listOfTasks.length)
  const [ completedCount, setCompletedCount ] = useState(() => {
      const completeTasks = listOfTasks.filter(task => {
        return task.isCompleted
      })

      return completeTasks.length
    }
  )

  function handleTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo é obrigatório')
    console.log(event);
}

  // Cria uma nova task
  function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    const currentListTasks = listOfTasks;

    setListOfTasks([...currentListTasks, { id: uuidv4(), title: newTaskText, isCompleted: false  }]);
    
    setCount(listOfTasks.length);
    setNewTaskText('');
  
  }

  // remover uma task // 

  function handleDeleteTask(taskToDelete: TaskType) {
    const taskListWithoutDeleteOne = listOfTasks.filter(task => {
      return task !== taskToDelete
    })

    setListOfTasks([...taskListWithoutDeleteOne])
    setCount(taskListWithoutDeleteOne.length)
  }

  // marcar como completa //

  function handleCompleteTask(taskToUpdate: TaskType) {
    const updatedTask = listOfTasks.filter(task => {
      return task.id === taskToUpdate.id
    });

    const completeTask = updatedTask[0];
    const newObjTask = {
      ...completeTask, isCompleted: completeTask.isCompleted ? false : true
    }

    const newList = listOfTasks.filter(tasks => tasks.id !== newObjTask.id)
    const newCurrentList = [ ...newList, newObjTask]

    setListOfTasks(newCurrentList)

    const newValue = newCurrentList.filter( task => { return task.isCompleted === true})
    
    setCompletedCount(newValue.length)
    console.log(newValue)
  }


  // Exibe a Lista de Tasks //
  const hasTasks = listOfTasks.length !== 0
  
  return (
    <div>
      <Header />
      <div className={styles.app}>
        <main className={styles.content}>
          <form onSubmit={handleCreateTask} className={styles.newTaskForm}>
            <input onChange={handleTaskChange} onInvalid={handleNewCommentInvalid} placeholder='Adicione uma nova tarefa' name='task' type="text" value={newTaskText} required />
            <button type='submit'>Create<img src={plusIcon}></img></button>
          </form>
          <div className={styles.counters}>
            <p className={styles.counterParagraph}><strong>Total de tarefas</strong></p>
            <span>{listOfTasks.length}</span>

            <p className={styles.countersCompleteParagraph}><strong>Concluídas</strong></p>
            <span>{completedCount} de {listOfTasks.length}</span>
          </div>
          <div className={styles.taskList}>
            {
              !hasTasks ? 
              <>
                <img src={fileIcon} />
                <p><strong>Você ainda não tem tarefas cadastradas</strong><br />
                  Crie tarefas e organize seus itens a fazer
                </p>
              </>  : listOfTasks.map(task => {
                return (
                  <Task
                  key={ task.id }
                  task={task}
                  onDeleteTask={handleDeleteTask}
                  onCompletedTask={handleCompleteTask}
                  />
                )
              })
            }
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
