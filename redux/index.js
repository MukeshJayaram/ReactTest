import {  applyMiddleware,  combineReducers,  createStore } from 'redux';

// actions.js
export const socketData = geod => ({  
    type: 'FROM_SOCKET',
    geod,
});


export const selectData = (select) => ({  
    type: 'FROM_SELECT',
    select,
});

// reducers.js
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


// store.js
export function configureStore(initialState = {}) {  
    const store = createStore(reducers, initialState);
    return store;
};

export const store = configureStore();  