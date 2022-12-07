export const isEmpty = (array) => {
    if(array === undefined ) return true
    if(array.length>0) return false;
    else return true;
}

export const hasPicture = (string) => {
    if(string !== "") return true;
    else return false
}