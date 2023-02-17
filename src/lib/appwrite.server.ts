import { APPWRITE_ENDPOINT, APPWRITE_PROJECT } from '$env/static/private';
import { Client, Databases } from 'appwrite';

export const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT);
export const databases = new Databases(client);
