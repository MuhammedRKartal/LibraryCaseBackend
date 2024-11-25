# Library Case

## Requirements

- Node: v20.18.0

- postgresql: Latest

## Database and Env Config

- Example Env File for the database config.

- `PORT: 4000`, you can decide your PORT in .env file, otherwise it will run in 5000.

- `DATABASE_URL="postgresql://<db_user_name>:<db_user_password>@<database_host>:<database_port>/<database_name>?schema=<schame_name>"`

- Run the Database.sql file.

## How to start the project

1. Set up the .env file as mentioned above.
2. Run the Database.sql file to create your database.
3. Run the command `npm install`
4. Run the command `npm run dev`

## API Usage

#### Return all the members

```http
  GET /users
```

#### Return a specific member

```http
  POST /users/${id}
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. Id of the specific user. |

#### Return all the books

```http
  GET /books
```

#### Return a specific book

```http
  GET /books/${id}
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. Id of the specific book. |

#### Return the book that you own to library

```http
  POST /users/${member_id}/return/${book_id}
```

| Body JSON Element | Type    | Description                                   |
| :---------------- | :------ | :-------------------------------------------- |
| `rating`          | `float` | **Required** The rate that you give the book. |

#### Borrow a book from library

```http
  POST /users/${member_id}/borrow/${book_id}
```

| Parameter | Type    | Description                                   |
| :-------- | :------ | :-------------------------------------------- |
| `id`      | `float` | **Required** The rate that you give the book. |
