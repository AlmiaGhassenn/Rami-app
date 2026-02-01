# Rami Joker Tracker - App Overview

## What You Get

A beautiful, real-time joker tracking platform for your Rami card games with persistent storage.

## Features at a Glance

### 1. Add Transactions (Left Sidebar)
- **From**: Select which player is giving jokers
- **To**: Select which player is receiving jokers
- **Number of Jokers**: Enter 1-10 jokers
- Submit button to save the transaction
- Real-time validation (can't give to yourself)
- Error messages for invalid inputs

### 2. Running Totals (Top Right)
- Four cards showing each player's total joker count
- Sorted by highest to lowest count
- Color-coded with blue gradient backgrounds
- Updates instantly when you add a transaction
- Shows "Timoun", "Ghof", "Ghaith", "Zaid" with their counts

### 3. Transaction History (Bottom Right)
- Complete log of all joker exchanges
- Each entry shows:
  - Who gave to whom
  - Number of jokers transferred
  - Exact date and time
  - Delete button (trash icon)
- Scrollable list (max height for readability)
- "No transactions yet" message when empty
- Delete with confirmation prompt

## Design

**Color Scheme:**
- Clean slate grays and whites
- Blue accents for primary actions
- Red for delete actions
- Subtle gradient background

**Layout:**
- Responsive design (mobile, tablet, desktop)
- Left sidebar: Form (sticky position)
- Right side: Totals and History stacked
- On mobile: Form stacks on top

**Typography:**
- Large, bold headers
- Clear labels and instructions
- Readable body text with good contrast
- Timestamps in human-readable format

## Data Persistence

✅ All data is stored in Supabase PostgreSQL database
✅ Survives app refreshes and closures
✅ Full transaction history with timestamps
✅ Can be accessed from anywhere

## Next Steps

1. Copy the SQL setup queries from SETUP.md
2. Paste them into your Supabase SQL Editor
3. Open the app and start tracking!

That's it! No configuration needed beyond the initial SQL setup.
