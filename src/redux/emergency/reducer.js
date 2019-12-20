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

const INIT_STATE = {
	allCallsItems: null,
	callsItems: null,
	error: '',
	filter: null,
	searchKeyword: '',
	orderColumn: null,
	loading: false,
	labels: [
		{ label: "EDUCATION", color: "secondary" },
		{ label: "NEW FRAMEWORK", color: "primary" },
		{ label: "PERSONAL", color: "info" }
	],
	orderColumns: [
		{ column: "title", label: "Title" },
		{ column: "category", label: "Category" },
		{ column: "status", label: "Status" },
		{ column: "label", label: "Label" },
	],
	categories: ["Flexbox", "Sass", "React"],
	selectedItems: []
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {

		case CALLS_GET_LIST:
			return { ...state, loading: false };

		case CALLS_GET_LIST_SUCCESS:
			return { ...state, loading: true, allCallsItems: action.payload, callsItems: action.payload };

		case CALLS_GET_LIST_ERROR:
			return { ...state, loading: true, error: action.payload };

		case CALLS_GET_LIST_WITH_FILTER:
			if (action.payload.column === '' || action.payload.value === '') {
				return { ...state, loading: true, callsItems: state.allCallsItems, filter: null };
			} else {
				const filteredItems = state.allCallsItems.filter((item) =>
					item[action.payload.column] === action.payload.value);
				return {
					...state, loading: true, callsItems: filteredItems, filter: {
						column: action.payload.column,
						value: action.payload.value
					}
				}
			}

		case CALLS_GET_LIST_WITH_ORDER:
			if (action.payload === '') {
				return { ...state, loading: true, callsItems: state.callsItems, orderColumn: null };
			} else {
				const sortedItems = state.callsItems.sort((a, b) => {
					if (
						a[action.payload] <
						b[action.payload]
					)
						return -1;
					else if (
						a[action.payload] >
						b[action.payload]
					)
						return 1;
					return 0;
				})
				return { ...state, loading: true, callsItems: sortedItems, orderColumn: state.orderColumns.find(x => x.column === action.payload) }
			}

		case CALLS_GET_LIST_SEARCH:
			if (action.payload === '') {
				return { ...state, callsItems: state.allCallsItems };
			} else {
				const keyword = action.payload.toLowerCase();
				const searchItems = state.allCallsItems.filter((item) =>
					item.title.toLowerCase().indexOf(keyword) > -1 || item.detail.toLowerCase().indexOf(keyword) > -1 || item.status.toLowerCase().indexOf(keyword) > -1 || item.category.toLowerCase().indexOf(keyword) > -1 || item.label.toLowerCase().indexOf(keyword) > -1);
				return { ...state, loading: true, callsItems: searchItems, searchKeyword: action.payload }
			}

		case CALLS_ADD_ITEM:
			return { ...state, loading: false };

		case CALLS_ADD_ITEM_SUCCESS:
			return { ...state, loading: true, allCallsItems: action.payload, callsItems: action.payload };

		case CALLS_ADD_ITEM_ERROR:
			return { ...state, loading: true, error: action.payload };

		case CALLS_SELECTED_ITEMS_CHANGE:
			return { ...state, loading: true, selectedItems: action.payload};
		default: return { ...state };
	}
}
