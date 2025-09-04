# Interactive Graph App
## Tech Stack
React (UI framework) D3.js (charting, mandatory) Material UI (optional, for styling)

## Features
Graph (D3) - Standard X and Y axes. Add a point by double-clicking. Drag existing points to update coordinates. Click to add a point.

## Table (below the graph) - 
Lists all points with ID, X, and Y coordinates. Inline editing of table values. Edit via pop-up (no submit button required). Bi-directional sync Changes in the graph update the table. Changes in the table update the graph.

## Hover interactions - 
Hovering over a table row highlights the point on the graph (and vice versa).

## Requirements
Modular, reusable, and clean code. Clear architecture with proper interfaces. Short demo video or hosted link. Clean README with easy setup instructions. Login page (using a 3rd party tool).

## Enhancements added 
- Ability to delete a particular point.
- Live project ([link](https://liquidity-lock-assignment.vercel.app/login)).
- Option to Reset Graph and table with the Clear All button
- Option to Export the Data Table in CSV format
- Logout option.
- Ability to sort the points in the table.


## Steps followed 
- Step 1 - Project Setup (React, TypeScript, D3, Redux, MUI for table, Firebase, Tailwind setup). Link - https://github.com/radhika757/Liquidity-Lock-Assignment/pull/1
- Step 2 - Basic App Layout & Auth (Creating Firebase, implementing useAuth(), routes /login and /dashboard), Link - https://github.com/radhika757/Liquidity-Lock-Assignment/pull/2
- Step 3 - Chart MVP (rendering points, dragging points, hovering effects {tooltip showing names of points}), Link - https://github.com/radhika757/Liquidity-Lock-Assignment/pull/3
- Step 4 - Table MVP ( Render table using MUI, Inline cell edit, Edit with popup, delete row.), Link - https://github.com/radhika757/Liquidity-Lock-Assignment/pull/4
- Step 5 - Setting up Bi-directional sync (verifying that drag and double-click are in sync with the table & vice versa), Link - https://github.com/radhika757/Liquidity-Lock-Assignment/pull/5,
- Step 7 - Testing ( chart interaction test, unit test for add/move/delete) (Jest**, for UI use any) Link - https://github.com/radhika757/Liquidity-Lock-Assignment/pull/6


## Steps to Start the Project 

Follow these steps carefully. Don’t worry if you’re not a coder — just follow what’s written.

### 1. Download the Project
- Click the Code button on this repository and choose Download ZIP.
- Extract the ZIP somewhere you can find it (e.g., Desktop).

### 2. Open Terminal / Command Prompt
- Navigate to the folder where you extracted the project 
- cd Desktop/interactive-graph-app

### 3. Install Dependencies 
- Run the command - npm install

### 4. Start the project 
- npm run dev
- Navigate to http://localhost:3000

### 5. Log in and Use the App

1. Go to the **Login page**: [http://localhost:3000/login](http://localhost:3000/login)  
2. Enter the following credentials:  
   - **Email:** `radhika@gmail.com`  
   - **Password:** `radhika@123`  
3. After logging in, you will see the **Graph and Table**:  
   - **Graph:** Double-click to add a point, drag points to move them.  
   - **Table:** View all points, edit inline or with the pop-up, and delete points.  
4. Hover over a table row to highlight the corresponding point on the graph, and vice versa.  
5. Use the **Clear All** button to reset the graph.  
6. Export the table as CSV



