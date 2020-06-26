import { Http } from '../../../../providers';

export default {
    login(body) {
        return Http.request({
            url: 'login',
            method: 'post',
            body,
        });
    }
};
