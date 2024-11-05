import prisma from "../prisma/client";
import {Quest} from '@prisma/client'

export default class QuestService {
    async getAllQuests(): Promise<Quest[]> {
        return await prisma.quest.findMany();
    }
}