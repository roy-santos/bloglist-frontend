import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogServices from './services/blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Button from './components/Button'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogServices.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setMessage('Successfully logged out')
    setTimeout(() => {
      setMessage('')
    }, 5000)

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username {' '}
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password {' '}
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form>
          {loginForm()}
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      <p>
        {user.name} has logged in {' '}
        <Button handleClick={handleLogout} text='logout' />
      </p>
      <BlogForm user={user} blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
      <h2>My Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App