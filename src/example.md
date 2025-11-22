@navbar Home [https://devonboard.dev] | Documentation [https://docs.devonboard.dev] | GitHub [https://github.com/devonboard]

@sidebar [Getting Started] {Quick Start, Installation, Configuration} | [Components] {Navigation, Content, Interactive} | [Examples] {Basic Usage, Advanced Features}

@section {
# DevOnBoard Documentation System

Welcome to DevOnBoard - the fastest way to create beautiful, interactive documentation. Build professional docs with simple markdown directives.

## What is DevOnBoard?

DevOnBoard is a documentation tool that extends markdown with custom components. Write your docs using simple `@directives` and get a fully styled, interactive documentation site instantly.
}

@section {
## Quick Start

Get started with DevOnBoard in under a minute.
}

@bash {
npm install -g devonboard
}

@bash {
devonboard init my-docs
}

@bash {
cd my-docs
devonboard serve
}

@success {Your documentation is now live at http://localhost:5173! ✅}

@section {
# Core Components

## Navigation Components

### Navbar

Create a fixed top navigation bar with links and search functionality.

### Usage
}

@code {
@navbar Home [https://home.com] | About [https://about.com] | Contact [https://contact.com]
}

@section {
### Features
- Fixed positioning at top of page
- Responsive mobile hamburger menu
- Built-in search bar with Ctrl+K shortcut
- Dark theme styling
- Supports external links
- Hover animations
}

@section {
### Sidebar

Build a collapsible sidebar with sections and sub-items for easy navigation.

### Usage
}

@code {
@sidebar [Section 1] {Item A, Item B} | [Section 2] {Item C, Item D, Item E}
}

@section {
### Features
- Fixed left positioning
- Collapsible sections with smooth animations
- Click to expand/collapse functionality
- Scrollable for long content
- Auto-hidden on mobile screens
- Arrow indicators for expandable sections
}

@section {
### Footer

Add a professional footer with links and copyright information.

### Usage
}

@code {
@footer Privacy Policy, Terms of Service, Contact Us, About
}

@section {
### Features
- Responsive flexbox layout
- Multiple link support separated by bullets
- Automatic copyright year
- Dark theme styling
- Hover effects on links
}

@section {
# Content Components

## Section

Wrap markdown content in styled sections. Supports full markdown syntax including headings, lists, links, code blocks, and more.

### Usage (inline)
}

@code {
@section { # Title and content here }
}

@section {
### Usage (multi-line)
}

@code {
@section {
# Main Heading
Your markdown content here with **bold**, *italic*, and [links](url).

## Subheading
- List item 1
- List item 2
}
}

@section {
### Features
- Full markdown support
- Styled headings (h1-h6)
- Prose typography with proper spacing
- Code syntax highlighting
- Centered max-width layout
- Dark theme optimized
}

@section {
## Images

Display images with responsive styling and hover effects.

### Usage
}

@code {
@img https://example.com/image.jpg
}

@section {
### Features
- Responsive sizing (max-width)
- Lazy loading for performance
- Rounded corners with border
- Hover shadow effect
- Centered alignment
}

@img https://wallup.net/wp-content/uploads/2019/09/08/455469-anime-girl-beautiful-cute-beauty-happy-lovely-love-girls.jpg

@section {
## Card

Create styled card components with headers and descriptions.

### Usage
}

@code {
@card Feature Title | Detailed description of the feature goes here
}

@section {
### Features
- Clean border and shadow
- Two-part layout (header | description)
- Hover effects
- Centered alignment
- Dark theme styling
}

@section {
# Code Components

## Code Blocks

Display syntax-highlighted code with copy functionality.

### Usage (inline)
}

@code {
@code { const x = 10; }
}

@section {
### Usage (multi-line)
}

@code {
@code {
function hello() {
  console.log("Hello World");
  return true;
}
}
}

@section {
### Features
- Syntax highlighting
- Copy to clipboard button
- Dark terminal theme
- Automatic indentation
- Multi-line support
- "Copied!" feedback message
}

@section {
## Bash Commands

Display terminal commands with copy functionality.

### Usage (inline)
}

@code {
@bash { npm install package }
}

@section {
### Usage (multi-line)
}

@code {
@bash {
git clone repo.git
cd repo
npm install
}
}

@bash {
npm run dev
npm run build
npm run preview
}

@section {
### Features
- Terminal-style formatting
- Copy button with icon
- Dark theme
- "bash" label indicator
- Temporary "Copied!" message
- Supports multiple commands
}

@section {
# Alert Components

## Info Alert

Display informational messages with blue styling.

### Usage
}

@code {
@info {This is an important informational message}
}

@info {The server will restart automatically after configuration changes}

@section {
## Success Alert

Show success messages with green styling.

### Usage
}

@code {
@success {Operation completed successfully!}
}

@success {Your changes have been saved! ✅}

@section {
## Warning Alert

Display warnings with amber/yellow styling.

### Usage
}

@code {
@warning {Please backup your data before proceeding}
}

@warning {This action cannot be undone. Proceed with caution!}

@section {
## Error Alert

Show error messages with red styling.

### Usage
}

@code {
@alert {An error occurred during the operation}
}

@alert {Failed to connect to the database. Check your connection settings.}

@section {
### Alert Features
- Color-coded by type (blue, green, amber, red)
- Centered max-width layout
- Rounded corners with borders
- Medium font weight
- Responsive padding
}

@section {
# Interactive Components

## API Routes

Display interactive API endpoint documentation with expandable details.

### Usage (GET request)
}

@code {
@route GET /api/users | {"users": [], "total": 0}
}

@route GET /api/users | {"users": [], "total": 0}

@section {
### Usage (POST request with parameters)
}

@code {
@route POST /api/login | email : user@example.com, password : secret123
}

@route POST /api/login | email : user@example.com, password : secret123

@section {
### Features
- Color-coded by HTTP method (GET, POST, PUT, DELETE)
- Expandable/collapsible content
- Click header to toggle
- Input fields for POST/PUT/DELETE
- JSON response viewer for GET
- Smooth animations
- Hover effects
}

@section {
### Supported Methods
- **GET** - Green badge, shows response preview
- **POST** - Blue badge, shows parameter inputs
- **PUT** - Amber badge, shows parameter inputs
- **DELETE** - Red badge, shows parameter inputs
}

@section {
## Assessments

Create interactive quizzes and challenges with automatic validation.

### Usage
}

@code {
@assessment [Quiz Title] {Description here} <input-id> (validation function)
}

@section {
### Example
}

@code {
@assessment [Docker Command] {Enter the correct docker pull command} <docker-q> (return textfield === "docker pull")
}

@assessment [Docker Command] {Enter the correct docker pull command} <docker-q> (return textfield === "docker pull")

@section {
### Features
- Custom title and description
- Text input field
- Submit button
- JavaScript validation function
- Success/Wrong feedback with colors
- Fade-in animations
- Dark theme styling
}

@section {
### Validation Function
- Receives `textfield` parameter (user input)
- Must return `true` for correct, `false` for wrong
- Can use any JavaScript logic
- Example: `return textfield.includes("test")`
}

@section {
## Button

Create styled action buttons.

### Usage
}

@code {
@button Click Me
}

@section {
### Features
- Centered alignment
- Border and padding
- Hover effects
- Focus ring for accessibility
- Smooth transitions
}

@section {
# Advanced Examples

## Complete Documentation Page

Here's a full example combining multiple components:
}

@code {
@navbar Docs [/] | API [/api] | GitHub [https://github.com]

@sidebar [Guide] {Intro, Setup} | [API] {Auth, Endpoints}

@section {
# Getting Started
Welcome to our documentation!
}

@bash {
npm install my-package
}

@info {Installation takes about 30 seconds}

@section {
## Usage Example
}

@code {
import pkg from 'my-package';
pkg.init();
}

@success {You're all set!}

@footer Docs, Support, GitHub
}

@section {
## API Documentation Example
}

@code {
@section {
# User API
Manage user accounts
}

@route GET /api/users | {"users": []}

@route POST /api/users | name : John Doe, email : john@example.com

@info {All endpoints require authentication}
}

@section {
## Interactive Learning Example
}

@code {
@section {
# Linux Commands Quiz
}

@assessment [List Files] {What command lists all files?} <q1> (return textfield === "ls")

@assessment [Change Directory] {Command to change directory?} <q2> (return textfield === "cd")

@success {Complete all assessments to proceed!}
}

@section {
# Tips and Best Practices

## Structuring Your Docs
- Start with a navbar for main navigation
- Add a sidebar for section-based navigation
- Use sections to organize content logically
- End with a footer for additional links

## Content Organization
- Use clear, descriptive headings (h1, h2, h3)
- Break long content into multiple sections
- Add code examples after explanations
- Use alerts to highlight important information

## Interactive Elements
- Place assessments after teaching content
- Use route components for API documentation
- Add bash commands for CLI tools
- Include real examples with copy buttons

## Visual Design
- Images should be relevant and optimized
- Use cards for feature highlights
- Maintain consistent spacing
- Leverage the dark theme aesthetic
}

@section {
# Configuration

## Title Setting

Set your documentation title using the `@title` directive (appears in browser tab):
}

@code {
@title My Awesome Documentation
}

@section {
## Multi-line Support

All components support both inline and multi-line syntax:
}

@code {
Single line: @code { one liner }

Multi-line:
@code {
  line 1
  line 2
  line 3
}
}

@section {
## Nested Braces

Components handle nested braces correctly:
}

@code {
@code { @navbar Home [url] }
}

@section {
# Publishing

## Build for Production
}

@bash {
devonboard build
}

@section {
## Deploy

The build command generates static HTML that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service
}

@info {Generated files are in the ./dist directory}

@section {
# Troubleshooting

## Common Issues

### Navbar not showing
- Make sure navbar comes before other content
- Check URL format: `Label [https://url.com]`

### Sidebar not expanding
- Verify syntax: `[Header] {item1, item2}`
- Use commas to separate items

### Code not displaying
- Check brace matching: `{ }` must be balanced
- For literal braces in code, use multi-line format

### Section markdown not rendering
- Ensure proper markdown syntax inside braces
- Check for unmatched braces in content
}

@success {You now know everything about DevOnBoard! Start building amazing docs! 🚀}

@footer Documentation, GitHub, Support, Contact Us
