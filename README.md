# Todoアプリ

Nuxt.js + Amplify + Vuetifyを使用したタスク管理アプリ

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

# API仕様

このAPIはGraphQLを使用しています。また、APIの利用にはCognitoの認証が必要です。

## スキーマ

```
type Todo @model {
  id: ID!
  title: String!
  content: String
  is_completed: Boolean
  created_at: String
  updated_at: String
}
```

## タスク一覧取得

```
query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      content
      is_completed
      created_at
      updated_at
    }
    nextToken
  }
}
```

## タスク追加

```
input CreateTodoInput {
	id: ID
	title: String!
	content: String
	is_completed: Boolean
	created_at: String
	updated_at: String
}
```

```
mutation CreateTodo(
  $input: CreateTodoInput!
  $condition: ModelTodoConditionInput
) {
  createTodo(input: $input, condition: $condition) {
    id
    title
    content
    is_completed
    created_at
    updated_at
  }
}
```

## タスク更新

```
input UpdateTodoInput {
	id: ID!
	title: String
	content: String
	is_completed: Boolean
	created_at: String
	updated_at: String
}
```

```
mutation UpdateTodo(
  $input: UpdateTodoInput!
  $condition: ModelTodoConditionInput
) {
  updateTodo(input: $input, condition: $condition) {
    id
    title
    content
    is_completed
    created_at
    updated_at
  }
}
```

## タスク削除

```
input DeleteTodoInput {
	id: ID
}
```

```
mutation DeleteTodo(
  $input: DeleteTodoInput!
  $condition: ModelTodoConditionInput
) {
  deleteTodo(input: $input, condition: $condition) {
    id
    title
    content
    is_completed
    created_at
    updated_at
  }
}
```

## データが作成されたことを検知する

```
subscription OnCreateTodo {
  onCreateTodo {
    id
    title
    content
    is_completed
    created_at
    updated_at
  }
}
```

## データが更新されたことを検知する

```
subscription OnUpdateTodo {
  onUpdateTodo {
    id
    title
    content
    is_completed
    created_at
    updated_at
  }
}
```

## データが削除されたことを検知する

```
subscription OnDeleteTodo {
  onDeleteTodo {
    id
    title
    content
    is_completed
    created_at
    updated_at
  }
}
```