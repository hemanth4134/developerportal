export function current_convert(number) {
  let date = new Date()
  let mnth = ('0' + (date.getMonth() + 1)).slice(-2)
  let day = ('0' + date.getDate()).slice(-2)
  let currntdate = [date.getFullYear() - number, mnth, day].join('-')
  return currntdate
}


export function getDifferenceInDays(startDate, endDate) {
  let date1 = new Date(startDate);
  let date2 = new Date(endDate);
  const diffInMs = Math.abs(date2 - date1);
  let diffdate = diffInMs / (1000 * 60 * 60 * 24);
  return diffdate;
}
