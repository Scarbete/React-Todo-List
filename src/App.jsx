import { useEffect, useState } from 'react'

import classes from './App.module.sass'
import { FormTodo } from './components/formTodo/formTodo.jsx'
import { TodoCard } from './components/todoCard/todoCard.jsx'
import { Select } from './components/select/select.jsx'


export const App = () => {
    const [ todos, setTodos ] = useState([])
    const [ isEdit, setIsEdit ] = useState(null)
    const [ filter, setFilter ] = useState('all')

    const addTodo = newTodo => setTodos([...todos, newTodo])

    const removeTodo = id => {
        const newTodos = todos.filter(item => item.id !== id)
        setTodos([...newTodos])
    }

    const changeCompleted = id => {
        setTodos(todos.map(item => item.id === id
            ? {...item, completed: !item.completed}
            : item)
        )
    }

    const editingTodo = (editedTodo) => {
        setIsEdit(null)
        setTodos(todos.map(item => item.id === editedTodo.id ? editedTodo : item))
    }

    const filteredTodos = todos.filter(item => {
        if (filter === 'all') return true
        else if (filter === 'completed') return item.completed
        else if (filter === 'notCompleted') return !item.completed
        else return item
    })

    useEffect(() => {
        const myLocalArray = JSON.parse(localStorage.getItem('todos'))
        if (myLocalArray && myLocalArray.length) setTodos(myLocalArray)
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [ todos ])

    return (
        <div className={classes.AppTodo}>
            <div className={'container'}>
                <FormTodo
                    addTodo={addTodo}
                />
                {todos.length > 0 && <Select setFilter={setFilter}/>}
                <div className={classes.TodoList}>
                    {todos.length
                        ? <>
                            {filteredTodos && filteredTodos.map(item =>
                                <TodoCard
                                    key={item.id}
                                    item={item}
                                    changeCompleted={changeCompleted}
                                    removeTodo={removeTodo}
                                    editingTodo={editingTodo}
                                    selectEdit={setIsEdit}
                                    isEdit={isEdit === item.id}
                                />
                            )}
                        </> : <h4 className={classes.NullTodo}>Задач нет</h4>
                    }

                </div>
            </div>
        </div>
    )
}