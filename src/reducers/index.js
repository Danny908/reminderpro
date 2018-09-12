import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS, UPDATE_REMINDERS_STATUS } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const reminder = (action) => {
  let  { text, dueDate, status } = action;
  return {
    text,
    dueDate,
    status,
    id: Math.random()
  }
}

const removeById = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id !== id);
  return reminders;
}

const changeStatus = (state = [], action) => {
  const reminders = state.map(reminder => {
    if (Date.parse(reminder.dueDate) - Date.parse(new Date()) < 0 && reminder.status === 'TODO') {
      return Object.assign({}, reminder, {status: 'EXPIRED'});
    }
    if (Date.parse(reminder.dueDate) - Date.parse(new Date()) > 0 && reminder.id === action.id && action.status !== '') {
      return Object.assign({}, reminder, {status: 'DONE'});
    }
    return reminder;
  });
  return reminders;
}

const reminders = (state = [], action) => {
  let reminders = null;
  state = read_cookie('reminders');
  switch(action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      bake_cookie('reminders', reminders);
      return reminders;
    case DELETE_REMINDER:
      reminders = removeById(state, action.id);
      bake_cookie('reminders', reminders);
      return reminders;
    case CLEAR_REMINDERS:
      reminders = [];
      bake_cookie('reminders', reminders);
      return reminders;
    case UPDATE_REMINDERS_STATUS:
      reminders = changeStatus(state, action);
      bake_cookie('reminders', reminders);
      return reminders;
    default:
      return state;
  }
}

export default reminders;