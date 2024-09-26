import { render } from "@testing-library/react";
import ToDoList from "../components/ToDoList";
import "@testing-library/jest-dom";

describe("ToDoList", () => {
  const tasks = [
    { id: 1, name: "Task 1", completed: false, priority: 1 },
    { id: 2, name: "Task 2", completed: true, priority: 2 },
  ];

  const mockToggleComplete = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockEditTask = jest.fn();
  const mockAddTask = jest.fn();

  it("renders active tasks", () => {
    const { getByText } = render(
      <ToDoList
        tasks={tasks}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
        onEditTask={mockEditTask}
        onAddTask={mockAddTask}
      />
    );
    expect(getByText(/task 1/i)).toBeTruthy();
  });

  it("renders completed tasks", () => {
    const { getByText } = render(
      <ToDoList
        tasks={tasks}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
        onEditTask={mockEditTask}
        onAddTask={mockAddTask}
      />
    );
    expect(getByText(/task 2/i)).toBeTruthy();
  });
});
