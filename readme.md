
# Project Title

Welcome to Project Univercity Courses

## API Reference

#### Create a new couses api

```http
  POST /api/course
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `types` | **Required**. Your API key |

#### Get all courses api

```http
  GET /api/courses
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`      | `string` | **Optional**. `for searching`  |
| `maxPrice`      | `string` | **Optional**. `for price filtering` |
| `minPirce`      | `string` | **Optional**. `for price filtering` |
| `tags`      | `string` | **Optional**. `for filtering`|
| `startDate`      | `string` | **Optional**. `for filtering`  |
| `endDate`      | `string` | **Optional**. `for filtering` |
| `durationInWeeks`      | `string` | **Optional**. `for filtering`|
| `language`      | `string` | **Optional**. `for filtering`|
| `provider`      | `string` | **Optional**. `for filtering`|
| `level`      | `string` | **Optional**. `for filtering` |
| `page`      | `string` | **Optional**. `for filtering` |
| `limit`      | `string` | **Optional**. `for filtering` |
| `sortBy`      | `string` | **Optional**. `for filtering` |
| `sortOrder`      | `asc` `desc` | **Optional**. `for filtering`|
| `fields`      | `string` | **Optional**. `for filtering` |



#### Update specific course by courseId api

```http
  PUT /api/courses/${coursesId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `ObjectId` | **Required**. courseId of course to update specific course|





#### get specific course with reviews by courseId api

```http
  GET /api/courses/${courseId}/reviews
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `number` | **Required**. courseId of course to delete specific course|



#### get best course depend on course average rating

```http
  GET /api/courses/best
```

| Parameter | Type     | 
| :-------- | :------- | 
| `api_key`| `types` | 


#### create category

```http
  POST /api/categories
```

| Parameter | Type     |
| :-------- | :------- |
| `api_key`| `types` | 


#### Get all categories

```http
  GET /api/categories
```

| Parameter | Type     |
| :-------- | :------- |
| `api_key`| `types` |


#### create reviews

```http
  POST /api/reviews
```

| Parameter | Type     |
| :-------- | :------- |
| `api_key`| `types` | 



## Features

- Create category
- Get all category
- Create course
- Get all course with searching & filtering features
- Get single course with reviews 
- Dynamecally update single course with premitive & non-premitive
- Create reviews
- Data validation with zod
## 🛠 Skills

- Express
- MongoDB
- Mongoose
- Cors
- Zod
- Dotenv
- Typescript
## Run Locally

Clone the project

```bash
  git clone https://github.com/Porgramming-Hero-web-course/l2b2a3-course-review-githubrana2023.git
```

Go to the project directory

```bash
  cd univercity-courses
```

Install dependencies

```bash
  npm install or yarn --init
```

Make an .env file

```bash
  .env
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
PORT
```
```
MONGODB_URL
```

Start the server

```bash
  npm run dev or yarn run dev
```
