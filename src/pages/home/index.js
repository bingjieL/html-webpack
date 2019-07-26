import '@/pages/home/index.css'
// import './index.less'
import { testAxios } from '@/server/test.js'
window.onload = function() {
  console.log('--- test',)
}


let test = () => {
  return new Promise((resolve,  reject) => {
    setTimeout(() => {
      resolve('test')
    }, 1000);
  })
}
test().then((res) =>{
  console.log('---> res', res)
})

testAxios({}).then(res => {
  console.log('---> res', res)
})