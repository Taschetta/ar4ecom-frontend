
export const useFile = () => {
  const asJSON = file => new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const data = JSON.parse(event.target.result)
      resolve(data)
    }

    reader.readAsText(file)
  })

  return {
    asJSON,
  }
}
