import icon from 'react-icons/lib/md/question-answer'

export default {
  name: 'question',
  title: 'Question',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'number',
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
