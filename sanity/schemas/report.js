import icon from 'react-icons/lib/md/question-answer'

export default {
  name: 'report',
  title: 'Report',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'question',
      title: 'Question',
      type: 'question',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: `${selection.title}`,
      }
    },
  },
}
