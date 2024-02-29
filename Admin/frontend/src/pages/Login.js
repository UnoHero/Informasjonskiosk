import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState("")
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(name, email, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Full name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login