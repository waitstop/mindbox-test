import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Plus, Trash2} from "lucide-react";
import {TodoType} from "@/lib/types/TodoType";
import {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";

const TodosComponent = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [title, setTitle] = useState("");
    const [currentTab, setCurrentTab] = useState<"all" | "notCompleted" | "completed">("all");

    return (
        <div className={"bg-zinc-100 rounded-md p-12 min-w-[500px]"}>
            <h1 className={"text-2xl font-bold text-center mb-6"}>Todos</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                addTodo(title)
            }} className={"flex w-full items-center space-x-2 mb-6"}
            >
                <Input value={title}
                       onChange={e => setTitle(e.target.value)}
                       required
                       type="text"
                       placeholder={"I need to do..."}/>
                <Button data-testid="addTodo" type="submit"> <Plus/> </Button>
            </form>
            <div className={"flex flex-col space-y-4"}>
                {
                    todos.filter(todo => todo.completed === (currentTab === "completed") || currentTab === "all").map(todo => (
                        <div data-testid="todo" className={"w-full bg-zinc-200 rounded-md p-4 flex flex-row justify-between items-center"} key={todo.id}>
                            <span className={todo.completed ? "line-through" : ""}>
                                {todo.title}
                            </span>
                            <div className={"flex items-center"}>
                                <Button data-testid="deleteTodo" onClick={()=>deleteTodo(todo.id)} className={"bg-transparent hover:bg-transparent text-black group"}>
                                    <Trash2 className={"group-hover:text-red-500 transition-colors"}/>
                                </Button>
                                <Checkbox
                                    data-testid="todoCheckbox"
                                    checked={todo.completed}
                                    onCheckedChange={state => checkTodo(todo.id, !!state)}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={"flex flex-row items-center justify-between mt-6"}>
                <Button data-testid="tab-switch-all" className={currentTab === "all" ? "bg-green-500" : ""}
                        onClick={() => setCurrentTab('all')}>All</Button>
                <Button data-testid="tab-switch-notCompleted" className={currentTab === "notCompleted" ? "bg-green-500" : ""}
                        onClick={() => setCurrentTab('notCompleted')}>Not completed</Button>
                <Button data-testid="tab-switch-completed" className={currentTab === "completed" ? "bg-green-500" : ""}
                        onClick={() => setCurrentTab('completed')}>Completed</Button>
            </div>

        </div>
    );
    function addTodo(title: string) {
        if(title === "") return;
        setTodos(prevState => [
            ...prevState,
            {id: prevState.length, title, completed: false}
        ]);
    }
    function checkTodo(id: number, state: boolean) {
        setTodos(prevState => prevState.map(todo => {
            if(todo.id !== id) return todo;
            return {...todo, completed: state}
        }));
    }

    function deleteTodo(id: number) {
        setTodos(prevState => prevState.filter(todo => todo.id !== id));
    }
};

export default TodosComponent;