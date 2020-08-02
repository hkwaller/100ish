import icon from 'react-icons/lib/md/3d-rotation'

export default {
  name: 'translation',
  title: 'Translation',
  type: 'object',
  icon,
  fields: [
    {
      name: 'languageKey',
      title: 'Language key',
      type: 'string',
    },
    {
      name: 'languageName',
      title: 'Language name',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
}
