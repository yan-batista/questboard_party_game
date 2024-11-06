import { Request, Response } from "express";
import PlayerService from "../../services/PlayerServce";

class PlayerController {
    constructor(private playerService: PlayerService) {}

    async signUp(request: Request, response: Response) {
        const { username, playerName, classId, password, confirmPassword } = request.body;

        try {
            await this.playerService.signUp(username, playerName, classId, password, confirmPassword);
            return response.status(201).json({ message: "User created successfully" })
        } catch (error: Error | any) {
            return response.status(500).json({ error: error.message });
        }
    }

    async login(request: Request, response: Response) {
        const { username, password } = request.body;
        try {
            const token = await this.playerService.login(username, password);
            const expirationTime = new Date();
            expirationTime.setDate(expirationTime.getDate() + 2)

            return response
                .status(200)
                .cookie("jwtToken", token, {httpOnly: true, secure: true, sameSite: "none", expires: expirationTime})
                .json({ message: "User logged in successfully" })
        } catch (error: Error | any) {
            return response.status(500).json({ error: error.message });
        }
    }

    async logout(_: Request, response: Response) {
        return response
            .status(200)
            .clearCookie("jwtToken")
            .json({ message: "User logged out successfully" })
    }
}

export default PlayerController