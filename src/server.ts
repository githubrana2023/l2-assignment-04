import mongoose from "mongoose"
import config from "./app/config"
import app from "./app/app"
import { Server } from 'http'

let server: Server
const connectDb = async () => {
    try {
        await mongoose.connect(config.mongodbUrl)
        server = app.listen(config.port, () => {
            console.log({
                db: 'database successfully connected with server',
                server: `server listening on http://localhost:${config.port}`
            });
        })
    } catch (error) {
        console.log('failed to connect to server');
    }
}

connectDb()

process.on('unhandledRejection', () => {
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1);
})

process.on('uncaughtException', () => {
    process.exit(1);

})