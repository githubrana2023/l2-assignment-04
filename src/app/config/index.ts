import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.join(process.cwd(), '.env')
})

const config = {
    port: process.env.PORT as string,
    mongodbUrl: process.env.MONGODB_URL as string,
    mongodbUrlLocal: process.env.MONGODB_URL_LOCAL as string,
    jwt_secret: process.env.JWT_SECRET as string,
    bcrypt_salt_round: Number(process.env.BCRYPT_SALT_ROUND as string),
}
export default config