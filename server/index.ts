// File: src/server.ts

import express, { Request, Response, NextFunction } from 'express';
import { Server } from "socket.io";
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import authRoutes from './routes/authRoutes';
import { ticketRouter } from './routes/TicketRoutes';
import { queueRouter } from './routes/OPDQueueRoutes';
import { bedManage } from './routes/bedManageRoutes';
import { mlRouter } from './routes/mlRoutes';
import inventoryRouter from './routes/inventoryRoutes';
import { hospitalRoute } from './routes/HospitalRoutes';
import { initializeSocket } from './socket';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const END_POINT = process.env.END_POINT || 'http://localhost:5173';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/booking', ticketRouter);
app.use('/queuing', queueRouter);
app.use('/beds', bedManage);
app.use('/recommend', mlRouter);
app.use('/inventory', inventoryRouter);
app.use('/', hospitalRoute);

// Prisma Client Initialization
export const prisma = new PrismaClient();

// Create HTTP server
export const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: END_POINT,
        methods: ['GET', 'POST'],
    }
});

initializeSocket(io);

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Server is up and running on port ${PORT}`);
});

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Global error handler:', err);
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler for undefined routes
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
server.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.log(`Server running on port ${PORT}`);
        console.log(`Database connection established`);
    } catch (error) {
        console.error('Failed to start server or connect to database:', error);
        process.exit(1);
    }
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    try {
        await prisma.$disconnect();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
});
