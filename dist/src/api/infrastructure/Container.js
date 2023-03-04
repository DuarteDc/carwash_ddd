"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const awilix_1 = require("awilix");
const config_1 = require("../../config");
const Server_1 = require("./server/Server");
const Mongo_1 = require("./db/Mongo");
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
        });
    }
    invoke() {
        return this.container;
    }
}
exports.Container = Container;
