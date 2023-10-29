import { useState } from 'react'
import classes from './formTodo.module.sass'


export const FormTodo = ({ addTodo }) => {
    const [ title, setTitle ] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        if (!title.trim()) return alert('Вы не можете оставить поле пустым')
        const newTodo = {
            id: Date.now(),
            title: title,
            completed: false
        }
        addTodo(newTodo)
        setTitle('')
    }

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <h3>Создать задачу</h3>
            <input
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                type="text"
                placeholder={'Введите свою заметку...'}
                className={'input'}
                required
            />
            <button className={'button'}>
                Добавить задачу
            </button>
        </form>
    )
}