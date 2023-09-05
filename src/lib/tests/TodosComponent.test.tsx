import {fireEvent, render} from '@testing-library/react';
import {screen} from "@testing-library/react";
import TodosComponent from '@/components/TodosComponent';
import '@testing-library/jest-dom';


describe('TodosComponent', () => {
    test('should render', () => {
        render(<TodosComponent />);
    })

    test('Add new todos', () => {
        render(<TodosComponent />);
        const todos = ["todo1", "todo2", "todo3"];
        const addButton = screen.getByTestId('addTodo');
        // Add new todos
        todos.forEach(todo => {
            const input = screen.getByPlaceholderText("I need to do...");
            fireEvent.change(input, {target: {value: todo}})
            fireEvent.click(addButton)
            const newTodoElement = screen.getByText(todo);
            expect(newTodoElement).toBeInTheDocument();
        });
    });

    test('Delete todos', () => {
        render(<TodosComponent />);
        const todos = ["todo1", "todo2", "todo3"];
        const addButton = screen.getByTestId('addTodo');

        // Add new todos
        todos.forEach(todo => {
            const input = screen.getByPlaceholderText("I need to do...");
            fireEvent.change(input, {target: {value: todo}})
            fireEvent.click(addButton)
            const newTodoElement = screen.getByText(todo);
            expect(newTodoElement).toBeInTheDocument();
        });

        const deleteButtons = screen.queryAllByTestId('deleteTodo');
        deleteButtons.forEach(deleteButton => {
            fireEvent.click(deleteButton)
        });
        const todoElements = screen.queryAllByTestId("todo");
        expect(todoElements.length).toBe(0);
    })

    test('Check todos', () => {
        render(<TodosComponent />);
        const todos = ["todo1", "todo2", "todo3"];
        const addButton = screen.getByTestId('addTodo');

        // Add new todos
        todos.forEach(todo => {
            const input = screen.getByPlaceholderText("I need to do...");
            fireEvent.change(input, {target: {value: todo}})
            fireEvent.click(addButton)
            const newTodoElement = screen.getByText(todo);
            expect(newTodoElement).toBeInTheDocument();
        });

        const todoCheckboxes = screen.queryAllByTestId('todoCheckbox');
        todoCheckboxes.forEach(checkbox=>{
            fireEvent.click(checkbox)
        })

        todos.forEach(todo => {
            const newTodoElement = screen.getByText(todo);
            expect(newTodoElement).toHaveClass("line-through");
        })
    })

    test('Switch tabs', () => {
        render(<TodosComponent />);
        const todos = ["todo1", "todo2", "todo3"];
        const addButton = screen.getByTestId('addTodo');

        // Add new todos
        todos.forEach(todo => {
            const input = screen.getByPlaceholderText("I need to do...");
            fireEvent.change(input, {target: {value: todo}})
            fireEvent.click(addButton)
            const newTodoElement = screen.getByText(todo);
            expect(newTodoElement).toBeInTheDocument();
        });

        const todoCheckboxes = screen.queryAllByTestId('todoCheckbox');
        fireEvent.click(todoCheckboxes[0])

        fireEvent.click(screen.getByTestId("tab-switch-all"))
        let todoElements = screen.getAllByTestId("todo");
        expect(todoElements.length).toBe(3);

        fireEvent.click(screen.getByTestId("tab-switch-notCompleted"))
        todoElements = screen.getAllByTestId("todo");
        expect(todoElements.length).toBe(2);

        fireEvent.click(screen.getByTestId("tab-switch-completed"))
        todoElements = screen.getAllByTestId("todo");
        expect(todoElements.length).toBe(1);
    })
});
