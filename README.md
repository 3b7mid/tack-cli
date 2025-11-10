# Task Tracker CLI

A command-line interface (CLI) application for managing tasks with features to add, update, delete, and track task status.

## Project URL

[roadmap.sh/projects/task-tracker](https://roadmap.sh/projects/task-tracker)

## Features

- Add new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as in-progress or done
- List all tasks
- Filter tasks by status (todo, in-progress, done)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/3b7mid/tack-cli
```

2. Navigate to the project directory:
```bash
cd task-tracker-cli
```

## Usage

The CLI supports the following commands:

### Adding a Task
```bash
node index.mjs add "Your task description"
```

### Updating a Task
```bash
node index.mjs update <task-id> "Updated task description"
```

### Deleting a Task
```bash
node index.mjs delete <task-id>
```

### Marking Task Status
Mark as in-progress:
```bash
node index.mjs mark-in-progress <task-id>
```

Mark as done:
```bash
node index.mjs mark-done <task-id>
```

### Listing Tasks

List all tasks:
```bash
node index.mjs list
```

List only todo tasks:
```bash
node index.mjs list todo
```

List only in-progress tasks:
```bash
node index.mjs list in-progress
```

List only completed tasks:
```bash
node index.mjs list done
```

## Task Structure

Each task in the system has the following properties:

```json
{
  "id": 1,
  "description": "Task description",
  "status": "todo",
  "createdAt": "2025-11-10T00:00:00.000Z",
  "updatedAt": "2025-11-10T00:00:00.000Z"
}
```

- `id`: Unique identifier for the task
- `description`: Task description
- `status`: Current status of the task (todo, in progress, done)
- `createdAt`: Timestamp when the task was created
- `updatedAt`: Timestamp when the task was last updated

## Data Storage

Tasks are stored in a JSON file (`Tasks.json`) in the project root directory. The file is automatically created when you add your first task.

## Error Handling

The CLI includes error handling for common scenarios:
- Checking if tasks exist before operations
- Validating task IDs
- File system error handling
- Input validation

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements or bug fixes.
