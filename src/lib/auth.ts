import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/server/db';
import { authConfig } from './auth.config';

/**
 * Full auth config with Prisma adapter
 * Used by API routes (not edge-compatible)
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	adapter: PrismaAdapter(prisma),
});
