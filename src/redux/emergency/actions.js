import {
    EMERGENCY_UNAUTHORIZED,
    EMERGENCY_GET_LIST,
    EMERGENCY_GET_LIST_SUCCESS,
    EMERGENCY_GET_LIST_ERROR,
    EMERGENCY_GET_LIST_WITH_FILTER,
    EMERGENCY_GET_LIST_WITH_ORDER,
    EMERGENCY_GET_LIST_SEARCH,
    EMERGENCY_ADD_ITEM,
    EMERGENCY_ADD_ITEM_SUCCESS,
    EMERGENCY_ADD_ITEM_ERROR,
    EMERGENCY_SELECTED_ITEMS_CHANGE,
    EMERGENCY_DELETE_ITEM,
    EMERGENCY_DELETE_ITEM_SUCCESS,
    EMERGENCY_DELETE_ITEM_ERROR,
    SOCKET_EMERGENCY_ADD_ITEM
} from '../actions';

export const unauthorizedEmergency = () => ({
    type: EMERGENCY_UNAUTHORIZED
});

export const getEmergencyList = () => ({
    type: EMERGENCY_GET_LIST
});

export const getEmergencyListSuccess = (items) => ({
    type: EMERGENCY_GET_LIST_SUCCESS,
    payload: items
});

export const getEmergencyListError = (error) => ({
    type: EMERGENCY_GET_LIST_ERROR,
    payload: error
});

export const getEmergencyListWithFilter = (column, value) => ({
    type: EMERGENCY_GET_LIST_WITH_FILTER,
    payload: { column, value }
});

export const getEmergencyListWithOrder = (column) => ({
    type: EMERGENCY_GET_LIST_WITH_ORDER,
    payload: column
});

export const getEmergencyListSearch = (keyword) => ({
    type: EMERGENCY_GET_LIST_SEARCH,
    payload: keyword
});

export const addEmergencyItem = (item) => ({
    type: EMERGENCY_ADD_ITEM,
    payload: item
});

export const addSocketEmergencyItem = (item) => ({
    type: SOCKET_EMERGENCY_ADD_ITEM,
    payload: item
});

export const addEmergencyItemSuccess = (items) => ({
    type: EMERGENCY_ADD_ITEM_SUCCESS,
    payload: items
});

export const addEmergencyItemError = (error) => ({
    type: EMERGENCY_ADD_ITEM_ERROR,
    payload: error
});

export const deleteEmergencyItem = (item) => ({
    type: EMERGENCY_DELETE_ITEM,
    payload: item
})

export const deleteEmergencyItemSuccess = (items) => ({
    type: EMERGENCY_DELETE_ITEM_SUCCESS,
    payload: items
})

export const deleteEmergencyItemError = (error) => ({
    type: EMERGENCY_DELETE_ITEM_ERROR,
    payload: error
})

export const selectedEmergencyItemsChange = (selectedItems) => ({
    type: EMERGENCY_SELECTED_ITEMS_CHANGE,
    payload: selectedItems
});
