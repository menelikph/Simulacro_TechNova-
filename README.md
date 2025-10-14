# 🚀 TechNova - Product Catalog Management System

## 📋 General Overview

TechNova is an internal web system developed with **Next.js (React/TypeScript)** for optimized product catalog management and access control. The goal is to eliminate data duplication (**unique SKU**) and centralize management through **role-based authentication**.

---

## 💻 Prerequisites

For local execution, the following are required:

-   **Node.js**: Version 18.x or higher
-   **npm** or **Yarn**: Package manager
-   **MongoDB**: Running server instance
-   **`.env.local`**: Must be configured in the project root with the `MONGODB_URI` variable

---

## ⚙️ Setup and Execution Steps

1.  **Clone repository**
    ```bash
    git clone [REPLACE_WITH_YOUR_REPO_URL]
    cd technova-catalog
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will be available at: `http://localhost:3000`

---

## ✨ Implemented Key Features

* **Authentication (Local):** Functional login and basic session persistence.
* **Roles (RBAC):** Conditional access control (`isAdmin` in `AuthContext`) is implemented to display management buttons only to the administrator.
* **CRUD (Skeleton):** The Dashboard UI lists products and has the structural components (Cards, Buttons) ready for CRUD operations (Create, List, Edit, Delete).
* **Strict Typing:** Use of **TypeScript** interfaces (`Product.ts`, `User.ts`) throughout the project.
* **Backend API (Next.js):** API routes for CRUD operations are configured at `/api/products` and `/api/products/[id]`, including **SKU uniqueness validation** with Mongoose.

---

## 🖼️ Main Flow (To be documented with Screenshots/GIFs)

1.  **Login:** Access with default credentials.
    * **Admin:** `admin` / `123` → Sees list and all action buttons.
    * **User:** `user` / `123` → Only sees the list and the "Sign Out" button.
2.  **Dashboard:** Displays the product list and the edit/delete actions available according to the role.

## 🔑 Test Credentials

| Username | Password | Role |
| :--- | :--- | :--- |
| `admin` | `123` | Administrator |
| `user` | `123` | Standard |

---

## 👤 Coder Information (Deliverable 5)

* **Coder Name:** Menelik Puerta Herrera
* **Clan:** Gosling
* **Email:** menelikdev@gmail.com
* **ID Document:** CC 1001459190
