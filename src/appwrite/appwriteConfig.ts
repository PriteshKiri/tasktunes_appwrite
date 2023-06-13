import { Client, Account, ID, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("648834efbb6c74eb089f");

export const account = new Account(client);

export const databases = new Databases(client);

export const storage = new Storage(client);

export const Id = ID;
