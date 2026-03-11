# 🌍 Experio - Travel Experience Sharing Platform

**Experio** is a robust MERN stack application designed for travelers to discover, share, and manage unique local adventures. Built as part of the **Lynkerr Technical Challenge**, this platform emphasizes performance, clean UI, and seamless user interaction.

---

## 🚀 Project Overview

Experio serves as a community-driven travel hub. Users can browse a curated feed of global experiences, search for specific destinations, and contribute by sharing their own travel stories. The application handles secure user sessions and provides a full CRUD (Create, Read, Update, Delete) interface for personal listings.

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router, React Hot Toast.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB with Mongoose ODM.
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt.js.
- **API Client:** Axios.

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance

### 1. Clone the Repository

```bash
git clone https://github.com/ShanukaAlahakoon/lynkerr-project.git
cd lynkerr-project
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client` folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the client:

```bash
npm run dev
```

### 4. Access the App

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:5000 |

---

## ✨ Features Implemented

| Feature                   | Description                                                     |
| ------------------------- | --------------------------------------------------------------- |
| 🔐 **User Auth**          | Secure registration and login with persistent sessions          |
| 📰 **Experience Feed**    | Responsive grid displaying all travel listings                  |
| 🔍 **Search & Filter**    | Real-time search by title or location                           |
| 📋 **Personal Dashboard** | "My Listings" section to manage user-specific content           |
| ✏️ **Full CRUD**          | Create, View, Edit, and Delete travel experiences               |
| 📱 **Mobile Responsive**  | Optimized for Mobile, Tablet, and Desktop views                 |
| 🎨 **Advanced UI**        | Dropdown ComboBox, Image Preview sliders, Glassmorphism effects |

---

## 🏗️ Architecture & Key Decisions

### Why the MERN Stack?

- Already have experience building projects with this stack
- Familiar technologies helped develop faster
- Focused on implementing required features effectively

### Authentication Flow

- Uses **JWT (JSON Web Tokens)**
- User logs in → server verifies credentials → returns token
- Token stored in browser
- Token sent in `Authorization` header for protected requests (e.g., creating a listing)

### Data Storage

Travel listings stored in **MongoDB** as documents with:

- `title`, `location`, `description`
- `imageUrl`
- Optional `price`
- `createdBy` (user ID)

### Future Improvement

💡 **Image Upload Feature** — Currently users provide an image URL. With more time, I would implement direct photo uploads to improve usability and make listings more realistic.

---

## 🧠 Scaling to 10,000+ Listings

If this platform had 10,000 travel listings, what changes would you make to improve performance and user experience?

### 📄 Pagination & Loading

- Add pagination or infinite scrolling
- Load small batches instead of fetching all data at once
- Reduces load time and server requests

### 🔍 Search & Filtering

- Filter by location, price, or experience type
- Help users quickly find relevant listings

### 🗄️ Database Optimization

- Add indexing on `location`, `createdAt`, and `title` fields
- Speed up frequently queried data

### ⚡ API & Caching

- Cache popular listings and frequently accessed data
- Reduce repeated database queries

### 🖼️ Frontend Performance

- Lazy load images
- Improve page performance with many listings
