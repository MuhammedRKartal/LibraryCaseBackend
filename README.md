# Library Case

## Requirements

- Node: v20.18.0

- postgresql: Latest

## Database and Env Config

- Example Env File for the database config.

- DATABASE_URL="postgresql://<db_user_name>:<db_user_password>@<database_host>:<database_port>/<database_name>?schema=<schame_name>"

- Run the Database.sql file.

## How to start the project

1. Set up the .env file as mentioned above.
2. Run the Database.sql file to create your database.
3. Run the command `npm install`
4. Run the command `npm run dev`

## API Usage

#### Return all the members

```http
  GET /members
```

#### Return a specific member

```http
  POST /members/${id}
```

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Required**. Çağrılacak öğenin anahtar değeri |

#### Return all the books

```http
  GET /books
```

#### Return a specific book

```http
  GET /books/${id}
```

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Required**. Çağrılacak öğenin anahtar değeri |

#### Return the book that you own to library

```http
  POST /members/${member_id}/return/${book_id}
```

| Body JSON Element | Type    | Description                                   |
| :---------------- | :------ | :-------------------------------------------- |
| `rating`          | `float` | **Required** The rate that you give the book. |

#### Borrow a book from library

```http
  POST /members/${member_id}/borrow/${book_id}
```

| Parameter | Type    | Description                                   |
| :-------- | :------ | :-------------------------------------------- |
| `id`      | `float` | **Required** The rate that you give the book. |
