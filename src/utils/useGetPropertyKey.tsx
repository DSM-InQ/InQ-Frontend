interface MyObject {
    [key: string]: string;
}

/**
 * data 객체와 name 문자열을 받아서, data 객체 내에 name 값에 해당하는 키을 반환하는 함수입니다.
 * @param obj 찾을 객체
 * @param value 찾을 key의 value
 * @returns key
 */
export function getValueByKey(obj: MyObject, value: string) {
    const foundKey = Object.keys(obj).find((key: string) => obj[key] === value);
    return foundKey === undefined ? "" : foundKey;
}
