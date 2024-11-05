import { Router, Request, Response } from "express";
import questController from "./controllers/QuestController";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    questController.getAllQuests(req, res)
})

export default router