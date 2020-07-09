import icon from 'react-icons/lib/md/question-answer'

export default {
  name: 'game',
  title: 'Game',
  type: 'document',
  icon,
  fields: [
    {
      name: 'players',
      title: 'Players',
      type: 'array',
      of: [{ type: 'player' }],
    },
  ],
  preview: {
    select: {
      players: 'players',
      id: '_id',
    },
    prepare(selection) {
      return {
        title: `${selection.id}`,
      }
    },
  },
}
