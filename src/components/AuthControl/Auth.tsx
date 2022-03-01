const authList = [1, 2, 3, 4, 5, 6];
/**
 * 权限控制组件
 * @param {*}
 * @use <Auth authCode="xxx"><Button /></Auth>
 */
export interface IProps {
  authCode: any;
  children: any;
}

function Auth(props: IProps) {
  const { authCode } = props;

  if (!authCode) {
    return props.children;
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
          (authList as unknown as string[]).indexOf(curAuthCodeString) > -1
        ) {
          flag = 1;
          break;
        }
      }
      if (flag) {
        return props.children;
      }
      return null;
    }

    // authCode为字符或数字
  } else {
    const authCodeNumber = parseInt(authCode.toString(), 10);
    const authCodeString = authCode.toString();
    if (
      (authList as number[]).indexOf(authCodeNumber) > -1 ||
      (authList as unknown as string[]).indexOf(authCodeString) > -1
    ) {
      return props.children;
    }
    return null;
  }
}

export default Auth;
