import { PrismaClient } from '@prisma/client';
import { access } from 'node:fs/promises';
import path from 'node:path';

const slug = 'grupo-mais-barato-celebra-10-anos-expansao-varejo-paraense';
const oldPath = '/assets/Fotografias/Grupo Institucional +B/foto-grupo-b-em-fente-fachada_pessoas.png';
const newPath = oldPath.replace(/\.png$/, '.webp');
await access(path.join(process.cwd(), 'public', newPath.slice(1)));
const prisma = new PrismaClient();
try {
  const [cover, card] = await prisma.$transaction([
    prisma.post.updateMany({ where: { slug, imagePath: oldPath }, data: { imagePath: newPath } }),
    prisma.post.updateMany({ where: { slug, imageCardPath: oldPath }, data: { imageCardPath: newPath } }),
  ]);
  console.log(JSON.stringify({ coversCorrected: cover.count, thumbnailsCorrected: card.count }));
} finally { await prisma.$disconnect(); }

