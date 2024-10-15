let selectedVoice: SpeechSynthesisVoice | null = null

const initializeVoices = () => {
  const voices = window.speechSynthesis.getVoices()

  // Фильтруем только русские голоса
  const russianVoices = voices.filter(voice => voice.lang === 'ru-RU')

  // Ищем голос Павла (на маке его нет)
  const pavelVoice = russianVoices.find(
    voice => voice.name === 'Microsoft Pavel - Russian (Russia)'
  )

  // Если голос найден, сохраняем его, иначе берем первый русский или null
  selectedVoice = pavelVoice
    ? pavelVoice
    : russianVoices.length > 0
    ? russianVoices[0]
    : null
}

if (
  'speechSynthesis' in window &&
  'onvoiceschanged' in window.speechSynthesis
) {
  window.speechSynthesis.onvoiceschanged = () => {
    initializeVoices()
  }
}

export const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text)

  if (selectedVoice) {
    utterance.voice = selectedVoice
  }

  utterance.rate = 1.8 // Скорость речи (значения от 0.1 до 10)
  utterance.pitch = 0 // Высота голоса (значения от 0 до 2)
  utterance.volume = 1 // Громкость (значения от 0 до 1)

  window.speechSynthesis.speak(utterance)
}

initializeVoices()
