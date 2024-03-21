export const clearAllowed = () => {
    let year = new Date().getFullYear()
    let month = new Date().getMonth();
    let date = new Date().getDate();
    return new Date().valueOf() > new Date(year, month, date, "11", "00").valueOf()
}

export const getTime = (time = new Date()) => {
    const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
    const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    const seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
    return hours + ":" + minutes + ":" + seconds;
}

export const weekdays = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'];