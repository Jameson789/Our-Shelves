# Our Shelves

A reading tracker web application that allows users to search for books using the **Open Library API**, save them to their personal digital shelf, and manage their book collection.

## Team Members
- Alston
- Danny
- Jameson
- Johnathan

---

## Project Description

**Our Shelves** lets users:
- Search for books by title using the [Open Library API](https://openlibrary.org/developers/api).
- Add books to their personal shelf stored in a **MySQL** database.
- View their saved books.
- Delete books from their library.
- Interact with a **React frontend** and **Express backend**, connected via REST API.

### Future Feature Goals
- Add personal notes to books.
- Track bookmarks / reading progress.
- Organize books into multiple shelves.
- Share shelves and notes with friends.
- Support light/dark theme customization.

---

## Tech Stack

| Layer             | Technology                     |
|--------------------|-----------------------------|
| Frontend           | React (Vite), React Router   |
| Backend            | Node.js, Express.js          |
| Database           | MySQL (`mysql2/promise`)     |
| External API       | Open Library API            |
| Deployment         | Ubuntu Server + PM2         |

---

## Docker + VM Setup

### 1. Install Docker on Ubuntu VM  
Follow the official DigitalOcean guide to install Docker:  
🔗 [How to Install and Use Docker on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)

---

### 2. Clone the Repository  
git clone https://github.com/your-username/our-shelves.git  
```
cd our-shelves
```
---

### 3: Set Backend URL 
Run: 
``` 
nano docker-compose.yml 
``` 
Scroll down until you see the line 
```
- VITE_API_URL:http://localhost:3000
``` 
Change that line to: 
```
- VITE_API_URL:http://<your vm ip>:3000
```
Then press Control + x, then y, and then enter. This is how you save the file with nano.

These steps tells your frontend where to find your backend, and this is different depending on whether the project is running in docker locally or in a VM.

### 4. Build and Start Containers  
Use Docker Compose to build and run the containers in detached mode:  
```
docker compose up -d --build
```

---

### 5. Manage Containers  
Use the following commands to manage your containers easily:  
```
# Stop all running containers (without removing them)  
docker compose stop  

# Restart previously stopped containers  
docker compose start  

# Stop and remove all containers, networks, and volumes  
docker compose down
```
---

### 6. View Logs and Debug Errors  
If the containers fail to start or an error occurs, use these commands to inspect logs:  

#### View logs for all containers  
```
docker compose logs  
```
#### View logs for a specific service (e.g., backend, frontend, or db)  
```
docker compose logs backend  
docker compose logs frontend  
docker compose logs db
```
#### Follow logs in real time (like "tail -f")  
```
docker compose logs -f
```
These logs often show missing environment variables, database connection errors, or other startup issues.

---

### 7. Additional Docker Resources  
For more useful Docker commands and shortcuts, check out the official cheat sheet:  
📄 [Docker CLI Cheat Sheet (PDF)](https://docs.docker.com/get-started/docker_cheatsheet.pdf)



# Local Setup
##  Prerequisites

Make sure the following are installed:

- [Node.js v18+](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- [PM2](https://pm2.keymetrics.io/) (for deployment)

---

## Environment Variables

### Backend `.env`
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=StrongPassword123!
DB_NAME=ourshelves
PORT=3000
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:3000
```

> For production, replace `localhost` with your server IP or domain name.

---

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/our-shelves.git
cd our-shelves
```

### 2. Install Dependencies
```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Set Up `.env` Files
- Create `.env` inside both `backend/` and `frontend/` directories.
- Copy and paste the environment variable structure shown above.

### 4. Set Up MySQL Database
Login to MySQL:
```bash
mysql -u root -p
```
Then run:
```sql
CREATE DATABASE ourshelves;
USE ourshelves;
```
(You can also run your `schema.sql` file here if you’ve set up tables.)

---

## Running the Application (Local)

### Run the Backend:
```bash
cd backend
npm run dev
```
Server will run on:
```
http://localhost:3000
```

### Run the Frontend:
```bash
cd frontend
npm run dev
```
Frontend will run on:
```
http://localhost:5173
```

---

# VM Instructions(Ubuntu + PM2 NO DOCKER)

### 1. Install PM2 Globally (if not installed)
```bash
npm install -g pm2
```

### 2. Start Backend and Frontend with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
```

### 3. Check Status and Logs
```bash
pm2 status
pm2 logs backend
pm2 logs frontend
```

### 4. Auto-start PM2 on Server Reboot
```bash
pm2 startup
```
Follow the instructions output by the above command.

---

## API Endpoints

| Method | Endpoint                        | Description                         |
|--------|-----------------------------------|-------------------------------------|
| GET    | `/books`                          | Fetch all saved books              |
| POST   | `/books`                          | Add a new book                     |
| DELETE | `/books/:id`                      | Delete a book by ID                |
| GET    | `/books/search/:bookName`         | Search books via Open Library API  |

---

## Useful Commands

```bash
# Restart all processes
pm2 restart all

# View logs
pm2 logs

# Clear old logs
pm2 flush

# Stop processes
pm2 stop all

# Delete processes
pm2 delete all
```

---

## Troubleshooting Tips
- Ensure `.env` files are correctly configured in both `frontend` and `backend`.
- Confirm MySQL credentials match your `.env`.
- Use `pm2 flush` to clear old logs when fixing errors.
- Check firewall settings if deploying to a remote server (allow ports 3000 and 5173).

---

## License
This project is for educational use as part of a student project at Green River College.
