import axios from 'axios'

axios.defaults.baseURL = `${process.env.VUE_APP_BASE_URL}/api`

export async function setToken(token){
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

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

export async function logIn({email, password}){
  try{
    return await axios.post('/auth', 
      {
        email, 
        password
      })
  }
  catch{
    return {error: 'Det gick inte att logga in. Försök igen'}
  }
}

export async function getMe(){
  try{
    return await axios.get('/me')
  }
  catch{
    return {error: 'Ej Inloggad'}
  }
}

export async function getOrderHistory(){
  return await axios.get('/orders')
}

export async function registerUser({email, name, password, address}){
  return await axios.post('/register', {
    email,
    password,
    name,
    address
  })
}