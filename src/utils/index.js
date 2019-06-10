export const formatDate = date => {
  const d = new Date(date)

  if (isToday(d)) {
    const parsed = new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long'
    })
      .format(d)
      .replace(' de', '')

    return `Hoje ${parsed}`
  }

  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })
    .format(d)
    .replace(',', '')
    .replace('-feira', '')
    .replace(' de', '')
}

export const isToday = date => {
  const today = new Date()

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export const formatForecast = (value, symbol) => `${value}${symbol}`

export const truncate = value => Math.trunc(value)
