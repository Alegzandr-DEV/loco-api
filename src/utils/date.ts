export function dateWithMonthsDelay(months: number) {  
  let date = new Date();
  date.setMonth(date.getMonth() + months);

  return date;
}

export function tomorrow() {
  let date = new Date();
  date.setDate(date.getDate() + 1);

  return date;
}
