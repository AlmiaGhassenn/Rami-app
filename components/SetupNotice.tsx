'use client'

import { useState } from 'react'
import { AlertCircle, X } from 'lucide-react'

export default function SetupNotice() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 max-w-sm bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg z-50">
      <div className="flex gap-3">
        <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900 mb-1">Setup Required</h3>
          <p className="text-sm text-blue-800 mb-3">
            Make sure you've run the SQL setup queries in your Supabase dashboard. Check the SETUP.md file for details.
          </p>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-blue-600 hover:text-blue-700 underline"
          >
            Go to Supabase Dashboard →
          </a>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-blue-600 hover:text-blue-700 flex-shrink-0"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}
