import icon from 'react-icons/lib/md/question-answer'

export default {
  name: 'game',
  title: 'Game',
  type: 'document',
  icon,
  fields: [
    {
      name: 'gamename',
      title: 'Game name',
      type: 'string',
    },
    {
      name: 'players',
      title: 'Players',
      type: 'array',
      of: [{ type: 'player' }],
    },
    {
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [{ type: 'question' }],
    },
    {
      name: 'isReady',
      title: 'Game is ready to play',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      gamename: 'gamename',
    },
    prepare(selection) {
      return {
        title: `${selection.gamename}`,
      }
    },
  },
}
