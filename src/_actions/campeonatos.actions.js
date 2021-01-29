import { campeonatosConstants } from '../_constants/campeonatos.constants';
import { campeonatoService } from '../_services/campeonatos.service';
import { alertActions } from './';
import { history } from '../_helpers';

export const campeonatosActions = {
    register,
    getAll,
    delete: _delete,
    get_by_id,
    update_user
};

function update_user(user){

    return dispatch => {
        dispatch(request(user));
        
        campeonatoService.update(user)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request(user) { return { type: campeonatosConstants.UPDATECHAMPS_REQUEST, payload: user} }
    function success(user) { return { type: campeonatosConstants.UPDATECHAMPS_SUCCESS, payload: user} }
    function failure(error) { return { type: campeonatosConstants.UPDATECHAMPS_FAILURE, error } }


}

function get_by_id(id){
    return dispatch => {
        dispatch(request(id));

        campeonatoService.getById(id)
            .then(
                users => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: campeonatosConstants.GETBYID_REQUEST, id } }
    function success(id) { return { type: campeonatosConstants.GETBYID_SUCCESS, id} }
    function failure(id, error) { return { type: campeonatoConstants.GETBYID_FAILURE, id, error } }

}




function register(campeonato) {
    return dispatch => {
        dispatch(request(campeonato));

        campeonatoService.register(campeonato)
            .then(
                campeonato => { 
                    dispatch(success(campeonato));
                    dispatch(alertActions.success('Campeonato Added Correctly'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(campeonato) { return { type: campeonatosConstants.REGISTER_REQUEST, campeonato } }
    function success(campeonato) { return { type: campeonatosConstants.REGISTER_SUCCESS, campeonato } }
    function failure(error) { return { type: campeonatosConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        campeonatoService.getAll()
            .then(
                campeonato => dispatch(success(campeonato)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: campeonatosConstants.GETALL_REQUEST } }
    function success(campeonato) { return { type: campeonatosConstants.GETALL_SUCCESS, campeonato } }
    function failure(error) { return { type: campeonatosConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        campeonatoService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: campeonatosConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: campeonatosConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: campeonatosConstants.DELETE_FAILURE, id, error } }
}