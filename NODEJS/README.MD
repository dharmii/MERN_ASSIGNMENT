# Student Results Management System

A simple Node.js web application for managing student records, storing them in a MongoDB database, and providing APIs for uploading student data, retrieving student details by ID, and filtering students by result status.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before running this application, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (Make sure MongoDB server is running)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/student-results-app.git
   cd student-results-app

Install dependencies:
npm install

Start the Node.js server:
node server.js

The server will be running at http://localhost:3000.
Use API endpoints to interact with the application.

Upload CSV File: Upload a CSV file containing student data and insert it into the database.
POST /upload

Get Student Details by ID: Retrieve student details by providing the student's ID.
GET /students/:id

Get Student Result by ID: Retrieve the result (passed or failed) of a student by providing the student's ID.
GET /students/:id/result

Filter Students by Result Status: Get a list of students filtered by result status (passed or failed) using query parameters.
GET /students?resultStatus=passed

The MongoDB database schema consists of a students collection with the following fields:

_id (ObjectId): Automatically generated unique identifier.
name (String): Student's name.
age (Number): Student's age.
mark1, mark2, mark3 (Number): Student's exam marks.

