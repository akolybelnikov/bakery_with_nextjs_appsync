export const filterByKey = (arr, key) => {
    return arr.filter(item => item.category === key)
}

export const filterByValue = (arr, val) => {
    return arr.filter(item => item !== val)
}