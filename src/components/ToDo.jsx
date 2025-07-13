import React, { use, useRef, useState, useEffect } from "react";
import pen from "../assets/pen.svg";
import del from "../assets/delete.svg"
import { v4 as uuidv4 } from 'uuid';
const Todo = () => {
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [type, setType] = useState("Add")
    const refid = useRef(-1)
    const initialized = useRef(false)
    useEffect(() => {
        const loadTodos = () => {
            try {
                const todoString = localStorage.getItem("todos");
                if (todoString) {
                    const parsedTodos = JSON.parse(todoString);
                    if (Array.isArray(parsedTodos)) {
                        setTodos(parsedTodos);
                    }
                }
            } catch (error) {
                console.error("Error loading todos from localStorage:", error);
            }
        };

        loadTodos();
    }, []);
    useEffect(() => {
        if (initialized.current) {
            try {
                localStorage.setItem("todos", JSON.stringify(todos));
                console.log("Todos saved to localStorage:", todos);
            } catch (error) {
                console.error("Error saving todos to localStorage:", error);
            }
        } else {
            initialized.current = true;
        }
    }, [todos]);
    function handleChange(e) {
        setTodo(e.target.value)
    }
    function dele(e, id) {
        if (refid.current >= 0 && todos[refid.current].id == id) {
            refid.current = -1
            setType("Add")
            setTodo("")
        }
        setTodos(todos.filter(item => {
            return item.id != id
        }));
    }
    function edit(e, id) {
        let index = todos.findIndex(item => {
            return item.id == id
        })
        setTodo(todos[index].todo)
        setType("Save")
        refid.current = index
    }
    function handleDone(e) {
        let id = e.target.id
        let index = todos.findIndex(item => {
            return item.id == id
        })
        let newTodos = [...todos]
        newTodos[index].isCompleted = !newTodos[index].isCompleted
        setTodos(newTodos)
    }
    const add = () => {
        if (refid.current == -1) {
            setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
            setTodo("")
        }
        else {
            let newTodo = [...todos]
            newTodo[refid.current].todo = todo
            setTodo("")
            setType("Add")
            refid.current = -1
            setTodos(newTodo)
        }
    }
    return (
        <>
            <span className="pt-[30px] xl:left-[50px] xl:fixed flex flex-col items-center xl:items-end gap-1">
                <input onChange={handleChange} value={todo} type="text" placeholder="Add a todo..." className="bg-white w-[350px] py-[10px] pl-[15px] font-bold" />
                <button onClick={add} className="text-white m-2 bg-[#e4c48c] px-[14px] py-[5px] rounded-[10px] hover:bg-[#ffca6f] transition duration-500 cursor-pointer">{type}</button>
            </span>
            <div className="w-[100vw] flex justify-center items-center p-[15px]">
                <div className="bg-white w-[450px] min-h-[85vh] gap-[14px] flex flex-col items-center py-9">
                    <p className="suranna-regular text-[23.6px] font-light mb-5">T O&nbsp;&nbsp; D O&nbsp;&nbsp; L I S T</p>
                    {todos.length == 0 && <p className="suranna-regular text-[20.6px] font-light">No Todos</p>}
                    {
                        todos.map(td => {

                            return (<div key={td.id} className="flex justify-between w-[80%] min-h-[29px] border-b-[1px] py-1">
                                <div className="flex gap-4 px-2 items-start flex-1 min-w-0">
                                    <input
                                        checked={td.isCompleted}
                                        className="cursor-pointer accent-[#e5dfd5] mt-1 flex-shrink-0"
                                        id={td.id}
                                        onChange={handleDone}
                                        type="checkbox"
                                    />
                                    <p className={`${td.isCompleted ? "line-through" : ""} break-words w-[80%]`}>
                                        {td.todo}
                                    </p>
                                </div>
                                <div className="flex justify-between gap-4 flex-shrink-0">
                                    <button onClick={(e) => { edit(e, td.id) }}>
                                        <img className="w-[18px] opacity-60 hover:opacity-100 transition duration-500 cursor-pointer" src={pen} />
                                    </button>
                                    <button onClick={(e) => { dele(e, td.id) }}>
                                        <img className="w-[18px] opacity-60 hover:opacity-100 transition duration-500 cursor-pointer" src={del} />
                                    </button>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default Todo