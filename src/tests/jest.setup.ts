import { buildClient } from '../config'

const prisma = buildClient([{ level: 'error', emit: 'event' }])

afterAll(async () => {
  await prisma.user.deleteMany()
})
