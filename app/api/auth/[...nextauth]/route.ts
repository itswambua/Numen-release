// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextRequest } from 'next/server';

export function GET(req: NextRequest) {
  return NextAuth(authOptions)(req);
}

export function POST(req: NextRequest) {
  return NextAuth(authOptions)(req);
}
