export const rawParser = (body: Record<string, any>): any => {
  if (
    Object.keys(body)
      .join('')
      .match(/\.*[({}:.\s)]|([]).*/g) !== null
  )
    return JSON.parse(Object.keys(body).join(''))
  else return body
}
