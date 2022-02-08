export function deepClone(origin: any, target: any) {
  for (const prop in target) {
    if (target.hasOwnProperty(prop)) {
      if (target[prop] !== null && typeof target[prop] === 'object') {
        origin[prop] = Object.prototype.toString.call(target[prop]) === '[object Array]' ? [] : {};
        deepClone(origin[prop], target[prop]);
      } else {
        origin[prop] = target[prop];
      }
    }
  }
}

export function deepClone2(obj: any) {
  if (obj === null || obj === undefined) {
    return null;
  } else {
    const newObj: any = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = obj && typeof obj[key] === 'object' ? deepClone2(obj[key]) : obj[key];
        }
      }
    }
    return newObj;
  }
}
