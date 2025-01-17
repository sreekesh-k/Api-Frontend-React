# Vendor Module React POC

## Project Overview
This Proof of Concept (POC) involves modernizing a legacy ASP.NET Core MVC application with React components embedded in `.cshtml` files. Due to the discontinuation of React components rendering within `.cshtml`, the objective is to refactor and recreate the **Vendor Module** as a standalone React application, adhering to modern React.js development practices.

## Objectives
1. Decouple the legacy application’s frontend by implementing a new React.js application.
2. Recreate the functionality of the existing "Vendor Module" using the provided `.cshtml` and `.jsx` files as references.
3. Demonstrate the functionality with static data as part of the POC.
4. Prepare the application to integrate with the upcoming ASP.NET Core Web API once provided.

## Features
- **Standalone React Frontend:** Modular and component-based architecture.
- **Static Data Integration:** Mimics the original module’s functionality using placeholder data.
- **Modern React Practices:** Functional components, hooks (e.g., `useState`, `useEffect`), and component-based styling.
- **Responsive Design:** Ensures usability across various device sizes.

## Tech Stack
- **Frontend Framework:** React.js
- **Styling:** CSS Modules/Tailwind CSS (based on project decisions)
- **State Management:** React Context API (optional for shared state within the module)
- **Build Tool:** Vite/CRA (Create React App) for bundling and development

# Vendor Module React POC

## Project Overview
This Proof of Concept (POC) involves modernizing a legacy ASP.NET Core MVC application with React components embedded in `.cshtml` files. Due to the discontinuation of React components rendering within `.cshtml`, the objective is to refactor and recreate the **Vendor Module** as a standalone React application, adhering to modern React.js development practices.

## Objectives
1. Decouple the legacy application’s frontend by implementing a new React.js application.
2. Recreate the functionality of the existing "Vendor Module" using the provided `.cshtml` and `.jsx` files as references.
3. Demonstrate the functionality with static data as part of the POC.
4. Prepare the application to integrate with the upcoming ASP.NET Core Web API once provided.

## Features
- **Standalone React Frontend:** Modular and component-based architecture.
- **Static Data Integration:** Mimics the original module’s functionality using placeholder data.
- **Modern React Practices:** Functional components, hooks (e.g., `useState`, `useEffect`), and component-based styling.
- **Responsive Design:** Ensures usability across various device sizes.

## Tech Stack
- **Frontend Framework:** React.js
- **Styling:** CSS Modules/AntDesigns
- **State Management:** React-Redux Redux ToolKit
- **Build Tool:** Vite


## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/sreekesh-k/Api-Frontend-React.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Api-Frontend-React
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage
- Navigate to `http://localhost:5173` to view the application.
- The **Vendor Module** showcases the recreated functionality based on the provided `.cshtml` and `.jsx` files.
- Data is currently static and hardcoded for demonstration purposes.

## Future Enhancements
- **API Integration:** Replace static data with API calls once the ASP.NET Core Web API is provided.
- **Error Handling:** Implement error boundaries and API request error handling.

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your fork and create a pull request.

### Acknowledgments
We thank the team for providing legacy `.cshtml` and `.jsx` files as references, which served as a foundation for this POC.
