import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
    kite: {
        apiKey: process.env.KITE_API_KEY || '',
        secretKey: process.env.KITE_SECRET_KEY  || '',
        clientId: process.env.KITE_CLIENT_ID || '',
    }
}