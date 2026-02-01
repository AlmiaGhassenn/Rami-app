# Rami Joker Tracker - Usage Guide

## First Time Setup

### Step 1: Database Setup
Before using the app, you need to set up the Supabase database.

1. Go to your Supabase Dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"
4. Copy all the SQL code from `SETUP.md`
5. Paste it into the SQL Editor
6. Click "Run" to execute

You should see:
- ✅ Tables created
- ✅ Players inserted (Timoun, Ghof, Ghaith, Zaid)
- ✅ Indexes created
- ✅ Policies enabled

### Step 2: Verify Connection
1. Refresh the app
2. You should see the form, totals, and history section
3. If you see an error message, check that your Supabase credentials are correct

## Using the Tracker

### Scenario 1: Timoun gives 2 jokers to Ghof

1. **Open the app**
   - You'll see the form on the left, totals and history on the right

2. **Fill the form**
   - Giver: Select "Timoun"
   - Receiver: Select "Ghof"
   - Number of Jokers: Enter "2"

3. **Submit**
   - Click "Add Transaction"
   - Form clears (ready for next entry)

4. **See results**
   - Totals: Ghof's count increases by 2
   - History: New entry appears at the top with timestamp
   - Example: "Timoun → Ghof (2 jokers) - Feb 1 2:30 PM"

### Scenario 2: View Current Game Status

The **Totals Board** shows:
```
Ghof: 5 jokers
Timoun: 3 jokers
Zaid: 2 jokers
Ghaith: 0 jokers
```

(Sorted from most to least jokers)

### Scenario 3: Undo a Mistake

If you entered "Timoun → Ghof 2 jokers" but meant 3:

1. Find the transaction in the History
2. Click the trash icon next to it
3. Confirm the deletion
4. Re-enter with the correct amount

### Scenario 4: Check Full History

Scroll through the **History** section to see:
- All exchanges ever made
- Who gave to whom
- Exact timestamps
- Quick delete option

## Common Tasks

### Task: Check if Ghaith has received any jokers
1. Look at Ghaith's count in the Totals section
2. If it's 0, Ghaith hasn't received any
3. Check the History for entries mentioning "Ghaith"

### Task: Determine who gave the most jokers
1. Look at the Totals Board
2. It's sorted highest to lowest
3. The first player gave/received the most

### Task: Remove all traces of a transaction
1. Find it in the History
2. Click trash icon
3. Click "Yes" to confirm
4. Totals automatically recalculate

### Task: Export game records
1. Take a screenshot of the totals and history
2. Or copy data from Supabase dashboard directly

## Understanding the Display

### Totals Board
```
┌─────────────────────────────┐
│       Rami Joker Tracker    │
│  Track joker card exchanges │
└─────────────────────────────┘

┌──────────┬──────────┬──────────┬──────────┐
│ Ghof     │ Timoun   │ Zaid     │ Ghaith   │
│    5     │    3     │    2     │    0     │
│ jokers   │ jokers   │ jokers   │ jokers   │
└──────────┴──────────┴──────────┴──────────┘
```

### Transaction Entry
```
[Timoun] → [Ghof] (2 jokers) - Feb 1 2:30 PM [🗑️]
```
- ← Who gave
- → Who received
- Number of jokers in parentheses
- Timestamp
- Delete button (trash icon)

## Tips & Tricks

✅ **Pro Tip 1**: Enter transactions immediately after each round
- This keeps the data accurate
- Easy to remember while it's fresh

✅ **Pro Tip 2**: Verify totals match your game
- At the end of each game, check if totals make sense
- Total jokers given out should equal total received

✅ **Pro Tip 3**: Use the history for disputes
- If players disagree on who gave what
- Refer to the timestamp-stamped history
- It's the source of truth

⚠️ **Caution**: Deleting is permanent
- Once you delete a transaction, it's gone
- You'll need to re-enter it manually
- The undo feature is just to re-add

## Troubleshooting

### "Cannot give jokers to yourself!"
**Problem**: You selected the same player as giver and receiver

**Solution**: 
- Select different players
- Giver and receiver must be different

### "Failed to create transaction"
**Problem**: Something went wrong saving to the database

**Solutions**:
1. Check your internet connection
2. Verify Supabase is connected (check sidebar)
3. Refresh the page and try again
4. Check browser console for error details

### "Database not initialized"
**Problem**: The SQL tables haven't been created yet

**Solution**:
1. Open SETUP.md
2. Copy all SQL queries
3. Run in Supabase SQL Editor
4. Refresh the app

### Form won't submit
**Problem**: Something is preventing form submission

**Check**:
- Did you select two different players?
- Did you enter a number 1-10?
- Is the page still loading?
- Try refreshing the page

## Data Storage

All your data is stored in **Supabase PostgreSQL**:
- ✅ Persists across sessions
- ✅ Survives browser refresh
- ✅ Accessible from any device
- ✅ Secure with RLS policies
- ✅ Backed up by Supabase

To see raw data:
1. Go to Supabase Dashboard
2. Click "SQL Editor"
3. Run: `SELECT * FROM joker_transactions;`
4. You'll see all transactions in the database

## Getting Help

If something isn't working:

1. **Check SETUP.md**
   - Make sure all SQL was run
   - Verify tables exist in Supabase

2. **Check the browser console**
   - Right-click → Inspect → Console tab
   - Look for error messages
   - Copy the error and check if it helps

3. **Verify connection**
   - Check sidebar for Supabase connection status
   - Make sure environment variables are set
   - Try refreshing the page

4. **Start fresh (if needed)**
   - Clear browser data for this site
   - Hard refresh (Ctrl+Shift+R)
   - Verify Supabase tables still exist
   - Try again

## Keyboard Shortcuts

- **Tab**: Navigate between form fields
- **Enter**: Submit the form
- **Escape**: Close error messages (after clearing them manually)

## Next Features Coming

Future versions might include:
- Edit transactions (instead of delete & re-add)
- Export to CSV
- Player stats and analytics
- Game session grouping
- Undo/Redo functionality
- Multi-device sync notifications

Enjoy tracking your Rami games! 🎉
