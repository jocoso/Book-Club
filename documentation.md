## API Documentation

### **Types**

#### **User**

A `User` represents a person who interacts with the system. Each user has a unique ID, username, and password, and they may also have reviews and friends.

**Fields:**

- `_id: ID!`Unique identifier for the user.
- `Username: String!`The user's unique name.
- `Email: String!`The user's email address.
- `Password: String!`The user's password (hashed).
- `Reviews: [PostInput!]`A list of comments the user has made (optional).
- `Friends: [User!]`
  A list of the user's friends (optional).

#### **Book**

A `Book` represents a book in the system. Each book has an ID and can contain comments and a `Blob` value.

**Fields:**

- `_id: ID!`Unique identifier for the book (usually ISBN-10).
- `Comments: [Comment!]`A list of comments associated with the book (optional).
- `Blob: Int!`
  A numerical value associated with the book. Defaults to `0`.

#### **Post**

A `Post` is used when creating or modifying a post within a club.

**Fields:**

* `_id: ID!`The unique identifier of the post.
* `Title: String!`The title of the post.
* `Content: String!`The body of the post.
* `Blob: Int`A numerical value associated with the post. Defaults to `0`.
* `Media: [String!]!`A list of media URLs associated with the post.
* `Comments: [CommentInput]`A list of comments related to the post (optional).

#### **Club**

A `Club` represents a group of users with shared interests. Each club has a unique ID, a name, and a description. Clubs may have members and posts.

**Fields:**

- `_id: ID!`Unique identifier for the club.
- `Name: String!`The name of the club.
- `Img: String`URL for the club's image. Defaults to a default image if not provided.
- `Description: String!`A brief description of the club.
- `Founder: User!`The user who created the club.
- `Members: [User!]!`A list of users who are members of the club.
- `Posts: [Post!]`
  A list of posts created within the club.


---

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

#### `getAllBooks(): [Book!]`

This query retrieves all books in the system. If no books exist, it returns an empty array.

**Response:**
Returns an array of `Book` objects, each with `Comments` and `Blob`.

**Usage Example:**

```javascript
const books = getAllBooks();
```

---

#### `getAllUsers(): [User!]`

This query retrieves all users in the system. If no users exist, it returns an empty array.

**Response:**
Returns an array of `User` objects, each with `Username`, `Email`, and other fields.

**Usage Example:**

```javascript
const users = getAllUsers();
```

---

### **Mutations**

#### `addUser(username: String!, email: String!, password: String!): User`

This mutation creates a new user in the system.

**Parameters:**

- `username: String!`The unique username for the user.
- `email: String!`The email address for the user.
- `password: String!`
  The password for the user (should be securely hashed).

**Response:**
Returns the newly created `User` object.

**Usage Example:**

```javascript
const newUser = addUser("newUser123", "newuser@example.com", "password123");
```

---

#### `addBook(_id: ID!, blob: Int): Book`

This mutation creates a new `Book` object if it doesn't already exist. The `Blob` value is optional and defaults to `0`.

**Parameters:**

- `_id: ID!`The unique ID for the book (ISBN-10).
- `blob: Int`
  The blob value for the book. Defaults to `0`.

**Response:**
Returns the newly created or existing `Book` object.

**Usage Example:**

```javascript
const newBook = addBook("1234567890", 10);
```

---

#### `addCommentToBook(book_id: ID!, comment: CommentInput!): Book`

This mutation adds a comment to a specific book.

**Parameters:**

- `book_id: ID!`The unique ID of the book.
- `comment: CommentInput!`
  The comment input containing details of the new comment.

**Response:**
Returns the updated `Book` object with the new comment.

**Usage Example:**

```javascript
const updatedBook = addCommentToBook("1481465589", { _id: "123", Title: "Great Book!", Author: user });
```

---

#### `addPostToClub(club_id: ID!, post: PostInput!): Club`

This mutation adds a post to a specific club.

**Parameters:**

- `club_id: ID!`The unique ID of the club.
- `post: PostInput!`
  The post input containing details of the new post.

**Response:**
Returns the updated `Club` object with the new post.

**Usage Example:**

```javascript
const updatedClub = addPostToClub("clubId123", { _id: "post123", Title: "New Post", Content: "Great content!", Author: user });
```

---

#### `addFriend(user_id: ID!, friend_id: ID!): User`

This mutation adds a friend to the user's friend list.

**Parameters:**

- `user_id: ID!`The ID of the user adding a friend.
- `friend_id: ID!`
  The ID of the user to be added as a friend

.

**Response:**
Returns the updated `User` object with the new friend added.

**Usage Example:**

```javascript
const updatedUser = addFriend("userId123", "friendId456");
```

---

#### `addMemberToClub(club_id: ID!, user_id: ID!): Club`

This mutation adds a user to a club as a member.

**Parameters:**

- `club_id: ID!`The ID of the club.
- `user_id: ID!`
  The ID of the user to be added as a member.

**Response:**
Returns the updated `Club` object with the new member added.

**Usage Example:**

```javascript
const updatedClub = addMemberToClub("clubId123", "userId456");
```

---

### **Remove Mutations**

#### `removeUser(user_id: ID!): User`

This mutation removes a user from the system.

**Parameters:**

- `user_id: ID!`
  The unique identifier of the user to be removed.

**Response:**
Returns the removed `User` object.

**Usage Example:**

```javascript
const removedUser = removeUser("userId123");
```

---

#### `removeBook(book_id: ID!): Book`

This mutation removes a book from the system.

**Parameters:**

- `book_id: ID!`
  The unique identifier of the book to be removed.

**Response:**
Returns the removed `Book` object.

**Usage Example:**

```javascript
const removedBook = removeBook("1234567890");
```

---

#### `removeCommentFromBook(book_id: ID!, comment_id: ID!): Book`

This mutation removes a specific comment from a book.

**Parameters:**

- `book_id: ID!`The unique identifier of the book.
- `comment_id: ID!`
  The unique identifier of the comment to be removed.

**Response:**
Returns the updated `Book` object with the comment removed.

**Usage Example:**

```javascript
const updatedBook = removeCommentFromBook("1481465589", "commentId123");
```

---

#### `removePostFromClub(club_id: ID!, post_id: ID!): Club`

This mutation removes a specific post from a club.

**Parameters:**

- `club_id: ID!`The unique identifier of the club.
- `post_id: ID!`
  The unique identifier of the post to be removed.

**Response:**
Returns the updated `Club` object with the post removed.

**Usage Example:**

```javascript
const updatedClub = removePostFromClub("clubId123", "postId456");
```

---

#### `removeFriend(user_id: ID!, friend_id: ID!): User`

This mutation removes a friend from the user's friend list.

**Parameters:**

- `user_id: ID!`The unique identifier of the user.
- `friend_id: ID!`
  The unique identifier of the friend to be removed.

**Response:**
Returns the updated `User` object with the friend removed.

**Usage Example:**

```javascript
const updatedUser = removeFriend("userId123", "friendId456");
```

---

#### `removeMemberFromClub(club_id: ID!, user_id: ID!): Club`

This mutation removes a member from a club.

**Parameters:**

- `club_id: ID!`The unique identifier of the club.
- `user_id: ID!`
  The unique identifier of the user to be removed.

**Response:**
Returns the updated `Club` object with the member removed.

**Usage Example:**

```javascript
const updatedClub = removeMemberFromClub("clubId123", "userId456");
```
