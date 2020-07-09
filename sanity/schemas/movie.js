import icon from 'react-icons/lib/md/local-movies'

export default {
  name: 'movie',
  title: 'Movie',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: `${selection.title} tiititiitiitit`,
      }
    },
  },
}
