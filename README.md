# 🃏 Rami Joker Tracker

A real-time platform to track joker card exchanges in your Rami card games. Built for Timoun, Ghof, Ghaith, and Zaid to track their joker exchanges with persistent storage on Supabase.

## 🚀 Features

- **Track Exchanges**: Log which player gives jokers to which player
- **Running Totals**: See cumulative joker counts for each player at a glance
- **Complete History**: View all transactions with timestamps
- **Persistent Storage**: All data saved in Supabase PostgreSQL
- **Edit & Delete**: Modify or remove incorrect entries
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Real-time Updates**: Changes appear instantly

## 🛠️ Quick Setup

### 1. Connect Supabase

Use the sidebar in v0 to connect your Supabase project. You need:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Create Database

Open your Supabase dashboard SQL Editor and run the queries from **SETUP.md**

The queries will create:
- `players` table with Timoun, Ghof, Ghaith, Zaid
- `joker_transactions` table to store all exchanges

### 3. Start Using

Open the app and start tracking! Everything is automatically saved.

## ☁️ Deploy to Vercel

1. Push your code to GitHub and import the project in [Vercel](https://vercel.com).
2. **Add environment variables** in Vercel:
   - Project → **Settings** → **Environment Variables**
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon/public key
   - Apply to **Production**, **Preview**, and **Development**.
3. Redeploy. The app will work once these variables are set.

Without these variables, the API will return a clear error instead of crashing.

## 📱 How to Use

### Adding a Transaction
1. Select the giver in the "Giver" dropdown
2. Select the receiver in the "Receiver" dropdown
3. Enter the number of jokers (1-10)
4. Click "Add Transaction"

### Viewing Totals
- See each player's total in the colored cards at the top right
- Players are sorted by joker count (highest first)

### Checking History
- Scroll through all transactions with dates and times
- Click the trash icon to delete a transaction
- Confirm deletion when prompted

### Editing (Future)
- Currently supports deletion and re-adding
- Transactions can be deleted and re-recorded as needed

## 🏗️ Architecture

```
/app
  /api
    /transactions      - GET all, POST new transactions
    /transactions/[id] - DELETE, PUT update transaction
    /init              - Database health check
  /page.tsx            - Main tracker page

/components
  TransactionForm.tsx  - Add new transaction form
  TotalsBoard.tsx      - Display running totals
  TransactionHistory.tsx - Show all transactions
  DBInit.tsx           - Database initialization
  SetupNotice.tsx      - Setup reminder banner
```

## 💾 Database Schema

### Players Table
```sql
id (UUID) - Primary key
name (VARCHAR) - Player name (unique)
created_at (TIMESTAMP) - Creation date
```

### Joker Transactions Table
```sql
id (UUID) - Primary key
given_by_id (UUID) - Foreign key to players
given_to_id (UUID) - Foreign key to players
count (INT) - Number of jokers (default 1)
created_at (TIMESTAMP) - Transaction timestamp
updated_at (TIMESTAMP) - Last update timestamp
```

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Policies allow public read/write for now (can be restricted)
- Database constraints prevent self-transactions
- All inputs validated on client and server

## 🎨 Design

- **Color Scheme**: Slate grays with blue accents
- **Layout**: Responsive grid layout
- **Typography**: Clear hierarchy with readable fonts
- **Components**: Built with shadcn/ui and Tailwind CSS

## 📁 Files

- `SETUP.md` - SQL setup instructions
- `APP_OVERVIEW.md` - Feature overview
- `README.md` - This file

## ✅ Next Steps

1. ✅ Create tables in Supabase (see SETUP.md)
2. ✅ Connect your Supabase project
3. ✅ Start tracking jokers!
4. (Optional) Add authentication
5. (Optional) Add export/import features
6. (Optional) Add player statistics and analytics

## 🐛 Troubleshooting

**"Failed to fetch transactions"**
- Check that Supabase tables are created
- Verify environment variables are set
- Check browser console for errors

**"Cannot give jokers to yourself"**
- This is by design - select different players

**No data appearing**
- Run the SQL setup queries from SETUP.md
- Clear browser cache and refresh
- Check Supabase connection in sidebar

## 📞 Support

For issues:
1. Check SETUP.md for database setup
2. Verify Supabase connection in the sidebar
3. Check the browser console for error messages
4. Review the database tables in Supabase dashboard

Enjoy tracking! 🎉
