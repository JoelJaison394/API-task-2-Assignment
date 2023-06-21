# Event API

This is a RESTful API that allows you to manage events. It provides various endpoints for creating, retrieving, updating, and deleting events.

## Table of Contents

- [Endpoints](#endpoints)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Sample Data](#sample-data)

## Endpoints

### Get Event by ID

Returns an event by its unique ID.

- **URL:** `/api/v3/app/events/:id`
- **Method:** GET
- **URL Parameters:**
  - `id`: The unique ID of the event
- **Success Response:**
  - **Code:** 200
  - **Content:** JSON representation of the event
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Event not found" }`

### Get Latest Events with Pagination

Returns the latest events with pagination support.

- **URL:** `/api/v3/app/events`
- **Method:** GET
- **Query Parameters:**
  - `type`: (optional) Type of events to fetch (e.g., `latest`)
  - `limit`: (optional) Maximum number of events per page (default: 5)
  - `page`: (optional) Page number for pagination (default: 1)
- **Success Response:**
  - **Code:** 200
  - **Content:** JSON array of events
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "Internal Server Error" }`

### Create an Event

Creates a new event.

- **URL:** `/api/v3/app/events`
- **Method:** POST
- **Payload:**
  - `name`: Name of the event
  - `tagline`: A proper tag-line for the event
  - `schedule`: Date and time of the event
  - `description`: Description of the event
  - `moderator`: ID of the event moderator
  - `category`: Category of the event
  - `sub_category`: Sub-category of the event
  - `rigor_rank`: Integer value representing the rigor rank of the event
  - `image`: Image file (multipart/form-data)
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "eventId": "event-id" }`
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "error": "Internal Server Error" }`

### Update an Event

Updates an existing event.

- **URL:** `/api/v3/app/events/:id`
- **Method:** PUT
- **URL Parameters:**
  - `id`: The unique ID of the event
- **Payload:** Same as the payload for creating an event
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Event updated successfully" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Event not found" }`

### Delete an Event

Deletes an event based on its unique ID.

- **URL:** `/api/v3/app/events/:id`
- **Method:** DELETE
- **URL Parameters:**
  - `id`: The unique ID of the event
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Event deleted successfully" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "error": "Event not found" }`

## Local Development

To run the API on your local device, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/repo-name.git`
2. Navigate to the project directory: `cd repo-name`
3. Install the dependencies: `npm install`
4. Start the server: `npm start`
5. The API will be accessible at `http://localhost:3000`

## Environment Variables

The following environment variables are required to run the application:

- `PORT`: Port number for the API server (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `CLOUDINARY_CLOUD_NAME`: Cloudinary environment variable for storing cloud name
 - `CLOUDINARY_API_KEY`: Cloudinary environment variable for storing API key
 - `CLOUDINARY_API_SECRET`: Cloudinary environment variable for storing API secret key

## Testing

To run the tests for the API, use the following command:

```bash
npm test

