export const isValidLink = (link: string) => {
  const regex = /^(http:\/\/|https:\/\/)[\w-]+(\.[\w-]+)+/
  return regex.test(link)
}

export const UNNECESSARY_WHITE_SPACE = /[\s\r\n]+/g
