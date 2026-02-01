'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const PLAYERS = ['Timoun', 'Ghof', 'Ghaith', 'Zaid']

interface TransactionFormProps {
  onTransactionAdded: () => void
}

export default function TransactionForm({ onTransactionAdded }: TransactionFormProps) {
  const [givenBy, setGivenBy] = useState(PLAYERS[0])
  const [givenTo, setGivenTo] = useState(PLAYERS[1])
  const [count, setCount] = useState('1')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (givenBy === givenTo) {
      setError('Cannot give jokers to yourself!')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          given_by: givenBy,
          given_to: givenTo,
          count: parseInt(count),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add transaction')
      }

      setGivenBy(PLAYERS[0])
      setGivenTo(PLAYERS[1])
      setCount('1')
      onTransactionAdded()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Add Jokers</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Giver
          </label>
          <select
            value={givenBy}
            onChange={(e) => setGivenBy(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {PLAYERS.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Receiver
          </label>
          <select
            value={givenTo}
            onChange={(e) => setGivenTo(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {PLAYERS.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Number of Jokers
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
        >
          {loading ? 'Adding...' : 'Add Transaction'}
        </Button>
      </form>
    </div>
  )
}
