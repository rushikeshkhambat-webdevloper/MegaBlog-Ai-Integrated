// this is the production level approach to axis the .env variables 
console.log("URL =", import.meta.env.VITE_APPWRITE_URL);
const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),

    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),

    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),

    appwriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),

    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;