export const isValidLink = (link: string) => {
  const regex = /^(http:\/\/|https:\/\/)[\w-]+(\.[\w-]+)+/
  return regex.test(link)
}

export const removeWhiteSpace = (text: string) =>
  text.replace(/[\s\r\n]+/g, ' ')
