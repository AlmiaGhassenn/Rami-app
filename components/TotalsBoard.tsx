'use client'

import { useMemo } from 'react'

const PLAYERS = ['Timoun', 'Ghof', 'Ghaith', 'Zaid']

interface Transaction {
  id: string
  count: number
  given_by?: { name: string }
  given_to?: { name: string }
}

interface TotalsBoardProps {
  transactions: Transaction[]
  loading: boolean
}

export default function TotalsBoard({ transactions, loading }: TotalsBoardProps) {
  const totals = useMemo(() => {
    const playerTotals: { [key: string]: number } = {}
    PLAYERS.forEach((player) => {
      playerTotals[player] = 0
    })

    transactions.forEach((tx) => {
      if (tx.given_to?.name) {
        playerTotals[tx.given_to.name] = (playerTotals[tx.given_to.name] || 0) + tx.count
      }
    })

    return playerTotals
  }, [transactions])

  const sortedPlayers = useMemo(() => {
    return PLAYERS.sort((a, b) => totals[b] - totals[a])
  }, [totals])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Totals</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sortedPlayers.map((player) => (
          <div
            key={player}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200"
          >
            <p className="text-sm text-slate-600 mb-1">{player}</p>
            <p className="text-3xl font-bold text-blue-600">{totals[player]}</p>
            <p className="text-xs text-slate-500 mt-2">jokers</p>
          </div>
        ))}
      </div>
    </div>
  )
}
