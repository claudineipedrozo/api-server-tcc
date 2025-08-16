import { FastifyTypedInstance } from "./types"
import { prisma } from './prismaClient'

export async function routes(app: FastifyTypedInstance) {

  // Listar coletas
  app.get('/coletas', async () => {
    return await prisma.coleta.findMany()
  })

  // Criar nova coleta
  app.post('/coletas', async (request, reply) => {
    const { numero, local } = request.body as { numero: string; local: string }
    await prisma.coleta.create({
      data: { numero, local }
    })
    return reply.status(201).send(null)
  })

  // Finalizar coleta
  app.patch('/coletas/:id/finalizar', async (request, reply) => {
    const { id } = request.params as { id: string }
    const coleta = await prisma.coleta.findUnique({ where: { id } })

    if (!coleta) {
      reply.status(404).send({ error: 'Coleta not found' })
      return
    }

    await prisma.coleta.update({
      where: { id },
      data: { status: 'finalizada' }
    })

    reply.status(200).send(null)
  })
}
