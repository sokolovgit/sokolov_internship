import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify();

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
        await fastify.listen({ port: 3000 })
        fastify.log.info(`Server is running at http://localhost:3000`);
        fastify.swagger();
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

