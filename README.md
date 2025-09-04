# Tech stack - Building an app in React, using Mui (Material UI, not mandatory), for charting (D3, mandatory)
Build a graph on top (add additional features if you want and have time), a D3 graph, normal X and Y axis, you can click on this graph to add a point on the graph, and click on an existing point to drag it anywhere in the graph, double-click to add a point. 
We will have a table below the graph, which will list down all the points in the graph, point identifier (name), X and Y co-rdinates. IMP - It should be Bi-directional (When something changes in the graph, the table should be updated as well, and vice versa)
If we are hovering over the table, the point is highlighted and vice versa. 
Ability to edit in the table. (Two ways to edit, a pop-up from the edit button and inline editing in the table, graph - when we drag it) Q-(Will the pop-up have a submit button?? NOP), 
No functional req -
Modular code, proper interface, reusable code, focus on code archi, 
A short video of the features/hosted, A proper ReadMe file, ReadMe - really clean way to run this code (assume users are dumb),  
Login (user 3rd party tool), add login page. 
No Backend.

# Additional section for highlighting enhancements. 

# Step 1 - Setup (React, TypeScript, D3, Redux, MUI for table, firebase, tailwind).
# Step 2 - Auth (Creating firebase, implementing useAuth(), routes /login and /dashboard),
# Step 3 - Chart MVP (rendering points, dragging points, hovering effects {tooltip showing names of points})
# Step 4 - Table MVP  ( Render table using MUI, Inline cell edit, Edit with popup, delete row.)
# Step 5 - Setting up states  (verifying that drag and double-click are in sync with the table & vice versa).
# Step 6 - Keyboard activities, validations, hover effects (UI enhancements),
# Step 7 - Testing ( chart interaction test, unit test for add/move/delete) (Jest**, for UI use any).
$ Step 8 - Vercel. 
