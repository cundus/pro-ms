import { useNavigate } from '@remix-run/react'

const LoginPage = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/dashboard')
  }

  return (
    <div>
      <p>LoginPage</p>
      <button onClick={handleLogin}>login</button>
    </div>
  )
}

export default LoginPage
