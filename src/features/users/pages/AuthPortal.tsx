import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useLocation } from 'react-router-dom'
import { authenticate } from '../api/authApi'
import { useAuth } from '@shared/hooks/useAuth'
import { ROUTES } from '@app/constants/routes'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function AuthPortal() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const defaultValues = useMemo(() => ({ email: '', password: '' }), [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const onSubmit = handleSubmit(async (values) => {
    const result = await authenticate(values)
    login(result.user, result.token)
    const redirectPath = (location.state as { from?: Location })?.from?.pathname ?? ROUTES.root
    navigate(redirectPath, { replace: true })
  })

  return (
    <div style={{ maxWidth: 420, margin: '8rem auto', padding: '2rem' }} className="card">
      <h1>Access NexusOS Control</h1>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        Authentication is mocked for scaffolding purposes. Replace with live IDP later.
      </p>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span>Email</span>
          <input type="email" {...register('email')} placeholder="you@nexusos.co" />
          {errors.email && <small style={{ color: '#dc2626' }}>{errors.email.message}</small>}
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span>Password</span>
          <input type="password" {...register('password')} placeholder="••••••••" />
          {errors.password && <small style={{ color: '#dc2626' }}>{errors.password.message}</small>}
        </label>
        <button type="submit" disabled={isSubmitting} style={{ padding: '0.75rem 1rem' }}>
          {isSubmitting ? 'Authenticating…' : 'Enter workspace'}
        </button>
      </form>
    </div>
  )
}
