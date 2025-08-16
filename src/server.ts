import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import { validatorCompiler, serializerCompiler, jsonSchemaTransform } from "fastify-type-provider-zod"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import { routes } from "./routes"
import { ZodTypeProvider } from "fastify-type-provider-zod"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'API Server TCC',
            version: '1.0.0',
        }
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.register(routes)

app.listen({ port: 8080 }).then(() => {
    console.log('HTTP server running!')
})