import axios from '@/utils/axios';


export const testAxios = () => {
  return axios.post('/api/blog/get',{})
}