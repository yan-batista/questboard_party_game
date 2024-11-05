import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Classes
  const warriorClass = await prisma.class.create({
    data: {
      name: 'Warrior',
    },
  });

  const mageClass = await prisma.class.create({
    data: {
      name: 'Mage',
    },
  });

  const rogueClass = await prisma.class.create({
    data: {
      name: 'Rogue',
    },
  });

  // Seed Players
  await prisma.player.createMany({
    data: [
      {
        name: 'Alice',
        coins: 100,
        classId: warriorClass.id,
      },
      {
        name: 'Bob',
        coins: 150,
        classId: mageClass.id,
      },
      {
        name: 'Charlie',
        coins: 200,
        classId: rogueClass.id,
      },
      {
        name: 'David',
        coins: 50,
        classId: warriorClass.id,
      },
      {
        name: 'Eva',
        coins: 120,
        classId: mageClass.id,
      },
    ],
  });

  // Seed Quests
  await prisma.quest.createMany({
    data: [
      {
        title: 'Defeat the Goblin',
        category: 'Challenges',
        difficulty: 'Easy',
        reward: 50,
        challengerId: 1, // Assuming Player ID 1 (Alice)
        targetId: 2,     // Assuming Player ID 2 (Bob)
      },
      {
        title: 'Save the Princess',
        category: 'Performance',
        difficulty: 'Medium',
        reward: 100,
        challengerId: 2, // Bob
        targetId: 3,     // Charlie
      },
      {
        title: 'Slay the Dragon',
        category: 'Challenges',
        difficulty: 'Hard',
        reward: 200,
        challengerId: 3, // Charlie
        targetId: 4,     // David
      },
      {
        title: 'Find the Lost Artifact',
        category: 'Tricks',
        difficulty: 'Medium',
        reward: 120,
        challengerId: 4, // David
        targetId: 5,     // Eva
      },
      {
        title: 'Capture the Flag',
        category: 'Performance',
        difficulty: 'Easy',
        reward: 50,
        challengerId: 1, // Alice
        targetId: 3,     // Charlie
      },
      {
        title: 'Steal the Treasure',
        category: 'Tricks',
        difficulty: 'Hard',
        reward: 180,
        challengerId: 2, // Bob
        targetId: 4,     // David
      },
      {
        title: 'Defend the Castle',
        category: 'Challenges',
        difficulty: 'Medium',
        reward: 100,
        challengerId: 3, // Charlie
        targetId: 5,     // Eva
      },
      {
        title: 'Win the Battle',
        category: 'Performance',
        difficulty: 'Easy',
        reward: 40,
        challengerId: 4, // David
        targetId: 1,     // Alice
      },
      {
        title: 'Find the Hidden Key',
        category: 'Tricks',
        difficulty: 'Medium',
        reward: 150,
        challengerId: 5, // Eva
        targetId: 2,     // Bob
      },
      {
        title: 'Defeat the Bandits',
        category: 'Challenges',
        difficulty: 'Hard',
        reward: 250,
        challengerId: 1, // Alice
        targetId: 2,     // Bob
      },
    ],
  });

  console.log('Seed data has been inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
