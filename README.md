# Job Portal Application

A simplified job listing and application portal built with Next.js, Tailwind CSS, and MongoDB Atlas.

## Features

### Admin Panel
- View all job listings
- Create new job postings
- Edit existing job details
- Delete job listings
- Manage job applications

### Candidate Portal
- Browse available job positions
- View detailed job information
- Apply for jobs with a simple form
- Track application status

## Prerequisites

Before running this project, make sure you have:
- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB Atlas account
- Git

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/r1shiraj/helper4u-assignment.git
cd helper4u-assignment
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string.

### 4. Database Setup

Make sure your MongoDB Atlas:
- Has a new database created
- Has network access configured (IP whitelist) keep 0.0.0.0/0 for open use.
- Has a user with read/write permissions

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the candidate portal.
Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin).

### 6. Building for Production
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
helper4u-assignment/
├── app/
│   ├── admin/
│   │   └── page.js
│   ├── api/
│   │   └── jobs/
│   ├── page.js
│   └── layout.js
├── components/
│   ├── AdminPanel.js
│   └── CandidatePortal.js
├── public/
├── .env.local
└── package.json
```

## Tech Stack

- **Frontend:**
  - Next.js 14 (App Router)
  - Tailwind CSS
  - React
  - JavaScript

- **Backend:**
  - MongoDB Atlas
  - Next.js API Routes

## Available Routes

- `/` - Candidate portal for viewing and applying to jobs
- `/admin` - Admin panel for managing job listings
- `/api/jobs` - API endpoint for job operations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email your-email@example.com or open an issue in the GitHub repository.
