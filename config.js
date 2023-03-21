import { config } from 'dotenv'

config()
// CREDENCIALES DE CLOUDINARY
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUD_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUD_KEY_SECRET;

// CREDENCIALES DE LA BASE DE DATOS
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASS;
export const DB_PORT = process.env.DB_PORT;
export const DB_NAME = process.env.DB_NAME;

