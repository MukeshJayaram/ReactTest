//* Reducers for Home Component
import { combineReducers } from 'redux';

export const geod = (state = {}, action) => { 
    switch (action.type) {
        case 'FROM_SOCKET':
            return action.geod;
        default:
            return state;
    }
};
export const select = (state = {}, action) => { 
    switch (action.type) {
        case 'FROM_SELECT':
            return action.select;
        default:
            return state;
    }
};

//combining reducers
export const reducers = combineReducers({  
    geod,
    select
});
