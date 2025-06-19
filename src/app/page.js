'use client'
import { useState } from 'react'
import axios from 'axios'

export default function Page() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    avatar: null,
    coverImage: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('fullName', form.fullName)
    formData.append('email', form.email)
    formData.append('username', form.username)
    formData.append('password', form.password)
    formData.append('avatar', form.avatar)
    if (form.coverImage) formData.append('coverImage', form.coverImage)
      console.log(formData);
   try {
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL
        const res = await axios.post(`${API_URL}api/v1/users/register`, formData)
        console.log('Dummy registered:', res.data)
        alert(res.data.message || 'Dummy Registered')
      } catch (err) {
        console.error('Dummy registration failed', err)
      }
    

  

  }

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <label>Avatar Image:</label>
        <input type="file" name="avatar" accept="image/*" required onChange={handleChange} />
        <label>Cover Image (optional):</label>
        <input type="file" name="coverImage" accept="image/*" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
