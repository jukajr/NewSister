import state from './states';
import mutations from './mutations';
import actions from './actions';

export default {
    name: 'crud',
    namespaced: true,
    state,
    mutations,
    actions,
};
