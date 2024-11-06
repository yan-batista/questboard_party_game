import prisma from "../prisma/client"
import bcrypt from "bcrypt"
import {sign} from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

class PlayerService {
    async signUp(username: string, playerName: string, classId: number, password: string, confirmPassword: string) {
        // check if username is in use
        const usernameIsInUse = await prisma.player.findUnique({
            where: { 
                username: username
            }
        })
        if(usernameIsInUse) {
            throw new Error("Username is already in use");
        }

        // check if playerName is in use
        const playerNameIsInUse = await prisma.player.findUnique({
            where: { 
                name: playerName
            }
        })
        if(playerNameIsInUse) {
            throw new Error("Player name is already in use");
        }

        // check if class exists
        const playerClass = await prisma.class.findFirst({
            where: { 
                id: classId
            }
        })
        if(!playerClass) {
            throw new Error("Class not found");
        }

        // check if passwords match
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        await prisma.player.create({
            data: {
                username: username,
                name: playerName,
                password: hashedPassword,
                coins: 0,
                classId: classId
            }
        })
    }

    async login(username: string, password: string) {
        // check if user exists
        const userExists = await prisma.player.findUnique({
            where: {username: username}
        })
        if (!userExists) throw new Error("Player not found");

        // check if password is correct
        const passwordsMatch = await bcrypt.compare(password, userExists.password);
        if (!passwordsMatch) throw new Error("Incorrect password");

        // generate token
        const secret: string | undefined = process.env.JWT_SECRET
        if(!secret) throw new Error("coult not retrieve token")

        const token = sign({username: userExists.username}, secret, {expiresIn: "2d"});
        return token;
    }
}

export default PlayerService