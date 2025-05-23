// Generated by ts-to-zod
import { z } from 'zod'
import { baseResponseSchema } from '../base.zod'
import { collectionSchema, collectionStatsSchema } from '../collection.zod'

export const getCollectionRequestSchema = z.object({
  collectionId: z.string()
})

export const getCollectionResponseSchema = baseResponseSchema.extend({
  result: collectionSchema.nullable(),
  stats: collectionStatsSchema.nullable()
})
