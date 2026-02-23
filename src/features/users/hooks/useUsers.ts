import { useEffect, useState } from 'react'
import type { UserAccount } from '../types'
import { fetchUsers } from '../api/usersApi'

interface UsersState {
  users: UserAccount[]
  isLoading: boolean
}

const initialState: UsersState = {
  users: [],
  isLoading: true,
}

export const useUsers = () => {
  const [state, setState] = useState<UsersState>(initialState)

  useEffect(() => {
    let isMounted = true
    fetchUsers().then((users) => {
      if (!isMounted) return
      setState({ users, isLoading: false })
    })
    return () => {
      isMounted = false
    }
  }, [])

  return state
}
