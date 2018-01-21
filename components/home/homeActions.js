// Actions for Home Component
export const socketData = geod => ({  
    type: 'FROM_SOCKET',
    geod,
});

export const selectData = (select) => ({  
    type: 'FROM_SELECT',
    select,
});