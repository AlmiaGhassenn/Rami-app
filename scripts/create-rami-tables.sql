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

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_joker_given_by ON joker_transactions(given_by_id);
CREATE INDEX IF NOT EXISTS idx_joker_given_to ON joker_transactions(given_to_id);
CREATE INDEX IF NOT EXISTS idx_joker_created_at ON joker_transactions(created_at);

-- Enable RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE joker_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow all to view players" ON players FOR SELECT USING (true);
CREATE POLICY "Allow all to view transactions" ON joker_transactions FOR SELECT USING (true);
CREATE POLICY "Allow all to insert transactions" ON joker_transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all to update transactions" ON joker_transactions FOR UPDATE USING (true);
CREATE POLICY "Allow all to delete transactions" ON joker_transactions FOR DELETE USING (true);
