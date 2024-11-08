import {Request, Response} from "express"
import QuestService from "../../services/QuestService"
import { AuthRequest } from "../../middlewares/ensureAuth";

export default class QuestController {
    constructor(private questService: QuestService) {}
    
    async getAllQuests(_: Request, res: Response) {
        try {
            const quests = await this.questService.getAllQuests();
            return res.status(200).json(quests);
        } catch (error) {   
            return res.status(500).json(error);
        }
    }

    async getRandomQuests(req: AuthRequest, res: Response) {
        const { playerUsername } = req;

        if(!playerUsername) return res.status(401).json({message: "Player username not found in request"});

        try {
            const quests = await this.questService.getRandomQuests(playerUsername);
            return res.status(200).json(quests);
        } catch (error) {   
            return res.status(500).json(error);
        }
    }

    async createBounty(req: AuthRequest, res: Response){
        const { title, reward, target } = req.body;
        const { playerUsername } = req;

        if(!playerUsername) return res.status(401).json({message: "Player username not found in request"});

        try {
            await this.questService.createBounty(title, reward, playerUsername, target);
            return res.status(200).json({ message: "Bounty created successfully" });
        } catch (error: Error | any) {
            return res.status(500).json({ error: error.message });  
        }
    }
}