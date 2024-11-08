import prisma from "../prisma/client";
import {Bounty, Quest} from '@prisma/client'

export default class QuestService {
    async getAllQuests(): Promise<Quest[]> {
        return await prisma.quest.findMany();
    }

    async getRandomQuests(playerUsername: string): Promise<(Quest|Bounty)[]> {
        // check if player exists
        const playerExists = await prisma.player.findUnique({
            where: {
                username: playerUsername
            }
        })
        if (!playerExists) throw new Error("Player not found")

        // select 3 random quests
        const quests: (Quest|Bounty)[] = []

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

        // check if player has bounty
        const bounty = await prisma.bounty.findFirst({
            where: {
                target: {
                    id: playerExists.id
                }
            }
        })
        if(bounty) {
            quests.push(bounty)
        }

        return quests
    }

    async createBounty(title: string, reward: number, playerUsername: string, target: number) {
        // check if player exists
        const playerExists = await prisma.player.findUnique({
            where: {
                username: playerUsername
            }
        })
        if (!playerExists) throw new Error("Player not found");

        // check if target exists
        const targetExists = await prisma.player.findUnique({
            where: {
                id: target
            }
        })
        if (!targetExists) throw new Error("Target not found");

        // check if player already created a bounty
        const playerHasBounty = await prisma.bounty.findUnique({
            where: {
                creatorId: playerExists.id
            }
        })
        if (playerHasBounty) throw new Error("Player already has a bounty");

        // check if target already has a bounty
        const targetHasBounty = await prisma.bounty.findUnique({
            where: {
                targetId: target
            }
        })
        if (targetHasBounty) throw new Error("Target already has a bounty");

        // check if player has enough coins
        if(playerExists.coins < reward) throw new Error("Not enough money");

        // subtract coins from creator
        await prisma.player.update({
            where: {
                id: playerExists.id
            },
            data: {
                coins: {
                    decrement: reward
                }
            }
        })

        // create bounty
        await prisma.bounty.create({
            data: {
                title,
                reward,
                creator: {
                    connect: {
                        id: playerExists.id
                    }
                },
                target: {
                    connect: {
                        id: target
                    }
                }
            }
        })
    }
}