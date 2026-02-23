import { useEffect, useState } from 'react'
import type { Project } from '../types'
import { fetchProjects } from '../api/projectsApi'

interface UseProjectsState {
  data: Project[]
  isLoading: boolean
}

export const useProjects = () => {
  const [state, setState] = useState<UseProjectsState>({ data: [], isLoading: true })

  useEffect(() => {
    let isMounted = true
    fetchProjects().then((projects) => {
      if (!isMounted) return
      setState({ data: projects, isLoading: false })
    })
    return () => {
      isMounted = false
    }
  }, [])

  return state
}
