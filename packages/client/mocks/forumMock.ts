import { Section } from '@src/types'

export const mockForumSections: Section[] = [
  {
    id: 1,
    title: 'ТАКТИКИ ИГРЫ',
    topics: [
      {
        id: 1,
        title: 'Не могу пройти',
        messages: [
          {
            id: 1,
            username: 'Username1',
            date: '12.08.24 18:25',
            content: 'Хелп!',
          },
          {
            id: 2,
            username: 'Username2',
            date: '12.08.24 18:30',
            content: 'Какая у тебя проблема?',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'СЮЖЕТ',
    topics: [],
  },
  {
    id: 3,
    title: 'ОБЩЕНИЕ',
    topics: [
      {
        id: 3,
        title: 'Познакомимся?',
        messages: [
          {
            id: 3,
            username: 'Username111',
            date: '12.08.24 18:25',
            content: 'Давайте общаться!',
          },
          {
            id: 4,
            username: 'Username333',
            date: '12.08.24 19:00',
            content: 'Привет! Как дела?',
          },
        ],
      },
      {
        id: 4,
        title: 'Объявления',
        messages: [
          {
            id: 5,
            username: 'Username222',
            date: '12.08.24 18:25',
            content: 'Продам телевизор',
          },
        ],
      },
    ],
  },
]
