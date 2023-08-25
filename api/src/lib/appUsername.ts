export const appUsername = (data): string => {
  if (!data.id) {
    throw new Error('Malformed data in function: `lib/appUsername`')
  }

  return (
    data.username ||
    data.first_name ||
    data.email_addresses[0]?.email_address ||
    data.id
  )
}
