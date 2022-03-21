import axios from 'axios'

axios.defaults.baseURL = `${process.env.VUE_APP_BASE_URL}/api`

export async function getProductById(id){
  return await axios.get(`/items/${id}`)
}

export async function getProductsByPage(page){
  return await axios.get(`/items?page=${page}`)
}

export async function getProductsByCategory(category){
	return await axios.get(`/items?category=${category}`)
}

export async function getSearch(searchWord){
	return await axios.get(`/items?search=${searchWord}`)
}

export async function registerOrder(payload){
  try{
    return await axios.post('/orders', payload)
  }
  catch{
    return {error: 'Nånting gick fel. Försök igen.'}
 }
}