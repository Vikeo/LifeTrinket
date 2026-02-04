# Firestore Setup for URL Shortener

This document explains how to set up Firestore TTL (Time to Live) for automatic cleanup of expired share links.

## What is TTL?

TTL (Time to Live) automatically deletes Firestore documents after a specified timestamp. In this app, share links expire after **30 minutes** to:
- Keep storage costs at $0
- Maintain privacy (game data isn't stored forever)
- Encourage immediate sharing

## Setup Steps

### 1. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

This deploys the security rules in `firestore.rules`.

### 2. Enable TTL Policy (One-Time Setup)

TTL policies must be configured via the Firebase Console or gcloud CLI:

#### Option A: Firebase Console (Easiest)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **life-trinket**
3. Navigate to **Firestore Database** → **Data**
4. Click the **TTL** tab at the top
5. Click **Create policy**
6. Configure:
   - **Collection group ID**: `sharedGames`
   - **Timestamp field**: `expiresAt`
   - Click **Create**

#### Option B: gcloud CLI

```bash
# Install gcloud CLI if not already installed
# https://cloud.google.com/sdk/docs/install

# Authenticate
gcloud auth login

# Set your project
gcloud config set project life-trinket

# Create TTL policy
gcloud firestore fields ttls create expiresAt \
  --collection-group=sharedGames \
  --project=life-trinket
```

### 3. Verify Setup

After creating the TTL policy:

1. Create a share link in the app (with large game data)
2. Wait 30 minutes
3. Check Firestore console - the document should be automatically deleted
4. Try scanning the QR code - should show "Link Expired" error

## How It Works

### Creating a Share Link

```typescript
// In firebaseShortener.ts
const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

await setDoc(docRef, {
  gameState: {...},
  createdAt: serverTimestamp(),
  expiresAt, // TTL field
});
```

### Client-Side Check

```typescript
// Check if expired before returning
if (data.expiresAt && data.expiresAt < new Date()) {
  return null; // Link expired
}
```

### Server-Side Cleanup

Firestore's TTL policy automatically deletes documents where `expiresAt < current_time`.

## Cost Impact

**Before TTL:**
- 1000 shares/month = 4 MB storage = ~$0.72/year

**With TTL (30 min expiration):**
- Documents auto-delete after 30 min
- Average storage: ~2 MB = **$0.00** (free tier)
- Minimal storage costs forever ✅

## Monitoring

Check TTL policy status:

```bash
gcloud firestore fields ttls list \
  --collection-group=sharedGames \
  --project=life-trinket
```

## Troubleshooting

### Links not being deleted after 30 minutes

1. Verify TTL policy is created (check Firebase Console)
2. TTL deletion can take up to 72 hours to start (one-time delay)
3. Check that documents have `expiresAt` field with proper Timestamp type

### Users seeing "Link Expired" immediately

- System clock issue - `expiresAt` is in the past
- Check server time vs client time synchronization

## Alternative: Manual Cleanup

If you prefer not to use TTL, you can run a Cloud Function for cleanup:

```typescript
// functions/src/index.ts
export const cleanupExpiredLinks = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async () => {
    const now = admin.firestore.Timestamp.now();
    const expired = await admin.firestore()
      .collection('sharedGames')
      .where('expiresAt', '<', now)
      .limit(500)
      .get();

    const batch = admin.firestore().batch();
    expired.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  });
```

But TTL is simpler and doesn't require Cloud Functions (which cost money).
