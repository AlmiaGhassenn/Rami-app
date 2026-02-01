# Rami Joker Tracker - Setup Checklist

## Pre-Flight Checklist

Before you start, make sure you have:
- [ ] Supabase project created
- [ ] v0 connected to your Supabase project
- [ ] Browser open to the app preview
- [ ] This checklist visible 📋

## Setup Steps

### Step 1: Database Setup (⏱️ 3 minutes)
- [ ] Open `SETUP.md`
- [ ] Copy all the SQL code
- [ ] Open your Supabase dashboard
- [ ] Go to SQL Editor
- [ ] Paste the code
- [ ] Click "Run"
- [ ] Wait for success message
- [ ] Tables created ✅

**If you get an error:**
- [ ] Check that code was fully copied
- [ ] Make sure no text was cut off
- [ ] Try running in small chunks
- [ ] Check Supabase docs for help

### Step 2: Verify Connection (⏱️ 1 minute)
- [ ] Refresh the app page
- [ ] Check if you see the form
- [ ] Check if you see totals
- [ ] Check if you see history section
- [ ] No error messages visible
- [ ] Connection verified ✅

**If you see errors:**
- [ ] Check Supabase connection in sidebar
- [ ] Verify environment variables are set
- [ ] Refresh the page and try again
- [ ] Check browser console for details

### Step 3: Test Add Transaction (⏱️ 2 minutes)
- [ ] Select "Timoun" as Giver
- [ ] Select "Ghof" as Receiver
- [ ] Enter "1" for jokers
- [ ] Click "Add Transaction"
- [ ] Form clears
- [ ] "Ghof" total changes to 1
- [ ] Entry appears in history
- [ ] Works! ✅

**If it doesn't work:**
- [ ] Check for error message on the form
- [ ] Try different player combination
- [ ] Try number 2-5 instead of 1
- [ ] Check browser console for errors

### Step 4: Test Additional Features (⏱️ 3 minutes)

#### Test Delete
- [ ] Click trash icon on the history entry
- [ ] Confirm deletion
- [ ] Entry disappears
- [ ] Total reverts to 0
- [ ] Delete works ✅

#### Test Multiple Entries
- [ ] Add: Ghof → Ghaith (2 jokers)
- [ ] Add: Timoun → Zaid (1 joker)
- [ ] Add: Zaid → Ghof (3 jokers)
- [ ] Check totals update correctly:
  - Ghof should have 4
  - Ghaith should have 2
  - Zaid should have 1
  - Timoun should have 0
- [ ] Multiple entries work ✅

#### Test Refresh Persistence
- [ ] Press F5 to refresh the page
- [ ] All data still there
- [ ] Totals unchanged
- [ ] History intact
- [ ] Data persisted ✅

### Step 5: Explore Features (⏱️ 5 minutes)
- [ ] Read the APP_OVERVIEW.md
- [ ] Try each feature once
- [ ] Look at timestamp formatting
- [ ] Check responsive layout (resize browser)
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] All features explored ✅

## Troubleshooting Checklist

### Issue: "Cannot give jokers to yourself!"
- [ ] You selected the same player twice
- [ ] **Fix**: Select different giver and receiver

### Issue: "Failed to create transaction"
- [ ] Your internet may have disconnected
- [ ] **Fix**: Check connection, try again

### Issue: "Database not initialized"
- [ ] SQL tables weren't created
- [ ] **Fix**: Follow Step 1 again, make sure SQL ran

### Issue: "Supabase connection error"
- [ ] Not connected to Supabase in sidebar
- [ ] Environment variables not set
- [ ] **Fix**: Check sidebar, reconnect if needed

### Issue: Form won't submit
- [ ] You selected same player twice
- [ ] You entered invalid number (0 or >10)
- [ ] **Fix**: Check your inputs

### Issue: Data disappearing
- [ ] Browser cache needs clear
- [ ] **Fix**: Hard refresh (Ctrl+Shift+R)

### Issue: Totals showing wrong number
- [ ] Browser cache issue
- [ ] **Fix**: Refresh page (F5)
- [ ] **If still wrong**: Check Supabase dashboard

## Validation Tests

Run these tests to verify everything works:

```
Test 1: Basic Add
Input: Timoun → Ghof (1 joker)
Expected: Ghof total = 1
Status: [ ] Pass [ ] Fail

Test 2: Multiple Entries
Input: Add 3 different transactions
Expected: All show in history
Status: [ ] Pass [ ] Fail

Test 3: Delete Entry
Input: Delete one transaction
Expected: Total updates, entry gone
Status: [ ] Pass [ ] Fail

Test 4: Persistence
Input: Refresh page
Expected: All data still there
Status: [ ] Pass [ ] Fail

Test 5: Error Handling
Input: Try invalid input
Expected: Error message shown
Status: [ ] Pass [ ] Fail

Test 6: UI Responsive
Input: Resize browser
Expected: Layout adjusts correctly
Status: [ ] Pass [ ] Fail

Test 7: Timestamps
Input: Add entry
Expected: Timestamp shows current time
Status: [ ] Pass [ ] Fail

Test 8: Totals Calculation
Input: Add multiple entries
Expected: Totals match manual count
Status: [ ] Pass [ ] Fail
```

## Post-Setup Checklist

- [ ] All tests pass
- [ ] No error messages
- [ ] Data persists on refresh
- [ ] UI is responsive
- [ ] Ready to use! 🎉

## Daily Usage Checklist

Each time you use the app:
- [ ] Open the app
- [ ] Add your transactions
- [ ] Check totals look correct
- [ ] Verify history entries
- [ ] Close the app

That's it! Simple and easy.

## Maintenance Checklist (Monthly)

- [ ] Backup your data (export from Supabase if needed)
- [ ] Check for any error messages
- [ ] Verify all players still appear
- [ ] Confirm delete still works
- [ ] Test refresh persistence

## Success Criteria ✅

You're done when:
- ✅ Database is created and running
- ✅ App loads without errors
- ✅ You can add transactions
- ✅ Totals display correctly
- ✅ History shows entries
- ✅ Delete works
- ✅ Data persists after refresh
- ✅ No error messages

## Next Steps

Once everything is working:
1. Start using the app daily
2. Bookmark this page for reference
3. Keep USAGE_GUIDE.md handy
4. Enjoy tracking your Rami games! 🃏

## Emergency Reset

If everything breaks and you need to start over:

1. **Delete tables** (careful!)
   - Go to Supabase
   - Click on "players" table
   - Delete it
   - Click on "joker_transactions" table
   - Delete it

2. **Recreate tables**
   - Open SETUP.md
   - Copy the SQL again
   - Run it in SQL Editor
   - Refresh the app

3. **Start fresh**
   - All data gone (cleared)
   - Tables recreated
   - App ready to use again

⚠️ **Warning**: This permanently deletes all historical data!

---

**You've got this!** 🚀

Follow this checklist from top to bottom, and you'll have a fully working Rami Joker Tracker in 15 minutes.
