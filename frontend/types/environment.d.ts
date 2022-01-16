declare namespace NodeJS {
    interface ProcessEnv {
        DB_MEREDITH_URL: string,
        DB_MEREDITH_USERNAME: string,
        DB_MEREDITH_PASSWORD: string,

        // NEXTAUTH_URL: string,
        NEXTAUTH_SECRET: string,
        JWT_SECRET: string,

        GOOGLE_ID: string,
        GOOGLE_SECRET: string,
        DISCORD_CLIENT_ID: string,
        DISCORD_CLIENT_SECRET: string,
    }
}
