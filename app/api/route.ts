import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

export async function GET() {
  return NextResponse.json({ 
    message: 'API ready',
    timestamp: new Date().toISOString()
  })
}