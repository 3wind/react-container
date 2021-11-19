import { RouteProps } from '@/route';

// 获取输入path在routes中的层级path数组
export const getOpenKeys = (path: string, routes: RouteProps[], paths: string[]): any => {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path === path) {
      return true
    } else if (routes[i].children && routes[i].children.length > 0) {
      if(getOpenKeys(path, routes[i].children, paths)) {
        paths.push(routes[i].path);
      }
    }
  }
  return false
};
