import {
    CALLS_GET_LIST,
    CALLS_GET_LIST_SUCCESS,
    CALLS_GET_LIST_ERROR,
    CALLS_GET_LIST_WITH_FILTER,
    CALLS_GET_LIST_WITH_ORDER,
    CALLS_GET_LIST_SEARCH,
    CALLS_ADD_ITEM,
    CALLS_ADD_ITEM_SUCCESS,
    CALLS_ADD_ITEM_ERROR,
    CALLS_SELECTED_ITEMS_CHANGE
} from '../actions';


export const getCallsList = () => ({
    type: CALLS_GET_LIST
});

export const getCallsListSuccess = (items) => ({
    type: CALLS_GET_LIST_SUCCESS,
    payload: items
});

export const getCallsListError = (error) => ({
    type: CALLS_GET_LIST_ERROR,
    payload: error
});

export const getCallsListWithFilter = (column, value) => ({
    type: CALLS_GET_LIST_WITH_FILTER,
    payload: { column, value }
});

export const getCallsListWithOrder = (column) => ({
    type: CALLS_GET_LIST_WITH_ORDER,
    payload: column
});

export const getCallsListSearch = (keyword) => ({
    type: CALLS_GET_LIST_SEARCH,
    payload: keyword
});

export const addCallsItem = (item) => ({
    type: CALLS_ADD_ITEM,
    payload: item
});

export const addCallsItemSuccess = (items) => ({
    type: CALLS_ADD_ITEM_SUCCESS,
    payload: items
});

export const addCallsItemError = (error) => ({
    type: CALLS_ADD_ITEM_ERROR,
    payload: error
});

export const selectedCallsItemsChange = (selectedItems) => ({
    type: CALLS_SELECTED_ITEMS_CHANGE,
    payload: selectedItems
});
