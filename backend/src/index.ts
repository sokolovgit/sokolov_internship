import dotenv from "dotenv";
import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fs from "fs";
import path from 'path';


dotenv.config();
const fastify = Fastify({ logger: true });

const apiSpec = {
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../accounting_api.json'),
  },
  exposeRoute: true,
}

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