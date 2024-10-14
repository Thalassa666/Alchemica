export const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text)

  const voices = window.speechSynthesis.getVoices() //можно выбирать из списка разные голоса

  const selectedVoice = voices.find(
    voice =>
      voice.name === 'Microsoft Pavel - Russian (Russia)' &&
      voice.lang === 'ru-RU'
  )

  if (selectedVoice) {
    utterance.voice = selectedVoice
  }

  utterance.rate = 1.8 // Скорость речи (значения от 0.1 до 10)
  utterance.pitch = 0 // Высота голоса (значения от 0 до 2)
  utterance.volume = 1 // Громкость (значения от 0 до 1)

  window.speechSynthesis.speak(utterance)
}
