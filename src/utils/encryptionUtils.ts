import bcrypt from 'bcrypt'

export const encryptTextData = async (textData: string, saltRounds = 10) => {
  if (!textData) {
    return ''
  }
  const hash = await bcrypt.hash(textData, saltRounds)
  return hash
}

export const isEncryptedDataValid = async (data: string, encryptedData: string) => {
  const isDataMatched = await bcrypt.compare(data, encryptedData)
  return isDataMatched
}
