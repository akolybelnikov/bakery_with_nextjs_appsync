export const filterByKey = (arr, key) => {
  return arr.filter(item => item.category === key)
}

export const filterByValue = (arr, val) => {
  return arr.filter(item => item !== val)
}

export function clamp(number, lower, upper) {
  number = +number
  lower = +lower
  upper = +upper
  lower = lower === lower ? lower : 0
  upper = upper === upper ? upper : 0
  if (number === number) {
    number = number <= upper ? number : upper
    number = number >= lower ? number : lower
  }
  return number
}

export function move (array, moveIndex, toIndex) {
  let item = array[moveIndex];
  let length = array.length;
  let diff = moveIndex - toIndex;

  if (diff > 0) {
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length)
    ];
  } else if (diff < 0) {
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, toIndex + 1),
      item,
      ...array.slice(toIndex + 1, length)
    ];
  }
  return array;
}
