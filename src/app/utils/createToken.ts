import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken"


const createToken = async (payload: JwtPayload, secret: Secret, options: SignOptions) => {
    const token = await jwt.sign(payload, secret, options)
    return token
}

export default createToken