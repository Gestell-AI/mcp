// Generated by ts-to-zod
import { z } from 'zod'
import { baseResponseSchema } from '../base.zod'

export const uploadDocumentResponseSchema = baseResponseSchema.extend({
  id: z.string()
})
