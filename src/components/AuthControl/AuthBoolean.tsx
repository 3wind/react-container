import { AuthCode, AuthCodeKeyMap } from '../../types';
/**
 * 权限检查
 * @param {*} authCode 权限码
 * @param {*} authList 用户权限列表，在store.global中有存储
 * @use { checkAuthReturnBoolean(authCode, authList)(<Button />) }
 */

export function checkAuthReturnBoolean(authCode: AuthCodeKeyMap, authList: AuthCode[]) {
  if (!authCode.length) {
    return [];
  }
  const flag = [];
  for (let i = 0; i < authCode.length; i++) {
    const curAuthCodeNumber = parseInt(authCode[i]['auth'].toString(), 10);
    const curAuthCodeString = authCode[i]['auth'].toString();
    if (
      (authList as number[]).indexOf(curAuthCodeNumber) > -1 ||
      (authList as string[]).indexOf(curAuthCodeString) > -1
    ) {
      const curAuth = { ...authCode[i] };
      flag.push(curAuth);
    }
  }
  return flag;
}

export default checkAuthReturnBoolean;
