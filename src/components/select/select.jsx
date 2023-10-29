import classes from './select.module.sass'


export const Select = ({ setFilter }) => {

    return (
        <select onChange={({ target }) => setFilter(target.value)} className={classes.Select}>
            <option value="all">Все</option>
            <option value="completed">Выполненные</option>
            <option value="notCompleted">Не выполненные</option>
        </select>
    )
}
