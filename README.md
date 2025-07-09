# KBnB

KBnB is a full-stack Airbnb clone built with a modern JavaScript stack. It allows users to sign up, list properties, search for stays, and book accommodations.

## Features

- User authentication (register, login, logout)
- List your own properties
- Browse and search available listings
- Book stays with date selection
- Responsive design for mobile and desktop
- Image uploads for listings

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, MongoDB, JWT
- **Deployment:** Netlify (frontend), Render (backend)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/ShwetaKhera/KBnB.git
   cd KBnB
   ```

2. **Install backend dependencies:**
   ```sh
   cd api
   npm install
   ```

3. **Install frontend dependencies:**
   ```sh
   cd ../client
   npm install
   ```

### Environment Variables

#### Backend (`api/.env`)

Create a `.env` file in the `api` folder with the following:

```
MONGODB_CONNECTION_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

#### Frontend (`client/.env`)

Create a `.env` file in the `client` folder with the following:

```
VITE_API_URL=http://localhost:4000
```

### Running Locally

**Start the backend:**
```sh
cd api
npm start
```

**Start the frontend:**
```sh
cd ../client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.