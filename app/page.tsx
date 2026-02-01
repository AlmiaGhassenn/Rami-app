'use client'

import { useState, useEffect } from 'react'
import DBInit from '@/components/DBInit'
import SetupNotice from '@/components/SetupNotice'
import TransactionForm from '@/components/TransactionForm'
import TransactionHistory from '@/components/TransactionHistory'
import TotalsBoard from '@/components/TotalsBoard'

export default function Home() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTransactions()
  }, [refresh])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/transactions')
      if (!response.ok) {
        console.log("[v0] API response not OK:", response.status)
        setError('Database not initialized. Please run the SQL setup from SETUP.md')
        setTransactions([])
        return
      }
      const data = await response.json()
      setTransactions(data || [])
    } catch (error) {
      console.error('[v0] Error fetching transactions:', error)
      setError('Failed to connect to database. Check your Supabase connection.')
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  const handleTransactionAdded = () => {
    setRefresh((prev) => prev + 1)
  }

  const handleTransactionDeleted = () => {
    setRefresh((prev) => prev + 1)
  }

  const handleTransactionUpdated = () => {
    setRefresh((prev) => prev + 1)
  }

  return (
    <>
      <DBInit />
      <SetupNotice />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Rami Joker Tracker</h1>
          <p className="text-slate-600">Track joker card exchanges between players</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-900 text-sm">{error}</p>
          </div>
        )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Form */}
            <div className="lg:col-span-1">
              <TransactionForm onTransactionAdded={handleTransactionAdded} />
            </div>

            {/* Right Column - Totals and History */}
            <div className="lg:col-span-2 space-y-6">
              <TotalsBoard transactions={transactions} loading={loading} />
              <TransactionHistory 
                transactions={transactions} 
                loading={loading}
                onTransactionDeleted={handleTransactionDeleted}
                onTransactionUpdated={handleTransactionUpdated}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
