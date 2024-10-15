export {}

beforeAll(() => {
  if (!window.speechSynthesis) {
    Object.defineProperty(window, 'speechSynthesis', {
      value: {
        getVoices: jest.fn(
          () =>
            [
              {
                name: 'Microsoft Pavel - Russian (Russia)',
                lang: 'ru-RU',
                default: false,
                localService: true,
                voiceURI: 'Microsoft Pavel - Russian (Russia)',
              },
              {
                name: 'Milena',
                lang: 'ru-RU',
                default: false,
                localService: true,
                voiceURI: 'Milena',
              },
            ] as SpeechSynthesisVoice[]
        ),
        speak: jest.fn(),
        onvoiceschanged: jest.fn(),
        paused: false,
        pending: false,
        speaking: false,
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      },
      configurable: true,
    })
  }
})
