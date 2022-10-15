import axios from 'axios'

type ApiRes = {
  code: 1000 | 1001 | -1000
  message: '未知' | '成功' | '失败'
}

export function queryOrder() {
  return axios.get<ApiRes>('/order')
}