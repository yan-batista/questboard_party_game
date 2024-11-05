import {Request, Response} from "express"
import QuestService from "../../services/QuestService"

export default class QuestController {
    constructor(private questService: QuestService) {}
    
    async getAllQuests(req: Request, res: Response) {
        try {
            const quests = await this.questService.getAllQuests();
            return res.status(200).json(quests);
        } catch (error) {   
            return res.status(500).json(error);
        }
    }
}