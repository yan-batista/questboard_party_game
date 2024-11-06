import prisma from "../prisma/client";
import {Quest} from '@prisma/client'

export default class QuestService {
    async getAllQuests(): Promise<Quest[]> {
        return await prisma.quest.findMany();
    }

    async getRandomQuests(): Promise<Quest[]> {
        try {
            const quests: Quest[] = []

            const easyQuests = await prisma.quest.findMany({
                where: {difficulty: 'Easy'}
            })
            const mediumQuests = await prisma.quest.findMany({
                where: {difficulty: 'Medium'}
            })
            const hardQuests = await prisma.quest.findMany({
                where: {difficulty: 'Hard'}
            })

            if (easyQuests.length !== 0) {
                const randomEasyQuest = easyQuests[Math.floor(Math.random() * easyQuests.length)];
                quests.push(randomEasyQuest)
            }

            if (mediumQuests.length !== 0) {
                const randomMediumQuest = mediumQuests[Math.floor(Math.random() * mediumQuests.length)];
                quests.push(randomMediumQuest)
            }

            if (hardQuests.length !== 0) {
                const randomHardQuest = hardQuests[Math.floor(Math.random() * hardQuests.length)];
                quests.push(randomHardQuest)
            }

            return quests
        } catch (error) {
            console.error('Error fetching random quests:', error);
            return []
        }
    }
}