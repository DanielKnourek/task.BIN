import { createContext, FC, useReducer, Dispatch } from 'react'
import { Task } from '../../types/interfaces/Task'

//types
export type OrderByDate = 'byDateAsc' | 'byDateDesc'
export type FilterCompleted = 'completed' | 'incomplete'
export type method = OrderByDate | FilterCompleted | Task['status']['access']
export type sortTasksState = {
    methods: method[]
}
const defaultSortTasksState: sortTasksState = {
    methods: [],
}

type actionTypes = {
    type: 'removeAll',
} | {
    type: 'set',
    data: method[],
}

// Context
const State = createContext(defaultSortTasksState);
const Dispatch = createContext<Dispatch<actionTypes>>(() => { })

// Reducer
const reducer = (state: sortTasksState, action: actionTypes) => {
    switch (action.type) {
        case 'set':
            return {
                ...state,
                methods: action.data,
            };
        case 'removeAll':
            return {
                ...state,
                methods: ['byDateDesc'] as method[],
            };
        default:
            return state;
    }
}

// Provider
const Provider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultSortTasksState)

    return (
        <State.Provider value={state} >
            <Dispatch.Provider value={dispatch}> {children} </Dispatch.Provider>
        </State.Provider>
    )
}

// Export
export const ListFilters = {
    State,
    Dispatch,
    Provider,
}
