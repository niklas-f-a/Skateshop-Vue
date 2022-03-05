import axios from 'axios'

axios.defaults.baseURL = `${process.env.VUE_APP_BASE_URL}/api`

export async function getProductById(id){
    return axios.get(`/items/${id}`)
}