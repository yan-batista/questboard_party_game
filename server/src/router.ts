import { Router, Request, Response } from "express";
import questController from "./controllers/QuestController";
import playerController from "./controllers/PlayerController";
import ensureAuth from "./middlewares/ensureAuth";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    questController.getAllQuests(req, res)
})

router.post('/signup', (req: Request, res: Response) => {
    playerController.signUp(req, res)
})

router.post('/login', (req: Request, res: Response) => {
    playerController.login(req, res)
})

router.get('/logout', (req: Request, res: Response) => {
    playerController.logout(req, res)
})

router.get('/quests', ensureAuth, (req: Request, res: Response) => {
    questController.getRandomQuests(req, res)
})

router.post('/quests/accept', ensureAuth, (req: Request, res: Response) => {
    playerController.acceptQuest(req, res)
})

router.get('/quests/complete', ensureAuth, (req: Request, res: Response) => {
    playerController.completeQuest(req, res)
})

router.post('/quests/bounty', ensureAuth, (req: Request, res: Response) => {
    questController.createBounty(req, res)
})

export default router