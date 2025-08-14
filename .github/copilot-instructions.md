<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# General Instructions
This is a minimalist pure HTML/CSS/JavaScript web app project using webpack and npm. No frameworks are used. Keep code modular and simple.

When asked for implementing changes, limit yourself to the changes requested and do not suggest additional features or modifications unless explicitly asked. Focus on the specific task at hand and ensure that the code remains clean and maintainable.

Each change must be limited so the user keeps the control and understanding of the codebase. Avoid suggesting large refactors or complex solutions. This will also avoid uncontrolled ripple effects. 

# CSS
Always use grid for layout. When beginning the project, check if you have the necessary information from the user to already define the grid structure. If not, ask for the necessary details.

Use CSS variables for colors and common styles to ensure consistency and ease of updates.

# Webpack
Given webpack usage, when you use CSS ensure the CSS is loaded in the javascript entry point file 

Similarly, ensure javascript files are imported correctly in the main entry point file.

# package.json
In package.json never add this line "type": "commonjs",
