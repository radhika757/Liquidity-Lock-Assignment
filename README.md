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

## Additional section for highlighting enhancements.
- Ability to delete a particular point.
- Deployed the project - ([link](https://liquidity-lock-assignment.vercel.app/login)).
- Option to Reset Graph with Clear All Button.
- Option to Export the Data Table in CSV format
- Logout option. 


## Steps followed & commit Ids
- Step 1 - Project Setup (React, TypeScript, D3, Redux, MUI for table, Firebase, Tailwind setup).
- Step 2 - Basic App Layout & Auth (Creating Firebase, implementing useAuth(), routes /login and /dashboard),
- Step 3 - Chart MVP (rendering points, dragging points, hovering effects {tooltip showing names of points})
- Step 4 - Table MVP ( Render table using MUI, Inline cell edit, Edit with popup, delete row.)
- Step 5 - Setting up Bi-directional sync (verifying that drag and double-click are in sync with the table & vice versa).
- Step 6 - Keyboard activities, validations, hover effects (UI enhancements),
- Step 7 - Testing ( chart interaction test, unit test for add/move/delete) (Jest**, for UI use any).
- Step 8 - Vercel.

## Steps to Start the Project (For Non-Tech Users)

Follow these steps carefully. Don’t worry if you’re not a coder — just follow what’s written.

### 1. Download the Project
- Click the Code button on this repository and choose Download ZIP.
- Extract the ZIP somewhere you can find it (e.g., Desktop).

### 2. Open Terminal / Command Prompt
- Navigate to folder where you extracted the project 
- cd Desktop/interactive-graph-app

### 3. Install Dependencies 
- Run the command - npm install

### 4. Start the project 
- npm run dev
- Navigate to http://localhost:3000

### 5. Login and Use the App

1. Go to the **Login page**: [http://localhost:3000/login](http://localhost:3000/login)  
2. Enter the following credentials:  
   - **Email:** `radhika@gmail.com`  
   - **Password:** `radhika@123`  
3. After logging in, you will see the **Graph and Table**:  
   - **Graph:** Double-click to add a point, drag points to move them.  
   - **Table:** View all points, edit inline or with the pop-up, delete points.  
4. Hover over a table row to highlight the corresponding point on the graph, and vice versa.  
5. Use the **Clear All** button to reset the graph.  
6. Export the table as CSV



