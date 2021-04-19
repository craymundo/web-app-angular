export function getAge(dateBrithday: Date): number {
    const newFirstDate = dateBrithday;
    newFirstDate.setMinutes(
      newFirstDate.getMinutes() + newFirstDate.getTimezoneOffset()
    );
    const todayDate = new Date();
    const dateParam = new Date(newFirstDate);
    let age = todayDate.getFullYear() - dateParam.getFullYear();
    const m = todayDate.getMonth() - dateParam.getMonth();
    if (m < 0 || (m === 0 && todayDate.getDate() < dateParam.getDate())) {
      age--;
    }
    return age;
  }
  