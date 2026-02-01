# Rami Joker Tracker - Setup Guide

## Quick Start

This is a Rami card game joker tracking platform for Timoun, Ghof, Ghaith, and Zaid.

### 1. Connect Supabase

Make sure you have Supabase connected to your v0 project. Use the sidebar to connect your Supabase instance.

### 2. Create Database Tables

Open your Supabase dashboard and run the following SQL queries in the SQL Editor:

```sql
-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert the 4 players
INSERT INTO players (name) VALUES ('Timoun'), ('Ghof'), ('Ghaith'), ('Zaid')
ON CONFLICT (name) DO NOTHING;

-- Create joker transactions table
CREATE TABLE IF NOT EXISTS joker_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  given_by_id UUID NOT NULL REFERENCES players(id) ON DELETE RESTRICT,
  given_to_id UUID NOT NULL REFERENCES players(id) ON DELETE RESTRICT,
  count INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT different_players CHECK (given_by_id != given_to_id)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_joker_given_by ON joker_transactions(given_by_id);
CREATE INDEX IF NOT EXISTS idx_joker_given_to ON joker_transactions(given_to_id);
CREATE INDEX IF NOT EXISTS idx_joker_created_at ON joker_transactions(created_at);

-- Enable Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE joker_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies - Allow all operations for now
CREATE POLICY "Allow all to view players" ON players FOR SELECT USING (true);
CREATE POLICY "Allow all to view transactions" ON joker_transactions FOR SELECT USING (true);
CREATE POLICY "Allow all to insert transactions" ON joker_transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all to update transactions" ON joker_transactions FOR UPDATE USING (true);
CREATE POLICY "Allow all to delete transactions" ON joker_transactions FOR DELETE USING (true);
```

### 3. Environment Variables

Your Supabase credentials should already be set up. The app uses:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Done!

The app will now:
- Track joker exchanges between players
- Show running totals for each player
- Display full transaction history with timestamps
- Allow editing and deleting of entries
- Save everything to Supabase automatically

## Features

- **Add Transactions**: Simple form to record who gave jokers to whom
- **View Totals**: See cumulative joker counts for each player
- **Transaction History**: Complete log of all exchanges with timestamps
- **Edit & Delete**: Modify or remove incorrect entries
- **Persistent Storage**: All data is saved in Supabase

## How to Use

1. Select the player giving jokers in the "From" field
2. Select the player receiving jokers in the "To" field
3. Enter the number of jokers
4. Click "Add Transaction"
5. View totals and history on the right side
6. Delete transactions by clicking the trash icon if needed
