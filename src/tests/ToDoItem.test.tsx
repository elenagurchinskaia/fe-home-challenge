import { render, fireEvent } from "@testing-library/react";
import ToDoItem from "../components/ToDoItem";

describe("ToDoItem", () => {
  const mockToggleComplete = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockEditTask = jest.fn();
  const defaultProps = {
    id: 1,
    name: "Test Task",
    completed: false,
    priority: 2,
    onToggleComplete: mockToggleComplete,
    onDeleteTask: mockDeleteTask,
    onEditTask: mockEditTask,
  };

  it("renders task with correct name", () => {
    const { getByText } = render(<ToDoItem {...defaultProps} />);
    const taskElement = getByText(/test task/i);
    expect(taskElement).toBeTruthy();
  });

  it("toggles task completion", () => {
    const { getByRole } = render(<ToDoItem {...defaultProps} />);
    fireEvent.click(getByRole("checkbox"));
    expect(mockToggleComplete).toHaveBeenCalledWith(1);
  });

  it("deletes the task", () => {
    const { getByRole } = render(<ToDoItem {...defaultProps} />);
    fireEvent.click(getByRole("button"));
    expect(mockDeleteTask).toHaveBeenCalledWith(1);
  });
});
