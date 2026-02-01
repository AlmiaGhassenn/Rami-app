'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

const PLAYERS = ['Timoun', 'Ghof', 'Ghaith', 'Zaid']

interface Transaction {
  id: string
  count: number
  created_at: string
  given_by?: { name: string }
  given_to?: { name: string }
}

interface TransactionHistoryProps {
  transactions: Transaction[]
  loading: boolean
  onTransactionDeleted: () => void
  onTransactionUpdated?: () => void
}

export default function TransactionHistory({
  transactions,
  loading,
  onTransactionDeleted,
  onTransactionUpdated,
}: TransactionHistoryProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingTx, setEditingTx] = useState<Transaction | null>(null)
  const [editGivenBy, setEditGivenBy] = useState(PLAYERS[0])
  const [editGivenTo, setEditGivenTo] = useState(PLAYERS[1])
  const [editCount, setEditCount] = useState('1')
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)

  useEffect(() => {
    if (editingTx) {
      setEditGivenBy(editingTx.given_by?.name ?? PLAYERS[0])
      setEditGivenTo(editingTx.given_to?.name ?? PLAYERS[1])
      setEditCount(String(editingTx.count))
      setEditError(null)
    }
  }, [editingTx])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return

    try {
      setDeletingId(id)
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete transaction')
      }

      onTransactionDeleted()
    } catch (error) {
      console.error('Error deleting transaction:', error)
      alert('Failed to delete transaction')
    } finally {
      setDeletingId(null)
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTx) return
    setEditError(null)
    if (editGivenBy === editGivenTo) {
      setEditError('Cannot give jokers to yourself!')
      return
    }
    try {
      setEditLoading(true)
      const response = await fetch(`/api/transactions/${editingTx.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          given_by: editGivenBy,
          given_to: editGivenTo,
          count: parseInt(editCount),
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to update transaction')
      }
      setEditingTx(null)
      onTransactionUpdated?.()
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setEditLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

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

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-slate-500">No transactions yet. Add your first joker exchange!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">History</h2>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <div className="flex-1">
              <p className="text-sm text-slate-900">
                <span className="font-semibold">{tx.given_by?.name}</span>
                <span className="text-slate-500 mx-2">→</span>
                <span className="font-semibold">{tx.given_to?.name}</span>
                <span className="text-slate-600 ml-2">({tx.count} joker{tx.count > 1 ? 's' : ''})</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">{formatDate(tx.created_at)}</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => setEditingTx(tx)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                title="Edit transaction"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(tx.id)}
                disabled={deletingId === tx.id}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                title="Delete transaction"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editingTx} onOpenChange={(open) => !open && setEditingTx(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit joker transaction</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Giver</label>
              <select
                value={editGivenBy}
                onChange={(e) => setEditGivenBy(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {PLAYERS.map((player) => (
                  <option key={player} value={player}>{player}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Receiver</label>
              <select
                value={editGivenTo}
                onChange={(e) => setEditGivenTo(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {PLAYERS.map((player) => (
                  <option key={player} value={player}>{player}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Number of jokers</label>
              <input
                type="number"
                min={1}
                max={10}
                value={editCount}
                onChange={(e) => setEditCount(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {editError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {editError}
              </div>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingTx(null)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={editLoading}>
                {editLoading ? 'Saving...' : 'Save changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
