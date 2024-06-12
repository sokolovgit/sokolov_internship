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

fastify.register(transactionsRoutes);
fastify.register(accountsRoutes);
fastify.get('/ping', async (request, reply) => {return 'pong\n'; });

const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        fastify.log.info(`Server is running at http://0.0.0.0:3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();