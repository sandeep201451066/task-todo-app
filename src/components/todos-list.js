import React from "react";
import TodosListItem from "./todos-list-item";
import { connect } from 'react-redux';
var search = ""
var dataLenght = 0;
class TodosList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            search: "",
            completed: '0',
            NotCompleted: '1'
        };

    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.search !== nextProps.search) {
            console.log(this.props.todos)
            this.setState({ search: nextProps.search })
            this.setState({completed: false, NotCompleted: true})
            search = nextProps.search;
            return true;
        }
        if (this.props.completed !== nextProps.completed) {
            this.setState({completed: '1', NotCompleted: '1'})
            return true;
        }
        if (this.props.NotCompleted !== nextProps.NotCompleted) {
            this.setState({NotCompleted: '0', completed: '0'})
            return true;
        }
        return true;
    }
    CompletedTaskFilter(todo){
        return todo.filter(item => item.isCompleted === '1')
    }
    NotCompletedTaskFilter(todo){
        return todo.filter(item => item.isCompleted === '0')
    }

    render() {
        if (!this.props.todos.length) {
            return <p className="tutorial">Create your first todo! :)</p>;
        }
        let todo = this.props.todos;
        let ViewProductList = null;
        if (search) {
            todo = todo.filter(function (item) {
                return (
                    item.task.toString().toLowerCase().replace(/\s/g, '').indexOf(search.toLowerCase().replace(/\s/g, '')) >= 0

                );
            });
        }
        if(this.state.completed==='1'){
            todo = this.CompletedTaskFilter(this.props.todos)
        }
        if(this.state.NotCompleted==='0'){
            todo = this.NotCompletedTaskFilter(this.props.todos)
        }
        dataLenght = todo.length;
        if (dataLenght>0) {
            ViewProductList = todo.map((c, index) => {
                return (
                    <TodosListItem
                        key={index}
                        {...c}
                        id={index}
                        toggleTask={this.props.toggleTask}
                        editTask={this.props.editTask}
                        deleteTask={this.props.deleteTask}
                    />
                )
            });
        } else{
            return (
                <p style={{textAlign: 'center', color: 'red'}}>No records found!</p>
            )
        }
        return (
            <div>
                <table id="customers">
                    <thead className="todo-table">
                        <tr className="TodoTR">
                            <th className="TodoTH1">Task Name</th>
                            <th className="TodoTH2">Status</th>
                            <th className="TodoTH3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ViewProductList}
                    </tbody>
                </table>
                <p>Displaying {dataLenght} records</p>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { search: state.todo.search,
        completed: state.todo.completed,
        NotCompleted: state.todo.NotCompleted
    };
};
export default connect(mapStateToProps)(TodosList);
