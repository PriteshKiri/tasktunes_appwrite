import { Client, Account, ID, Databases } from "appwrite";

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("64772806c68d271daa21");

export const account = new Account(client);

export const databases = new Databases(client);


