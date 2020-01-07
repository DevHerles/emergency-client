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
	EMERGENCY_DELETE_ITEM_ERROR,
	EMERGENCY_DELETE_ITEM_SUCCESS
} from '../actions';

const INIT_STATE = {
	allEmergencyItems: null,
	emergencyItem: null,
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
	categories: ["Atendido", "Frustrado", "Cancelado"],
	selectedItems: []
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {

		case EMERGENCY_UNAUTHORIZED:
			return this.props.history.push('/');

		case EMERGENCY_GET_LIST:
			return { ...state, loading: false };

		case EMERGENCY_GET_LIST_SUCCESS:
			return { ...state, loading: true, allEmergencyItems: action.payload.data, emergencyItem: action.payload.data };

		case EMERGENCY_GET_LIST_ERROR:
			return { ...state, loading: true, error: action.payload };

		case EMERGENCY_GET_LIST_WITH_FILTER:
			if (action.payload.column === '' || action.payload.value === '') {
				return { ...state, loading: true, emergencyItem: state.allEmergencyItems, filter: null };
			} else {
				const filteredItems = state.allEmergencyItems.filter((item) =>
					item[action.payload.column] === action.payload.value);
				return {
					...state, loading: true, emergencyItem: filteredItems, filter: {
						column: action.payload.column,
						value: action.payload.value
					}
				}
			}

		case EMERGENCY_GET_LIST_WITH_ORDER:
			if (action.payload === '') {
				return { ...state, loading: true, emergencyItem: state.emergencyItem, orderColumn: null };
			} else {
				const sortedItems = state.emergencyItem.sort((a, b) => {
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
				return { ...state, loading: true, emergencyItem: sortedItems, orderColumn: state.orderColumns.find(x => x.column === action.payload) }
			}

		case EMERGENCY_GET_LIST_SEARCH:
			if (action.payload === '') {
				return { ...state, emergencyItem: state.allEmergencyItems };
			} else {
				const keyword = action.payload.toLowerCase();
				const searchItems = state.allEmergencyItems.filter((item) =>
					item.title.toLowerCase().indexOf(keyword) > -1 || item.detail.toLowerCase().indexOf(keyword) > -1 || item.status.toLowerCase().indexOf(keyword) > -1 || item.category.toLowerCase().indexOf(keyword) > -1 || item.label.toLowerCase().indexOf(keyword) > -1);
				return { ...state, loading: true, emergencyItem: searchItems, searchKeyword: action.payload }
			}

		case EMERGENCY_ADD_ITEM:
			return { ...state, loading: false };

		case EMERGENCY_ADD_ITEM_SUCCESS:
			return { ...state, loading: true, allEmergencyItems: action.payload, emergencyItem: action.payload };

		case EMERGENCY_ADD_ITEM_ERROR:
			return { ...state, loading: true, error: action.payload };

		case EMERGENCY_DELETE_ITEM:
			return { ...state, loading: false};

		case EMERGENCY_DELETE_ITEM_SUCCESS:
			return { ...state, loading: true, allEmergencyItems: action.payload, emergencyItem: action.payload };
		
		case EMERGENCY_DELETE_ITEM_ERROR:
			return { ...state, loading: true, error: action.payload };

		case EMERGENCY_SELECTED_ITEMS_CHANGE:
			return { ...state, loading: true, selectedItems: action.payload};
		default: return { ...state };
	}
}
