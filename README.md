# Vendor Module React POC

## Table of Contents

1. [Project Overview](#project-overview)
2. [Objectives](#objectives)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Installation and Setup](#installation-and-setup)
6. [Usage](#usage)
7. [Current Enhancements](#current-enhancements)
   1. [Directory Structure Updates](#directory-structure-updates)
   2. [Imports Modernization](#imports-modernization)
   3. [State Management and Effects](#state-management-and-effects)
   4. [Functional Component Exports](#functional-component-exports)
   5. [Navigation Updates](#navigation-updates)
   6. [Redux Updates](#redux-updates)
8. [Recent API and Major Changes](#recent-api-and-major-changes)
   1. [Provider Store Setup](#provider-store-setup)
   2. [Vendor Navigation Logic](#vendor-navigation-logic)
   3. [API Integration Updates](#api-integration-updates)
   4. [Immutable Object Handling in Class Components](#immutable-object-handling-in-class-components)
   5. [Unavailable APIs](#unavailable-apis)
9. [Issues](#issues)
10. [Future Enhancements](#future-enhancements)
11. [Contribution Guidelines](#contribution-guidelines)
12. [Acknowledgments](#acknowledgments)

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

## Current Enhancements

### Directory Structure Updates

We have adopted a modular directory structure to ensure better scalability and maintainability. The new structure is as follows:

```
├───public
│   └───assets
└───src
    ├───components
    │   ├───vendors          # Components specific to the Vendor Module
    │   └───vendorsEntry     # Entry point for Vendor Module
    ├───layouts
    │   └───form             # Reusable form layouts
    ├───pages                # Page-level components
    └───store                # State management setup
```

### Imports Modernization

To improve modularity and code readability, imports have been updated:

**Old Imports:**

```jsx
const Table = window["antd"].Table;
const Pagination = window["antd"].Pagination;
const Tooltip = window["antd"].Tooltip;
const Tag = window["antd"].Tag;
```

**New Imports:**

```jsx
import { Table } from "antd";
import { Pagination } from "antd";
import { Tooltip } from "antd";
import { Tag } from "antd";
```

This approach ensures that we are using ES module imports directly, making the codebase compatible with modern React practices.

### State Management and Effects

We transitioned from using `React.useState` and `React.useEffect` to direct imports of `useState` and `useEffect` for a cleaner syntax.

**Old State Management and `useEffect`:**

```jsx
const [loading, setLoading] = React.useState(true);
React.useEffect(() => {
  localStorage.setItem("isViewMode", JSON.stringify(true));
  sessionStorage.removeItem("vendorDetails");
}, []);
```

**New State Management and `useEffect`:**

```jsx
import { useState, useEffect } from "react";
const [loading, setLoading] = useState(true);

useEffect(() => {
  localStorage.setItem("isViewMode", JSON.stringify(true));
  sessionStorage.removeItem("vendorDetails");
}, []);
```

This change improves readability and aligns with modern React coding standards.

### Functional Component Exports

To streamline reusability and simplify module integration, all components now use default exports.

**Example:**

```jsx
const VendorComponent = () => {
  return <div>Vendor Module</div>;
};

export default VendorComponent;
```

This ensures that each component can be easily imported elsewhere in the project.

### Navigation Updates

Navigation logic was updated to leverage `react-router-dom`, replacing the traditional `window.location` approach.

**Old Navigation:**

```javascript
window.location = `/Vendor/VendorDetails?id=${record.Id}`;
```

**New Navigation (React Router DOM):**

```javascript
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
navigate(`/vendor/vendorDetails?id=${record.Id}`);
```

Using `react-router-dom` provides better control over routing and navigation, adhering to SPA principles.

### Redux Updates

State management has been modernized by migrating from traditional Redux to Redux Toolkit. This significantly reduces boilerplate code and enhances maintainability.

**Old Redux (Store and Usage):**

```javascript
// store.js
import { createStore } from "redux";

const initialState = { vendors: [] };

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VENDORS":
      return { ...state, vendors: action.payload };
    default:
      return state;
  }
};

const store = createStore(vendorReducer);
export default store;

// Component usage
import { useDispatch } from "react-redux";

const dispatch = useDispatch();
dispatch({ type: "SET_VENDORS", payload: vendors });
```

**New Redux (Toolkit):**

```javascript
// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const vendorSlice = createSlice({
  name: "vendors",
  initialState: { vendors: [] },
  reducers: {
    setVendors: (state, action) => {
      state.vendors = action.payload;
    },
  },
});

export const { setVendors } = vendorSlice.actions;
const store = configureStore({ reducer: { vendors: vendorSlice.reducer } });
export default store;

// Component usage
import { useDispatch } from "react-redux";
import { setVendors } from "./store";

const dispatch = useDispatch();
dispatch(setVendors(vendors));
```

This approach simplifies state management and encourages scalability.

## Recent API and Major Changes

### Provider Store Setup

The store has been moved to the entire application for consistent state access:

```jsx
<Provider store={store}>
  <Router>
    <Routes>
      <Route path="/" element={<Vendor />} />
      <Route path="/vendordetail" element={<VendorEntry />} />
    </Routes>
  </Router>
</Provider>
```

This enables `dispatch` to be used seamlessly within components:

```javascript
const handleRowClick = (record) => {
  sessionStorage.setItem("vendorType", record.Type);
  dispatch(saveVendorId(record.id));
  navigate(`/vendordetail?id=${record.id}`);
};
```

### Vendor Navigation Logic

Vendor entry now redirects to the home page if `vendorId` is not found:

```javascript
const navigate = useNavigate();
const vendorId = useSelector((state) => state.vendor.vendorId);

useEffect(() => {
  if (!vendorId) {
    navigate("/");
  }
}, [vendorId]);

return (
  <>
    {vendorId && <VendorApp />}
  </>
);
```

### API Integration Updates

All API URLs are derived from a centralized `constants.js` file:

```javascript
export const API_URL = import.meta.env.VITE_API_URL;
import { API_URL } from "../../constants";

fetch(`${API_URL}/Vendor/FinishVendor/${vendorId}`, {
  method: "POST",
});
```

Response handling and casing adjustments have been applied:

```javascript
fetch(`${API_URL}/Vendor/GetVendorById/${vendorId}`)
  .then((response) => response.json())
  .then((res) => {
    if (res.status === "success") {
      const data = JSON.parse(res.data.formData || res.data.jsonForm);
      // Previously used: .data.Data.JsonForm, .res.Status
      // Adjusted for casing updates in API response
      // Processing logic here
    }
  });
```

### Immutable Object Handling in Class Components

To resolve assignment issues, deep cloning is applied:

```javascript
const propData = JSON.parse(JSON.stringify(this.props.data));
this.state.formData = propData;
```

### Unavailable APIs

1. `./Stages/FetchStageByEntityId?entityId` – ReviewComponent
2. `${API_URL}/MasterData/GetAllDropdownValues/vcc` – ClauseModel

## Issues

### jQuery Version and Import Conflicts

There are compatibility issues with the version of jQuery being used, which causes conflicts in certain components.

### Datepicker and React-Select Import Problems

- **Datepicker:** Problems arise due to mismatched or missing jQuery versions required by the library.
- **React-Select (Dropdown Component):** Importing `Select` from `react-select` has caused issues, particularly with styling and event handling in the dropdown component. Further investigation is needed to identify the root cause and provide a resolution.

## Future Enhancements

- **Error Handling:** Enhance error boundaries for better user experience.
- **Dynamic Data Integration:** Fully integrate with live APIs.

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

## Acknowledgments

We thank the team for providing legacy `.cshtml` and `.jsx` files as references, which served as a foundation for this POC.

