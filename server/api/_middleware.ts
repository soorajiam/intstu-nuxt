import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  // Handle CORS
  event.node.res.setHeader('Access-Control-Allow-Origin', '*')
  event.node.res.setHeader('Access-Control-Allow-Methods', '*')
  event.node.res.setHeader('Access-Control-Allow-Headers', '*')
}) 