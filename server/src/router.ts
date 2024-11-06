import { Router, Request, Response } from "express";
import questController from "./controllers/QuestController";
import playerController from "./controllers/PlayerController";

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

router.get('/random', (req: Request, res: Response) => {
    questController.getRandomQuests(req, res)
})

/**
 * TODO: / --> qr code / ranking
 * /signup
 * /login
 * /logout
 * TODO: /(auth)quests --> return 3 quests to select/show current quest
 * TODO: /(auth)quests/bounty --> create bounty
 */

export default router