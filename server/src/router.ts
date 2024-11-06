import { Router, Request, Response } from "express";
import questController from "./controllers/QuestController";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    questController.getAllQuests(req, res)
})

router.get('/random', (req: Request, res: Response) => {
    questController.getRandomQuests(req, res)
})

/**
 * TODO: / --> qr code / ranking
 * TODO: /signup
 * TODO: /login
 * TODO: /logout
 * TODO: /(auth)quests --> return 3 quests to select/show current quest
 * TODO: /(auth)quests/bounty --> create bounty
 */

export default router