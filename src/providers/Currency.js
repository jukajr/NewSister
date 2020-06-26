import currencyFormatter from 'currency-formatter';

export default class Currency {
    static formatReal(value) {
        return currencyFormatter.format(value, {
            code: 'BRL',
            locale: 'pt-BR'
        });
    }
    static formatUsd(value) {
        return currencyFormatter.format(value, {
            code: 'USD',
        });
    }
}
