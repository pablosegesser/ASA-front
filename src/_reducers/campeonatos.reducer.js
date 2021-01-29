import { campeonatosConstants } from '../_constants/campeonatos.constants';

export function campeonatos(state = {}, action) {
    switch (action.type) {
        case campeonatosConstants.REGISTER_REQUEST:
            return{ 
                items: state.items
            };
        case campeonatosConstants.REGISTER_SUCCESS:
            return {
                items: state.items
            };
        case campeonatosConstants.REGISTER_FAILURE:
            return {};
           
        case campeonatosConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case campeonatosConstants.GETALL_SUCCESS:
            return {
                items: action.campeonato
            };
        case campeonatosConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
            case campeonatosConstants.UPDATECHAMPS_REQUEST:
            return {
                loading: true
            };
        case campeonatosConstants.UPDATECHAMPS_SUCCESS:
            return {
                items: state.items
            };
        case campeonatosConstants.UPDATECHAMPS_FAILURE:
            return {
                error: action.error
            };
            case campeonatosConstants.GETBYID_REQUEST:
            return {
               
                ...state,
                items: state.items.map(user => user),
                loading: true,
            };
        case campeonatosConstants.GETBYID_SUCCESS:
            return {
                items: state.items.filter(user => user.id == action.id)
            };
        case campeonatosConstants.GETBYID_FAILURE:
            return {
                error: action.error
            };
        case campeonatosConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case campeonatosConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case campeonatosConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}