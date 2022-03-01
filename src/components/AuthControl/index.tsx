import { Component } from 'react';
import { AuthCode } from '../../types';
/**
 * 权限检查
 * @param {*} authCode 权限码
 * @param {*} authList 用户权限列表，在store.global中有存储
 * @use { checkAuth(authCode, authList)(<Button />) }
 */
export function checkAuth(authCode: AuthCode, authList: AuthCode[]) {
  return (component: Component | JSX.Element) => {
    if (!authCode) {
      return component;
    }

    // authCode为字符或数字数组
    // 权限点数组，多个权限点同时控制一个页面或功能的展示
    // 只要有一个权限点存在，该页面或功能就展示
    if (Array.isArray(authCode)) {
      if (authCode.length) {
        let flag = 0;
        for (let i = 0; i < authCode.length; i++) {
          const curAuthCodeNumber = parseInt(authCode[i].toString(), 10);
          const curAuthCodeString = authCode[i].toString();
          if (
            (authList as number[]).indexOf(curAuthCodeNumber) > -1 ||
            (authList as string[]).indexOf(curAuthCodeString) > -1
          ) {
            flag = 1;
            break;
          }
        }
        if (flag) {
          return component;
        }
      }
      return null;

      // authCode为字符或数字
    } else {
      const authCodeNumber = parseInt(authCode.toString(), 10);
      const authCodeString = authCode.toString();
      if (
        (authList as number[]).indexOf(authCodeNumber) > -1 ||
        (authList as string[]).indexOf(authCodeString) > -1
      ) {
        return component;
      }
      return null;
    }
  };
}

export default checkAuth;
