import axios from 'axios'

export function getPosts(params) {
  const { current, pageSize, text = '' } = params
  return axios.get('/posts', {
    params: {
      current,
      pageSize,
      text
    }
  })
}

export function addPost(body) {
  const { title, content } = body
  return axios.post('/posts', {
    title,
    content
  })
}

export function updatePost(body) {
  const { title, content, id } = body
  return axios.put('/posts', {
    title,
    content,
    id
  })
}

export function getPost(params) {
  const { id } = params
  return axios.get(`/posts/${id}`)
}

export function deletePost(params) {
  const { id } = params
  return axios.delete(`/posts/${id}`)
}