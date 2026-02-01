'use client'

import { useEffect, useState } from 'react'

export default function DBInit() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initializeDB = async () => {
      try {
        // Try to fetch players to see if DB is set up
        const response = await fetch('/api/init')
        if (response.ok) {
          setInitialized(true)
        }
      } catch (error) {
        console.error('DB initialization check:', error)
      }
    }

    initializeDB()
  }, [])

  return null
}
