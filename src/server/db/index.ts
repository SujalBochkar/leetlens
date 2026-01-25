import 'dotenv/config';
import { PrismaClient } from '@prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const prismaClientSingleton = () => {
	// Create a pg Pool with connection limits for Supabase
	const pool = new pg.Pool({
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
		max: 5,
		idleTimeoutMillis: 30000,
		connectionTimeoutMillis: 10000,
	});

	// Handle pool errors gracefully
	pool.on('error', (err) => {
		console.error('Unexpected pool error:', err);
	});

	const adapter = new PrismaPg(pool);
	return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
