import { useState } from 'react'
import classes from './todoCard.module.sass'


export const TodoCard = ({ changeCompleted, removeTodo, item, editingTodo, selectEdit, isEdit }) => {
    const [ newTitle, setNewTitle ] = useState(item.title || '')

    const saveEdit = () => {
        if (!newTitle.trim()) return alert('Вы не можете оставить поле пустым')
        editingTodo({...item, title: newTitle})
    }

    const handleCancel = () => {
        setNewTitle(item.title)
        selectEdit(null)
    }

    if (isEdit) return (
        <div className={`${classes.TodoCard} ${item.completed ? classes.Completed : classes.NotComp}`}>
            <input
                value={newTitle}
                onChange={({ target }) => setNewTitle(target.value)}
                type="text"
            />
            <div className={classes.TodoButtons}>
                <button onClick={saveEdit}>Сохранить</button>
                <button onClick={handleCancel}>Отмена</button>
                <button onClick={() => removeTodo(item.id)}>Удалить</button>
            </div>
        </div>
    )
    else return (
        <div className={`${classes.TodoCard} ${item.completed ? classes.Completed : classes.NotComp}`}>
            <p>{item.title}</p>
            <div className={classes.TodoButtons}>
                <button onClick={() => removeTodo(item.id)}>Удалить</button>
                <button onClick={() => selectEdit(item.id)}>Редактировать</button>
                <button onClick={() => changeCompleted(item.id)}>
                    {item.completed ? 'Выполнено' : 'Не выполнено'}
                </button>
            </div>
        </div>
    )
}