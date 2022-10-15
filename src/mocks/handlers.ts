import { rest } from 'msw'

type Post = {
  id: number
  title: string
  author: string
  createTime: string
  content: string
}

const posts = [
  { id: 1, title: 'title1', author: 'utopia', createTime: 'Sat Oct 15 2022 12:04:30 GMT+0800 (中国标准时间)', content: 'content1' },
  { id: 2, title: 'title2', author: 'utopia2', createTime: 'Sat Oct 15 2022 13:04:30 GMT+0800 (中国标准时间)', content: 'content2' },
  { id: 3, title: 'title3', author: 'utopia3', createTime: 'Sat Oct 15 2022 11:09:30 GMT+0800 (中国标准时间)', content: 'content3' },
  { id: 4, title: 'title4', author: 'utopia4', createTime: 'Sat Oct 15 2022 02:02:20 GMT+0800 (中国标准时间)', content: 'content4' },
  { id: 5, title: 'title5', author: 'utopia5', createTime: 'Sat Oct 15 2022 19:08:30 GMT+0800 (中国标准时间)', content: 'content5' },
]

function wrapRes(data: any, success: boolean) {
  return {
    success,
    data,
  }
}

const getAllPosts = () => {
  const postsString = sessionStorage.getItem('msw-posts')
  if (postsString) {
    return JSON.parse(postsString) as Post[]
  }
  sessionStorage.setItem('msw-posts', JSON.stringify(posts))
  return posts
}
const deletePost = (id: number) => {
  const posts = getAllPosts()
  const newPosts = posts.filter((post) => post.id !== id)
  sessionStorage.setItem('msw-posts', JSON.stringify(newPosts))
}

export const handlers = [
  rest.get('/posts', (req, res, ctx) => {
    const searchParams = req.url.searchParams
    const current = parseInt(searchParams.get('current')!)
    const pageSize = parseInt(searchParams.get('pageSize')!)
    const text = searchParams.get('text') || ''

    const allPosts = getAllPosts().filter(v => v.title.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1).sort((a, b) => b.id - a.id)
    const total = allPosts.length
    const start = (current - 1) * pageSize
    const end = start + pageSize
    const data = allPosts.slice(start, end)

    return res(
      ctx.status(200),
      ctx.json(
        wrapRes({
          list: data,
          total
        }, true)
      ),
    )
  }),

  rest.put('/posts', async (req, res, ctx) => {
    const { title, content, id } = await req.json<Post>()
    const posts = getAllPosts()

    const curPost = posts.find((post) => post.id === id)

    if (curPost) {
      curPost.title = title
      curPost.content = content
    }

    sessionStorage.setItem('msw-posts', JSON.stringify(posts))
    return res(
      ctx.status(200),
      ctx.json(
        wrapRes(true, true)
      ),
    )
  }),

  rest.post('/posts', async (req, res, ctx) => {
    const { title, content } = await req.json<Post>()
    const posts = getAllPosts()

    const maxId = posts.sort((a, b) => b.id - a.id)?.[0]?.id
    const newPost: Post = {
      id: maxId + 1,
      title,
      content,
      createTime: new Date().toString(),
      author: 'guest',
    }

    posts.push(newPost)
    sessionStorage.setItem('msw-posts', JSON.stringify(posts))
    return res(
      ctx.status(200),
      ctx.json(
        wrapRes(newPost, true)
      ),
    )
  }),

  rest.get('/posts/:id', (req, res, ctx) => {
    const id = parseInt(req.params.id as string)
    const allPosts = getAllPosts()
    const post = allPosts.find((post) => post.id === id)
    if (post) {
      return res(
        ctx.status(200),
        ctx.json(
          wrapRes(post, true)
        ),
      )
    }
    return res(
      ctx.status(200),
      ctx.json(
        wrapRes(null, false)
      ),
    )
  }),

  rest.delete('/posts/:id', (req, res, ctx) => {
    const id = parseInt(req.params.id as string)
    deletePost(id)

    return res(
      ctx.status(200),
      ctx.json(
        wrapRes(id, true)
      )
    )
  }),

  rest.get('/order', (req, res, ctx) => {
    // 随机生成 0 到 1000 的整数
    const random = Math.floor(Math.random() * 1000)
    let data: {
      message: string
      code: number,
      random: number
    }
    if (random < 100) {
      data = {
        message: '成功',
        code: 1000,
      }
    } else if( random > 100 && random < 900) {
      data = {
        message: '未知',
        code: -1000,
      }
    } else {
      data = {
        message: '失败',
        code: 1001,
      }
    }

    data.random = random
    return res(
      ctx.status(200),
      ctx.json(
        data
      )
    )
  })
]