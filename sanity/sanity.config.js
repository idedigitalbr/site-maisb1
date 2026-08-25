import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import noticia from './schemas/noticia'

export default defineConfig({
  name: 'default',
  title: 'Grupo Mais Barato CMS',

  // Substitua pelo seu Project ID real do painel do Sanity
  projectId: 'SEU_PROJECT_ID_AQUI',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [noticia]
  }
})
