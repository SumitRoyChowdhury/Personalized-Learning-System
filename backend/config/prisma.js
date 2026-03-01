const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL.includes('?')
    ? process.env.DATABASE_URL
    : `${process.env.DATABASE_URL}?pgbouncer=true&connection_limit=1`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('Prisma Database connection successfully established');
    } catch (err) {
        console.error('Failed to connect to the database via Prisma:', err.message);
    }
};

module.exports = { prisma, connectDB };
