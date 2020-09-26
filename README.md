# Make a web app

- [Make a web app](#make-a-web-app)
  - [1. Source an idea](#1-source-an-idea)
  - [2. Market research](#2-market-research)
    - [Undebt.it keyword competitors:](#undebtit-keyword-competitors)
  - [3. Define functionality](#3-define-functionality)
    - [MVP Features](#mvp-features)
    - [Additional Features](#additional-features)
  - [4. Sketch the web app](#4-sketch-the-web-app)
  - [5. Plan your workflow](#5-plan-your-workflow)
  - [6. Wireframe UI](#6-wireframe-ui)
  - [7. Seek early validation](#7-seek-early-validation)
  - [8. Architect database](#8-architect-database)
  - [9. Develop frontend](#9-develop-frontend)
  - [10. Build backend](#10-build-backend)
  - [11. Host web app](#11-host-web-app)
  - [12. Deploy web app](#12-deploy-web-app)
  - [Misc.](#misc)
    - [Name ideas](#name-ideas)
    - [Dependencies/Libraries](#dependencieslibraries)
    - [Data](#data)
    - [Features](#features)
      - [Stretch goals](#stretch-goals)
    - [Other](#other)
    - [Notes/Questions](#notesquestions)
    - [Target Audience](#target-audience)

## 1. Source an idea

**Idea: Debt Paydown Planner (Web App)**

I have used other web apps and spreadsheets to attempt planning my debt payback. Spreadsheets are flexible enough to give me comparison analysis. Current web apps only provide basic analysis as well. I want to be able to see what different scenarios would produce, see how much money I would save, and dynamically change my plan.

Also, tracking progress is critical to staying the course. I want an app that can give me updates on my plan. I want to set goals and celebrate when I hit milestones. I really want to get invested in crushing my debt!

I came out of college with no idea what I had gotten myself into with the loans I took out. I wanted to have a plan to pay back my loans quickly, but I also wanted to start having kids, save for retirement, and work towards buying a house with my wife.

There are many different approaches to paying back debt. Whatever your approach is, this app will help you plan and commit to paying it down faster.

## 2. Market research

**Target audience:** FIRE community, College grads, Credit card debtors, etc.

### Undebt.it keyword competitors:

- clearcheckbook.com
- unbury.me
- youneedabudget.com
- creditkarma.com
- financialmentor.com
- wellsfargo.com
- bankofamerica.com
- usaa.com
- nerdwallet.com
- barclaycardus.com
- creditsesame.com
- thebalance.com
- daveramsey.com

## 3. Define functionality

### MVP Features

- [ ] Add new loans
- [ ] Remove loans
- [ ] See graph of min. payments
- [ ] Select payment method (avalanche, snowball, custom, etc.)
- [ ] Save data (persist sessions)
- [ ] View payment/loan balance history
- [ ] View money saved so far compared to minimum payments (total and per loan)
- [ ] View time saved compared to minimum payments (total and per loan)
- [ ] View total interest paid (total and per loan)
- [ ] Add additional one-time and scheduled payments to payment plan
- [ ] Add previous payments manually
- [ ] Group loans together

### Additional Features

- [ ] Import/export data
- [ ] Create multiple payment plans
- [ ] Compare payment plans

## 4. Sketch the web app

## 5. Plan your workflow

## 6. Wireframe UI

## 7. Seek early validation

## 8. Architect database

## 9. Develop frontend

## 10. Build backend

## 11. Host web app

## 12. Deploy web app

## Misc.

### Name ideas

- Unborrow
- Paydown
- Unowe
- Unslave
- Debt Destroyer **\***
- Debt-gator
- Debt chomper
- DebtSuccess
- DebtOverthrow
- Mountain Climber
- Freedom planner

### Dependencies/Libraries

- Vue (vue-cli)
- Vuex
- Vue-router
- Firebase Authentication
- Firebase firestore
- Axios
- UI library (vuetify?)
- d3.js (charts/graphs/visuals) or Chart.js

### Data

- Paydown plan object
  - Paydown method (avalanche, snowball, custom etc.)
  - Start date (date last updated)
  - Array of loans
    - Loan provider (Discover, Nelnet, Great Lakes, etc.)
    - Account type (Credit card, student loan, mortgage, etc.)
    - Status (deferment, repayment, etc.)
    - Payback start date
    - starting amount
    - interest rate
    - min. payment
    - payment history array
    - (scheduled?) additional payments
  - Starting snowball amount (amount above total of min. payments)
  - Array of additional payments
    - Date
    - Amount
    - Specific account to apply amount to (null if none)

### Features

- Login
  - Social (Google, Facebook, etc.)
  - Email & Password
- Calculate payoff date
  - Total
  - Per loan
- Import/Export Loan and payoff data
- Apply additional payments
  - to specific account
  - based on paydown method
- Modify snowball amount (+/-)
  - after specific date
  - selected payment periods
- Compare multiple paydown plans (graph overlay?)
- Print payoff plan
- Enter current balances, compare to plan
  - Overlay current amounts
- Enter ideal payoff date, get minimum monthly payment (based on loans entered)
- Progression
  - Total
  - Per account/loan
- Select loan color on chart
- Change loan details for selected pay periods (interest rate, payment amount, etc.)
- Group loans together
- See money saved so far (compared to minimum payments plan)
  - Per loan
  - Total
- Milestone notifications
  - Total progress (10%, 25%, 50%, 75%, 90%, 100%)
  - Individual loan payoff
  - Extra paid off

#### Stretch goals

- Sync with accounts (like PersonaCapital, Mint, etc.)
- Mobile app

### Other

- Social share icons
- Monetize
  - OPTION 1: Gated features in free version
  - OPTION 2: Free trial (14-30 days?)
  - OPTION 3 (forever free): self-hosted instance
  - $5-10/month or $50-100/year?

### Notes/Questions

> "My goal is to help you reach your financial goals and forget about this app!"

- **Highlight money saved on interest!**
- **Highlight time saved**
- Problems avoided by using software
  - Lack of accountability
  - Getting off track
  - Outdated spreadsheets
- Benefits
  - Community
  - Stay on track
  - Easily modify plan
  - Compare plans and scenarios
  - Stay motivated!

### Target Audience

- F.I.R.E. community
- College Grads
- Anyone with debt... (Student loans, credit card payments, car loan, mortgage, etc.)
