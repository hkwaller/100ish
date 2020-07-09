import icon from 'react-icons/lib/md/question-answer'

export default {
  name: 'player',
  title: 'Player',
  type: 'object',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'isFinished',
      title: 'Is finished',
      type: 'boolean',
    },
    {
      name: 'answers',
      title: 'Answers',
      type: 'array',
      of: [{ type: 'number' }],
    },
  ],
}
