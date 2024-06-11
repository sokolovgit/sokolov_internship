"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fastify = (0, fastify_1.default)();
fastify.register(require('@fastify/swagger'), {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Accounting API',
            version: '3.1.0',
        },
    },
    exposeRoute: true,
});
fastify.get('/ping', async (request, reply) => {
    return 'pong\n';
});
const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        fastify.log.info(`Server is running at http://localhost:3000`);
        fastify.swagger();
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
