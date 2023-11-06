export const clearAllowed = () => {
    let year = new Date().getFullYear()
    let month = new Date().getMonth();
    let date = new Date().getDate();
    return new Date().valueOf() > new Date(year, month, date, "12", "00").valueOf()
}

const p = ['Abdiqani', 'Ahmed', 'Jere', 'Jesse', 'Jessica', 'Hannikainen', 'Jon', 'Mandi', 'Neto', 'Niko', 'Nooa', 'Roope', 'Sonja', 'Vuong'];

export const initPersons = () => {
    let p_list = [];
    for (let i = 0; i < p.length; i++) {
      p_list.push({name: p[i], stamp: null})
    }
    return p_list;
}
  
export const getTime = (time = new Date()) => {
    const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
    const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    const seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
    return hours + ":" + minutes + ":" + seconds;
}
