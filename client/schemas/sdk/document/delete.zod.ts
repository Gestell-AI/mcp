// Generated by ts-to-zod
import { z } from 'zod'
import { baseResponseSchema } from '../base.zod'

export const deleteDocumentRequestSchema = z.object({
  collectionId: z.string(),
  documentId: z.string()
})

export const deleteDocumentResponseSchema = baseResponseSchema
