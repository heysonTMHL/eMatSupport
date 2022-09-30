const cookieparser = process.server ? require("cookieparser") : undefined;
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
    async nuxtServerInit({
        commit,
        dispatch
    }, {
        req,
        route
    }) {},
    async fetchContacts({}) {
        try {
            let {
                payload
            } = await this.$axios.$post(`${ PATH }support/api/support/contacts/all`);
            return payload;
        } catch (err) {
            throw err;
        }
    },
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Store Function