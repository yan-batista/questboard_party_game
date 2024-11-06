import prisma from "./client";

async function main() {
  // Create Classes
  const warrior = await prisma.class.create({
    data: { name: 'Warrior' },
  });

  const mage = await prisma.class.create({
    data: { name: 'Mage' },
  });

  const rogue = await prisma.class.create({
    data: { name: 'Rogue' },
  });

  // Create Players
  const players = [
    {
      username: 'alice123',
      password: 'Password123',
      name: 'Alice',
      coins: 100,
      classId: warrior.id
    },
    {
      username: 'bob456',
      password: 'Password456',
      name: 'Bob',
      coins: 200,
      classId: warrior.id
    },
    {
      username: 'charlie789',
      password: 'Password789',
      name: 'Charlie',
      coins: 150,
      classId: mage.id
    }
  ];

  const player1 = await prisma.player.create({
    data: {
      username: 'eve202',
      password: 'Password202',
      name: 'Eve',
      coins: 300,
      classId: rogue.id
    }
  })

  const player2 = await prisma.player.create({
    data: {
      username: 'david101',
      password: 'Password101',
      name: 'David',
      coins: 250,
      classId: mage.id
    },
  })

  await prisma.player.createMany({
    data: players,
  });

  // Create Quests
  await prisma.quest.createMany({
    data: [
      { title: 'Quest 1', category: 'Challenge', difficulty: 'Easy', reward: 10 },
      { title: 'Quest 2', category: 'Performance', difficulty: 'Medium', reward: 20 },
      { title: 'Quest 3', category: 'Trick', difficulty: 'Hard', reward: 30 },
      { title: 'Quest 4', category: 'Challenge', difficulty: 'Easy', reward: 15, bountyTargetId: player1.id },
      { title: 'Quest 5', category: 'Performance', difficulty: 'Hard', reward: 50, bountyTargetId: player2.id },
      { title: 'Quest 6', category: 'Trick', difficulty: 'Medium', reward: 25 },
      { title: 'Quest 7', category: 'Challenge', difficulty: 'Medium', reward: 30 },
      { title: 'Quest 8', category: 'Performance', difficulty: 'Easy', reward: 10 },
      { title: 'Quest 9', category: 'Trick', difficulty: 'Hard', reward: 40 },
      { title: 'Quest 10', category: 'Challenge', difficulty: 'Medium', reward: 20 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
