import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTask from "../components/AddTask";

describe("AddTask", () => {
  it("renders correctly", () => {
    const { getByLabelText } = render(<AddTask onAddTask={jest.fn()} />);
    expect(getByLabelText(/new task/i)).toBeInTheDocument();
  });

  it("allows users to add a task", () => {
    const mockAddTask = jest.fn();
    const { getByLabelText, getByText } = render(
      <AddTask onAddTask={mockAddTask} />
    );

    fireEvent.change(getByLabelText(/new task/i), {
      target: { value: "Test task" },
    });
    fireEvent.click(getByText(/add task/i));

    expect(mockAddTask).toHaveBeenCalledWith("Test task", 1);
  });

  it("clears input after adding a task", () => {
    const mockAddTask = jest.fn();
    const { getByLabelText, getByText } = render(
      <AddTask onAddTask={mockAddTask} />
    );

    const input = getByLabelText(/new task/i);
    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.click(getByText(/add task/i));

    expect(input).toHaveValue("");
  });
});
