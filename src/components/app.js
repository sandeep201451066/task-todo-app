import React from "react";
import TodosList from "./todos-list"
import CreateTodo from "./create-todo";
import { connect } from 'react-redux';

// import "./style.css";

const todos = {
    items: [],
    lsKey: "todos",
    populate () {
        this.items = this.get();
    },
    get () {
        try {
            return JSON.parse(localStorage.getItem(this.lsKey)) || []
        } catch (e) {}
        return [];
    },
    save () {
        localStorage.setItem(this.lsKey, JSON.stringify(this.items));
    },
    toggle (id) {
        let todoItem = this.items[id];
        todoItem.isCompleted = !todoItem.isCompleted;
        this.save();
    },
    add (obj) {
        this.items.push(obj);
        this.save();
    },
    remove (id) {
        this.items.splice(id, 1);
        this.save();
    },
    update (id, task, isCompleted) {
        let todoItem = this.items[id];
        todoItem.task = task;
        todoItem.isCompleted = isCompleted;
        console.log(todoItem,'to')
        this.save();
    }
};

todos.populate();


class App extends React.Component {
    constructor (props) {
        super(props);
        //setInterval(() => {
        //    todos.push({
        //        task: "Make tea: " + Math.random(),
        //        isCompleted: true
        //    });
        //    this.setState({ todos });
        //}, 1000);


        this.state = {
            todos: todos.items
        };
    }
    search(e){
        const {value} = e.target;
        // this.props.taskSearch(value);
        this.props.dispatch({
			type: 'TASK_SEARCH',
			payload: value,
		});
    }
    Completed(id){
        if(id === 0){
            this.props.dispatch({
                type: 'TASK_COMPLETED',
                payload: Math.floor(Math.random() * 1000 + 1),
            });
        } else{
            this.props.dispatch({
                type: 'TASK_NOT_COMPLETED',
                payload: Math.floor(Math.random() * 1000 + 1),
            });
        }
       
    }
    render () {
        return (
            <div>
                
                <h1>Task Management</h1>
                {/* <button >All</button> */}
                <button onClick={()=>this.Completed(1)}>Active</button>
                <button onClick={()=>this.Completed(0)}>Completed</button>
                <input placeholder="search..." onChange={(e)=>this.search(e)}></input>

                <CreateTodo
                    createTask={this.createTask.bind(this)}
                />
                <TodosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    editTask={this.editTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
            </div>
        );
    }

    createTask (task) {
        task = task.trim();
        if (!task) { return; }
        todos.add({
            task,
            isCompleted: '0'
        });
        this.setState({ todos: this.state.todos });
    }

    toggleTask (taskId) {
        todos.toggle(taskId);
        this.setState({ todos: this.state.todos });
    }
    editTask (taskId, task, isCompleted) {
        todos.update(taskId, task, isCompleted);
        console.log(isCompleted,'hi')
        this.setState({ todos: this.state.todos });
    }
    deleteTask (taskId) {
        todos.remove(taskId);
        this.setState({ todos: this.state.todos });
    }
}
// const mapDispatchToProps = {
//     taskSearch
//   };
  
export default connect()(App)
