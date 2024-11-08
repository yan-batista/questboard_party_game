import { Request, Response } from "express";
import PlayerService from "../../services/PlayerServce";
import { CustomRequest } from "../../middlewares/ensureAuth";

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

            // FIXME: change secure to true in prod
            return response
                .status(200)
                .cookie("jwtToken", token, {httpOnly: true, secure: false, sameSite: "none", expires: expirationTime})
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

    async acceptQuest(request: CustomRequest, response: Response) {
        const { questId } = request.body;
        const { playerUsername } = request;

        if(!playerUsername) return response.status(401).json({message: "Player username not found in request"});

        try {
            await this.playerService.acceptQuest(playerUsername, questId);
            return response.status(200).json({ message: "Quest accepted successfully" })
        } catch (error: Error | any) {
            return response.status(500).json({ error: error.message });
        }
    }

    async completeQuest(request: CustomRequest, response: Response) {
        const { playerUsername } = request;

        if(!playerUsername) return response.status(401).json({message: "Player username not found in request"});

        try {
            await this.playerService.completeQuest(playerUsername);
            return response.status(200).json({ message: "Quest completed successfully" })        
        } catch (error: Error | any) {
            return response.status(500).json({ error: error.message });
        }
    }
}

export default PlayerController