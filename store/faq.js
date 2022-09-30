const PATH = process.env.apiPath;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Store Value Setting
export const state = () => ({});
export const mutations = {
    storeState: function (state, collection) {
        _.forEach(collection, (value, key) => {
            _.set(state, key, value);
        });
    }
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Store Value Setting

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Store Function
export const actions = {
    async fetchFAQs({}, obj) {
        try {
            let {
                payload
            } = await this.$axios.$post(`${ PATH }support/api/faqs/all`, obj);
            return payload;
        } catch (err) {
            throw err;
        }
    },
    async fetchFAQById({}, id) {
        try {
            let {
                payload
            } = await this.$axios.$get(`${ PATH }support/api/faqs/${id}`);
            return payload;
        } catch (err) {
            throw err;
        }
    }
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Store Function