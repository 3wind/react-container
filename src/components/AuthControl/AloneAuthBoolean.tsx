import { AuthCode } from '../../types';
/**
 * 权限检查
 * @param {*} authCode 权限码
 * @param {*} authList 用户权限列表，在store.global中有存储
 * @use { checkAloneAuthBoolean(authCode, authList)(<Button />) }
 */

export function checkAloneAuthBoolean(authCode: AuthCode, authList: AuthCode[]) {
  if (!authCode) {
    return false;
  }
  const curAuthCodeNumber = parseInt(authCode.toString(), 10);
  const curAuthCodeString = authCode.toString();
  if (
    (authList as number[]).indexOf(curAuthCodeNumber) > -1 ||
    (authList as string[]).indexOf(curAuthCodeString) > -1
  ) {
    return true;
  }
  return false;
}

export default checkAloneAuthBoolean;
