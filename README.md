# Life Trinket

A simple life counter for Magic the Gathering written in React JS.

I created this mainly because there was no life counter that I liked on the iOS app store for me and
my friends when we play Commander.

The outcome is a lightweight web app that does what it needs to do and nothing more. No accounts, no
ads, minimal tracking ("Games started" and "Back to start" presses for now),

## 📋 Usage

There are some controls that you might now know about, so here's a short list of them.

### Life counter

- **Tap** on a player's + or - button to add or subtract **1 life**.
- **Long press** on a player's + or - button to add or subtract **10 life**.

### Commander damage and other counters

- **Tap** on the counter to add **1 counter**.
- **Long press** on the counter to subtract **1 counter**.

### Other

- When a player is **at or below 0 life**, has taken **21 or more Commander Damage** or has **10 or
  more poison counters**, a button with a skull will appear on that player's card.

  Tap on the button to mark that player as lost, dimming their player card.

## 🚀 Features

### General features

- 🌐 Web app, no installation required
  - (Though you can and probably should install it as a PWA (Progressive Web App) via your
    mobile browser)
- 📴 Works offline
  - (If you have installed it as a PWA)
- 🆓 Free
- ❌ No ads
  - There is a "Feed this guy" button if you want to support me
- 📈 Minimal tracking

### Life counter features

- 🔢 Life counter for up to 6 players
- 💥 Different types of damage tracking
  - 👑 Commander damage
  - 👫 Partner damage
  - ☠️ Poison
- 📊 Other counters
  - ✨ Experience
  - ⚡ Energy
- 🎨 Full RGB color picker for each player
  - Depends on browser support (Chrome and Safari works at least)

## ⚠️ Known issues

- It is not possible to change player colors in Firefox mobile browsers.
