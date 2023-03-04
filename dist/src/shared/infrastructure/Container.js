"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const awilix_1 = require("awilix");
const Router_1 = require("./routes/Router");
const config_1 = require("../../../config");
const Server_1 = require("./server/Server");
const Mongo_1 = require("./db/Mongo");
const router_1 = require("../../api/infrastructure/router");
const ErrorMiddleware_1 = require("./validation/ErrorMiddleware");
class Container {
    constructor() {
        this.container = (0, awilix_1.createContainer)({
            injectionMode: awilix_1.InjectionMode.CLASSIC,
        });
        this.register();
    }
    register() {
        this.container
            .register({
            config: (0, awilix_1.asValue)(config_1.config),
            server: (0, awilix_1.asClass)(Server_1.Server).singleton(),
            db: (0, awilix_1.asFunction)(Mongo_1.dbConnection).singleton(),
            router: (0, awilix_1.asFunction)(Router_1.Router).singleton(),
        })
            .register({
            errorMiddleware: (0, awilix_1.asClass)(ErrorMiddleware_1.ErrorMiddleware).singleton(),
            apiRouter: (0, awilix_1.asFunction)(router_1.apiRouter).singleton(),
        });
    }
    invoke() {
        return this.container;
    }
}
exports.Container = Container;
