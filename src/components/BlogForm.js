import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => { setTitle(event.target.value) }
  const handleAuthorChange = (event) => { setAuthor(event.target.value) }
  const handleUrlChange = (event) => { setUrl(event.target.value) }
  
  const addBlog = async (event) => {
      event.preventDefault()
      const blogObject = {
          title: title,
          author: author,
          url: url
      }

      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog '${blogObject.title}' by ${blogObject.author} added`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Add New Blog</h2>
      Title: <input value={title} onChange={handleTitleChange} /> <br/>
      Author: <input value={author} onChange={handleAuthorChange} /> <br/>
      URL: <input value={url} onChange={handleUrlChange} /> <br />
      <button type='submit'>add</button>
    </form>
  )
}

export default BlogForm