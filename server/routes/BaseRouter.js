export default class BaseRouter {
    createErrorHandler(res) {
        return (err) => {
            res.status(err.status || 400).json(err);
        };
    }
}
