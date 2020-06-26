import axios from 'axios';
import Auth from './Auth';
import EventBus from './EventBus';

axios.interceptors.response.use((response) => {
    const { data = {} } = response || {};
    const { messages = [] } = data;

    if (Array.isArray(messages) && messages.length) {
        messages.forEach(({ message }) => EventBus.$emit('toast', {
            message,
            variant: 'success',
        }));
    }

    return response.data;
}, (error = {}) => {
    const { response = {} } = error;
    const {
        data = {},
        status,
    } = response;
    const {
        errors = [],
    } = data;

    if (status === 401) {
        Auth.logout();
        EventBus.$emit('routerPush', { name: 'login' });
        return false;
    }

    if (Array.isArray(errors) && errors.length) {
        errors.forEach(({ message }) => EventBus.$emit('toast', {
            message,
            variant: 'danger',
        }));
    }

    throw new Error(error);
});

axios.defaults.transformResponse = (data) => {
    /* eslint no-param-reassign:0 */
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (e) { /* Ignore */ }
    }

    return data;
};

export default class Http extends axios {
    static setBaseUrl(baseURL) {
        axios.defaults.baseURL = baseURL;
    }

    static setInterceptorRequest(...interceptor) {
        axios.interceptors.request.use(...interceptor);
    }
}
