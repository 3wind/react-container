import { deepClone } from "./clone";

export const downloadFile = (fileUrl: string) => {
  try {
    let a = document.createElement("a");
    let url = fileUrl
    a.setAttribute('href', url)
    a.setAttribute('download', '')
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
  } catch {
    window.open(fileUrl)
  }
};


// const options = {
//   url: '/download',
//   method: 'post',
//   data: data
// }

export const downLoadFileWithParam = function(options: any) {
  const config: any = {
    method: 'post'
  }
  deepClone(config, options) // 传参赋值
  // config.data['X-Token'] = getToken()
  const form = document.createElement('form')
  try {
    form.id = 'downLoad_form'
    form.name = 'downLoad_form'
    form.method = config.method // 请求方式
    form.action = config.url
    form.target = '_blank'
    // 将该输入框插入到 form 中
    for (let key in config.data) {
      const inputChild = document.createElement('input')
      // 设置相应参数
      inputChild.type = 'text'
      inputChild.name = key
      inputChild.value = config.data[key]
      form.appendChild(inputChild)
    }
    document.body.appendChild(form)
    form.submit()
  } catch (e) {
    console.log(e)
  } finally {
    document.body.removeChild(form)
  }
}
