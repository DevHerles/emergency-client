import * as types from './ActionTypes';

let nextMessageId = 0
let nextUserId = 0

export const addMessage = (message, author) => ({
	type: types.ADD_MESSAGE,
	id: nextMessageId++,
	message,
	author
})

export const addUser = name => ({
  type: types.ADD_USER,
  id: nextUserId++,
  name
});

export const messageReceived = (data) => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,
  data
});