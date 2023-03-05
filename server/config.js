import { config } from 'dotenv';
config();

const configuration = {
    PORT: 3000,
    DEBUG: 'dev',
    DB_URL: process.env.DB_URL
}

export default configuration;