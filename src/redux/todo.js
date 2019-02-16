// import { fromJS } from 'immutable';

// const action = name => `/oauth/${name}`;

// export const USER_STATUS = action('USER_STATUS');
// export const CREATE_CLIENT_OAUTH = action('CREATE_CLIENT_OAUTH');

// export const userstatus = () => ({ type: 'USER_STATUS' });
export const taskSearch = payload => ({ type: 'TASK_SEARCH', payload });
export const taskCompleted = payload => ({ type: 'TASK_COMPLETED', payload });
export const taskNotCompleted = payload => ({ type: 'TASK_NOT_COMPLETED', payload });

// export const usersData = () => ({ type: 'USER_DATA' });
// export const createClientOauth = () => ({ type: CREATE_CLIENT_OAUTH });

const initialState = {
	search: '',
	completed: "",
	NotCompleted:""
	
};

const todo = (state = initialState, action) => {
	switch (action.type) {
		// case 'USER_STATUS':
		// 	return state.user_status + 1;
		// case 'TRIGGER':
		// 	return { ...state, trigger: action.payload };
		case 'TASK_NOT_COMPLETED':
			return { ...state, NotCompleted: action.payload };
		case 'TASK_COMPLETED':
			return { ...state, completed: action.payload };
        case 'TASK_SEARCH':
        console.log('vsvwsa',action.payload)        
			return { ...state, search: action.payload };
		default:
			return state;
	}
};

export default todo;
