/**
 * Schema do Sanity.io para o tipo de documento "noticia"
 * Grupo Mais Barato - Site Institucional
 */

export default {
  name: 'noticia',
  title: 'Notícia / Matéria',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Matéria',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(120).error('O título deve ter entre 10 e 120 caracteres.')
    },
    {
      name: 'slug',
      title: 'Slug (URL amigável)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Data e Hora de Publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required()
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Institucional', value: 'Institucional' },
          { title: '+B Supermercados', value: '+B Supermercados' },
          { title: '+B Farma', value: '+B Farma' },
          { title: 'Villa Plaza', value: 'Villa Plaza' },
          { title: 'The Wine Experience', value: 'The Wine Experience' },
          { title: 'Eventos & Ações', value: 'Eventos' },
          { title: 'Expansão & Obras', value: 'Expansão' },
          { title: 'Geral', value: 'Geral' }
        ],
        layout: 'dropdown'
      },
      initialValue: 'Institucional',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true // Permite recortar e definir ponto focal da imagem
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo (Acessibilidade/SEO)',
          description: 'Descreva o que aparece na imagem para pessoas com deficiência visual e motores de busca.'
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Legenda da Imagem'
        }
      ],
      validation: (Rule) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Resumo / Subtítulo (Lead)',
      type: 'text',
      rows: 3,
      description: 'Breve resumo que aparecerá nos cards da Home e na listagem de notícias.',
      validation: (Rule) => Rule.required().max(250).warning('Recomendado até 250 caracteres para melhor visualização.')
    },
    {
      name: 'author',
      title: 'Autor / Assessoria',
      type: 'string',
      initialValue: 'Assessoria de Comunicação Grupo +B'
    },
    {
      name: 'body',
      title: 'Conteúdo da Matéria',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Título H2', value: 'h2' },
            { title: 'Título H3', value: 'h3' },
            { title: 'Citação em Destaque', value: 'blockquote' }
          ],
          lists: [
            { title: 'Marcadores (Bullet)', value: 'bullet' },
            { title: 'Numerada', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
              { title: 'Sublinhado', value: 'underline' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link / URL',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel']
                      })
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Abrir em nova aba?',
                    initialValue: true
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo'
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Legenda'
            }
          ]
        }
      ],
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      publishedAt: 'publishedAt',
      media: 'mainImage'
    },
    prepare(selection) {
      const { title, category, publishedAt, media } = selection;
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('pt-BR') : '';
      return {
        title: title,
        subtitle: `${category || 'Sem categoria'} • ${date}`,
        media: media
      };
    }
  }
};
