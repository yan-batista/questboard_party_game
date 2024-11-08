import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'

export interface CustomRequest extends Request {
    playerUsername?: string
}

function ensureAuth(request: CustomRequest, response: Response, next: NextFunction) {
    const token = request.cookies.jwtToken;
    if (!token) {
        response.status(401).json({ message: "Authorization token is required" });
        return ;
    }

    try {
        const secret: string | undefined = process.env.JWT_SECRET
        if(!secret) {
            response.status(401).json({ message: "Could not retrieve token secret" });
            return
        }

        const player_info = verify(token, secret) as { username: string }
        request.playerUsername = player_info.username;

        return next();
    } catch (error) {
        response.status(401).json({ message: "Error during authentication", error: error });
        return ;
    }
}

export default ensureAuth