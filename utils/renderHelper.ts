
const showDate = (value:string) =>{
    const date = new Date(value);
    if (!date || date.toString().indexOf('Invalid') > -1){
        return value;
    }
    const formatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
    return formatter.format(date);
}

export {showDate}