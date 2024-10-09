import { useState, useEffect } from "react";
import "./index.css";
import Trash from "../../assets/Trash.png";
import TaskIcon from "../../assets/task-icon.png";

import api from "../../api/posts";
import { getTodos } from "../../Sevices/TodoService";
const Index = () => {
    const [taskInput, setTaskInput] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [errors, setErrors] = useState("");
    // let [filterStatus, setFilterStatus] = useState(false);

    const fetchTodos = () => {
        getTodos().then((res) => setTaskList(res.data));
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    const handleAddTask = (e) => {
        let payload = {
            title: taskInput,
            isDone: false,
        };

        api.post("/add", payload)
            .then((res) => {
                fetchTodos();
                setTaskInput("");
            })
            .catch((err) => {
                setErrors(err.response.data);
            });
    };

    const handleDelete = (id) => {
        api.delete(`/delete/${id}`).then((res) => {
            fetchTodos();
        });
    };

    const handleIsCompleted = (id) => {
        // let task = taskList.find((_, index) => index === i);
        // task.isDone = !task.isDone;
        // let checkedTask = [...taskList];
        // checkedTask.splice(i, 1, task);

        api.patch(`/updateStatus/${id}`, {}).then((res) => {
            console.log(res);

        });
        // setTaskList(checkedTask);
    };

    // const handleFilterStatus = () => {
    //     setFilterStatus((f) => !filterStatus);
    // };

    // const handleCompletedTask = () => {
    //     let completedTask = taskList.filter((_) => taskList.isDone === true);
    //     console.log(completedTask);
    // };

    // const handleIncompletedTask = () => {};

    return (
        <div className="container">
            <div className="header">
                <h1>ToDo</h1>
            </div>
            <div className="task">
                <div className="title">
                    <img src={TaskIcon} alt=""></img>
                    <h2>Tasks</h2>
                </div>
                <div className="task-input">
                    <input
                        type="text"
                        id="newTasks"
                        value={taskInput}
                        placeholder="Enter your Task here"
                        onChange={(e) => setTaskInput(e.target.value)}
                    ></input>
                    <button onClick={handleAddTask}>Add</button>
                </div>
                <p className="error">{errors?.title}</p>
                {/* <div className="filter">
                    <button onClick={() => handleFilterStatus()}>filter</button>
                    {filterStatus ? (
                        <div className="filter-on">
                            <button
                                className="complete-btn"
                                onClick={() => handleCompletedTask()}
                            >
                                completed
                            </button>
                            <br />
                            <button
                                className="incomplete-btn"
                                onClick={handleIncompletedTask()}
                            >
                                Incomplete
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div> */}
                <div className="taskLists">
                    {taskList.map((data) => {
                        return (
                            <div
                                className={`list-items ${
                                    data.isDone ? "completed" : ""
                                }`}
                                key={data?.id}
                            >
                                <span>
                                    <input
                                        type="checkbox"
                                        checked={data?.isDone}
                                        onClick={(e) =>
                                            handleIsCompleted(e, data.id)
                                        }
                                    />
                                    <p>{data?.title}</p>
                                </span>
                                <img
                                    src={Trash}
                                    onClick={() => handleDelete(data.id)}
                                    alt=""
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Index;
