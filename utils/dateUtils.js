export const getGreeting = () => {
  const hours = new Date().getHours()
  if (hours < 12) {
    return "Good Morning"
  } else if (hours < 18) {
    return "Good Afternoon"
  } else {
    return "Good Evening"
  }
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}
