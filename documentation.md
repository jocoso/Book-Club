Here is the fixed input transformed into a documentation format:

---

## API Documentation

### **Types**

#### **User**

A `User` represents a person who interacts with the system. Each user has a unique ID, username, and password, and they may also have reviews and friends.

**Fields:**

- `_id: ID!`Unique identifier for the user.
- `Username: String!`The user's unique name.
- `Email: String!`The user's email address.
- `Password: String!`The user's password (hashed).
- `Reviews: [Comment!]`A list of comments the user has made (optional).
- `Friends: [User!]`
  A list of the user's friends (optional).

---

#### **Book**

A `Book` represents a book in the system. Each book has an ID and can contain comments and a `Blob` value.

**Fields:**

- `_id: ID!`Unique identifier for the book (usually ISBN-10).
- `Comments: [Comment!]`A list of comments associated with the book (optional).
- `Blob: Int!`
  A numerical value associated with the book. Defaults to `0`.

---

### **Inputs**

#### **CommentInput**

A `CommentInput` is used when adding or modifying a comment on a book or post.

**Fields:**

- `_id: ID!`Unique identifier for the comment.
- `Title: String!`The title of the comment.
- `Content: String`The body of the comment (optional).
- `Author: User!`The user who authored the comment.
- `Timestamp: String`Date and time when the comment was posted, in string format (optional).
- `Blob: Int`
  A numerical value associated with the comment. Defaults to `0`.

---

#### **PostInput**

A `PostInput` is used when creating or modifying a post within a club.

**Fields:**

- `_id: ID!`Unique identifier for the post.
- `Title: String!`The title of the post.
- `Content: String!`The body of the post.
- `Author: User!`The user who authored the post.
- `Blob: Int`A numerical value associated with the post. Defaults to `0`.
- `Media: [String!]!`A list of media URLs associated with the post.
- `Comments: [CommentInput]`
  A list of comments related to the post (optional).

---

#### **Club**

A `Club` represents a group of users with shared interests. Each club has a unique ID, a name, and a description. Clubs may have members and posts.

**Fields:**

- `_id: ID!`Unique identifier for the club.
- `Name: String!`The name of the club.
- `Img: String`URL for the club's image. Defaults to a default image if not provided.
- `Description: String!`A brief description of the club.
- `Founder: ID!`Unique identifier of the club's founder (user).
- `Members: [User!]!`A list of users who are members of the club.
- `Posts: [Post!]!`
  A list of posts created within the club.

---

### **Queries**

#### `getBookData(_id: ID!): Book`

This query retrieves a `Book` object by its ID (ISBN-10). If the book does not exist, it creates a new `Book` tied to the given ISBN-10 and returns the newly created object.

**Parameters:**

- `_id: ID!`
  The book’s ISBN-10 or unique identifier.

**Response:**
Returns a `Book` object with the given `_id`, `Comments`, and `Blob`.

**Usage Example:**

```javascript
const bookData = getBookData("1481465589"); // To Kill a Mockingbird
```

---

#### `getAllClubs(): [Club!]`

This query retrieves all clubs in the system. If no clubs exist, it returns an empty array.

**Response:**
Returns an array of `Club` objects, each containing `Name`, `Img`, `Description`, `Members`, and `Posts`.

**Usage Example:**

```javascript
const clubs = getAllClubs();
```

---

#### `getUser(username: String!): User`

This query retrieves a `User` by their username. If the user does not exist, it returns `null`.

**Parameters:**

- `username: String!`
  The username of the user to be retrieved.

**Response:**
Returns a `User` object with details like `_id`, `username`, `email`, `reviews`, and `friends`.

**Usage Example:**

```javascript
const user = getUser("uniquetestuser");
```

---

#### `getAllReviews(book_id: ID!): [Comment!]`

This query retrieves all comments (reviews) for a specific book. If no comments exist, it returns an empty array.

**Parameters:**

- `book_id: ID!`
  The ID of the book for which to retrieve reviews.

**Response:**
Returns an array of `Comment` objects related to the book.

**Usage Example:**

```javascript
const reviews = getAllReviews("1481465589");
```

---

#### `getUserWishcart(user_id: ID!): [Book!]`

This query retrieves the wish cart (list of books) associated with a user. If no books exist in the user's wish cart, it returns an empty array.

**Parameters:**

- `user_id: ID!`
  The ID of the user whose wish cart is to be retrieved.

**Response:**
Returns an array of `Book` objects in the user's wish cart, each with `Comments` and `Blob`.

**Usage Example:**

```javascript
const wishcart = getUserWishcart("jdwuicxbksdjlsadjfh");
```

---
