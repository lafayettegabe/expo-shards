<!-- markdownlint-configure-file {
  "MD013": {
    "code_blocks": false,
    "tables": false
  },
  "MD033": false,
  "MD041": false
} -->

<div align="center">

# 🔷 Expo Shards

### SQLite ORM for use with Expo in React Native

[![npm][npm-badge]][npm]
[![expo][expo-badge]][expo]
[![react-native][react-native-badge]][react-native]
[![sqlite][sqlite-badge]][sqlite]

</div>

## Why?

Expo Shards is an SQLite ORM designed specifically for use with Expo in React Native. It offers declarative data modeling and an auto-generated, type-safe query builder to simplify database interactions and improve development efficiency.

A key feature of Expo Shards is its compatibility with Expo Go, which allows developers to test their applications instantly without needing to build native code. This feature is particularly useful during development, as it enables rapid iteration and testing of database interactions directly within Expo Go. Unlike many solutions that require native code modifications and builds, Expo Go provides a streamlined and efficient testing environment.

## Project Status

### Current State

- **CLI**: The CLI is functional and supports the following commands:
  - `npx expo-shards init`: Initializes a new project with an example `.shard` file.
  - `npx expo-shards create <database-name>`: Creates a new SQLite database with the specified name.
  - `npx expo-shards generate`: Generates TypeScript interfaces and JSON schemas from the `.shard` file.

- **Client**: The client code from a previous version is available as a base for future development but is not yet in use.

### To Do

- **Refactor Client Code**: Update and integrate the legacy client code to align with the latest project version and features.
- **Enhance Documentation**: Improve documentation and examples to provide clearer instructions and better support for users.
- **Implement Additional Features**: Develop new features and enhancements based on user feedback and project needs.

## Using the CLI

Expo Shards includes a CLI to help with initialization and management of your database schema. Here’s a quick overview of the available commands:

### Initialization

To initialize a new project with Expo Shards, use:

```sh
npx expo-shards init
```

This command sets up a new project directory with an example `.shard` file, which serves as the declarative database schema.

### Creating a New Database

To create a new SQLite database, you need to provide a name for the database. Use the following command:

```sh
npx expo-shards create <database-name>
```

Replace `<database-name>` with the desired name for your database. This command will set up a new SQLite database with the specified name.

### Generating Types and Schemas

Once your `.shard` file is configured, you can generate TypeScript interfaces and JSON schemas for your database with:

```sh
npx expo-shards generate
```

This command will create TypeScript interfaces in the `types` folder and JSON schemas needed to set up the SQLite database on the client side.

## Example Workflow

1. **Initialize** a new project:

   ```sh
   npx expo-shards init
   ```

2. **Create** a new database (replace `<database-name>` with your chosen name):

   ```sh
   npx expo-shards create <database-name>
   ```

3. **Generate** TypeScript interfaces and JSON schemas:

   ```sh
   npx expo-shards generate
   ```

By following these steps, you'll have your Expo Shards setup and ready to use with a declarative schema and type-safe query builder.

## Example `.shard` File

The `.shard` file defines your database schema declaratively. Here’s an example of what it might look like:

```sh
table Users {
  id        Int       @id  @default(autoincrement())
  name      String
  email     String    @unique
  age       Int
  created   DateTime  @default(now())
  updated   DateTime  @updatedAt
}

table GPS {
  id        Int       @id  @default(autoincrement())
  coordenada String
}
```

## Generated TypeScript Interfaces

When you run `npx expo-shards generate`, it will create TypeScript interfaces based on your schema. For the above `.shard` file, the generated interfaces would look like this:

```ts
export interface Users {
  id: number;
  name: string;
  email: string;
  age: number;
  created: Date;
  updated: Date;
}

export interface GPS {
  id: number;
  coordenada: string;
}
```

## Generated JSON Schema

The `generate` command also produces JSON schemas that define the structure of your tables. For the given `.shard` file, the generated schemas would be:

```json
{
  "Users": {
    "id": {
      "type": "Int",
      "primary": true,
      "default": "autoincrement"
    },
    "name": {
      "type": "String"
    },
    "email": {
      "type": "String",
      "unique": true
    },
    "age": {
      "type": "Int"
    },
    "created": {
      "type": "DateTime",
      "default": "now"
    },
    "updated": {
      "type": "DateTime",
      "onUpdate": true
    }
  },
  "GPS": {
    "id": {
      "type": "Int",
      "primary": true,
      "default": "autoincrement"
    },
    "coordenada": {
      "type": "String"
    }
  }
}
```

## Learn More

To learn more about Expo and React Native, take a look at the following resources:

- [Expo Documentation](https://docs.expo.dev/) - Learn about Expo features and API.
- [React Native Documentation](https://reactnative.dev/docs/getting-started) - Learn about React Native features and API.

You can also check out the [Expo GitHub repository](https://github.com/expo/expo) and the [React Native GitHub repository](https://github.com/facebook/react-native) for more information and to contribute.

[expo]: https://expo.dev/
[expo-badge]: https://img.shields.io/badge/expo-1C1C1C?style=for-the-badge&logo=expo&logoColor=white
[react-native]: https://reactnative.dev/
[react-native-badge]: https://img.shields.io/badge/react%20native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[sqlite]: https://www.sqlite.org/
[sqlite-badge]: https://img.shields.io/badge/sqlite-%23074059.svg?style=for-the-badge&logo=sqlite&logoColor=white
[npm]: https://www.npmjs.com/package/expo-shards
[npm-badge]: https://img.shields.io/npm/v/expo-shards?style=for-the-badge
