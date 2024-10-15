export const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text)

  const voices = window.speechSynthesis.getVoices()

  const russianVoices = voices.filter(voice => voice.lang === 'ru-RU')

  const selectedVoice = voices.find(
    voice =>
      voice.name === 'Microsoft Pavel - Russian (Russia)' &&
      voice.lang === 'ru-RU'
  )

  if (selectedVoice) {
    utterance.voice = selectedVoice // если найден, то Павел
  } else {
    utterance.voice = russianVoices[0] // иначе - первый в списке ру
  }

  utterance.rate = 1.7 // Скорость речи (значения от 0.1 до 10)
  utterance.pitch = 0 // Высота голоса (значения от 0 до 2)
  utterance.volume = 1 // Громкость (значения от 0 до 1)

  window.speechSynthesis.speak(utterance)
}
