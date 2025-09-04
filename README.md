# Interactive Graph App
## Tech Stack 
React (UI framework)
D3.js (charting, mandatory)
Material UI (optional, for styling)

## Features
Graph (D3) -
Standard X and Y axes.
Add a point by double-clicking.
Drag existing points to update coordinates.
Click to add a point.

Table (below the graph) -
Lists all points with ID, X, and Y coordinates.
Inline editing of table values.
Edit via pop-up (no submit button required).
Bi-directional sync
Changes in the graph update the table.
Changes in the table update the graph.

Hover interactions -
Hovering over a table row highlights the point on the graph (and vice versa).

## Requirements
Modular, reusable, and clean code.
Clear architecture with proper interfaces.
Short demo video or hosted link.
Clean README with easy setup instructions.
Login page (using a 3rd party tool).

## Additional section for highlighting enhancements. 
1. Ability to delete a particular point.
2. Deployed the project - (add link).
3. Option to Reset Graph with Clear All Button.
4. Uno/Redo - Track changes to points so the user can undo the last action.
5. 

# Steps followed & commit Ids
## Step 1 - Project Setup (React, TypeScript, D3, Redux, MUI for table, Firebase, Tailwind setup).
## Step 2 - Basic App Layout & Auth (Creating Firebase, implementing useAuth(), routes /login and /dashboard),
## Step 3 - Chart MVP (rendering points, dragging points, hovering effects {tooltip showing names of points})
## Step 4 - Table MVP  ( Render table using MUI, Inline cell edit, Edit with popup, delete row.)
## Step 5 - Setting up Bi-directional sync  (verifying that drag and double-click are in sync with the table & vice versa).
## Step 6 - Keyboard activities, validations, hover effects (UI enhancements),
## Step 7 - Testing ( chart interaction test, unit test for add/move/delete) (Jest**, for UI use any).
## Step 8 - Vercel. 
