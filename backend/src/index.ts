import dotenv from "dotenv";
import Fastify from "fastify";
import fastifySwaggerUi from "@fastify/swagger-ui";
import path from 'path';
import { transactionsRoutes } from "./routes/transactionsRoutes";
import { accountsRoutes } from "./routes/accountsRoutes";

dotenv.config();

const fastify = Fastify({ logger: true });
const cors = require('@fastify/cors');

const apiSpec = {
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../accounting_api.json'),
  },
  exposeRoute: true,
}

fastify.register(cors, {origin: 'http://localhost:5173'})
fastify.register(require('@fastify/swagger'), apiSpec);
fastify.register(fastifySwaggerUi, { routePrefix: '/docs'});

fastify.register((fastify, opts, done) => {
    fastify.get('/ping', {
        schema: {
            description: 'Ping endpoint',
            summary: 'Ping endpoint',
            tags: ['Utils'],
            response: {
                200: {
                    description: 'Successful response',
                    type: 'string'
                }
            }
        }
    }, async (request, reply) => {
        return 'pong\n';
    });
    done();
});

fastify.register(transactionsRoutes);
fastify.register(accountsRoutes);

const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        fastify.log.info(`Server is running at http://localhost:3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();