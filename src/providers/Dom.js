export default class DOM {
    static formatPageTitle({ meta = {}, params = {} }, suffix = 'BBL', separator = '|') {
        const {
            title = null,
        } = meta;

        if (!title) return suffix;

        const titleWithParams = title.match(/[{]{2}[ \w ]+[}]{2}/gi) || [];

        const props = titleWithParams
            .map((item) => {
                const [
                    prop = '',
                ] = item.match(/(\w)+(\s?)(\w*)/);

                return {
                    [item]: params[prop.trim()] || '',
                };
            })
            .reduce((itemA, itemB) => ({ ...itemA, ...itemB }), {});

        const propsKeys = Object.keys(props);
        const newTitle = title.replace(
            propsKeys.length ? new RegExp(propsKeys.join('|'), 'gi') : '',
            key => props[key] || '',
        );

        return `${newTitle} ${separator} ${suffix}`;
    }
}
