export default ({ $axios, error, $storage }) => {
    $axios.onRequest((config) => {
        config.headers.common["authorization"] = $storage.getUniversal("token");
    });

    $axios.onResponse((response) => {
        return Promise.resolve(response.data);
    });

    $axios.onError((err) => {
        err.message = err?.response?.data?.message || err.message
        err.code = err?.response?.data?.code || 0
        return Promise.reject(err);
    });
};
