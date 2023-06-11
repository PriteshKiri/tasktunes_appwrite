import { Client, Account, ID, Databases, Storage } from "appwrite";

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("64772806c68d271daa21");

export const account = new Account(client);

export const databases = new Databases(client);

export const storage = new Storage(client);
