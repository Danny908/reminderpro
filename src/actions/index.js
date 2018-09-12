import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS, UPDATE_REMINDERS_STATUS } from '../constants';

export const addReminder = (text, dueDate) => {
  const action  = {
    type: ADD_REMINDER,
    status: 'TODO',
    text,
    dueDate,
  }
  return action;
}

export const deleteReminder = (id) => {
  const action = {
    type: DELETE_REMINDER,
    id
  }
  return action;
}

export const clearReminders = _ => {
  return {
    type: CLEAR_REMINDERS
  }
}

export const updateRemindersStatus = (status = '', id) => {
  return {
    type: UPDATE_REMINDERS_STATUS,
    id,
    status
  }
}