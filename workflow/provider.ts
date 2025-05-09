import { createGoogleGenerativeAI } from '@ai-sdk/google'

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY
})

export default function getProvider(model = 'gemini-2.0-flash') {
  return google(model)
}
