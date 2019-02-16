import React from "react";
var IsCompleted = false;
export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            taskStatus: "",
            status: ""
        };
    }

    renderActionSection() {
        if (this.state.isEditing) {
            return (
                <td className="TodoTH3">
                    <button onClick={this.editTask.bind(this)}>Save</button>
                    <button className="cancel-btn" onClick={this.setEditState.bind(this, false)}>Cancel</button>
                </td>
            );
        }
        return (
            <td className="TodoTH3">
                <button onClick={this.setEditState.bind(this, true)}>Edit</button>
                <button className="delete-btn" onClick={this.deleteTask.bind(this)}>Delete</button>
            </td>
        );
    }

    renderTask() {
        const { task, isCompleted } = this.props;
        const taskStyle = {
            cursor: "pointer"
        };
        IsCompleted = isCompleted;

        if (this.state.isEditing) {
            return (
                <td>
                    <form onSubmit={this.editTask.bind(this)}>
                        <input ref="task" defaultValue={task} autoFocus />
                    </form>
                </td>
            );
        }

        return (
            <td className="TodoTH1" style={taskStyle}>{task}</td>
        );
    }
    ChangeTaskStatus(e) {
        const { value } = e.target;
        IsCompleted = value
        console.log(IsCompleted, 'is')
        // this.setState({status: value})
    }
    ChangeStatus() {
        const { isCompleted } = this.props;
        if (this.state.isEditing) {
            return (
                <td>
                    <select className="select-style" onChange={(e) => this.ChangeTaskStatus(e)}
                    >
                        <option disabled value="">Change Status</option>
                        <option value='1'>Completed</option>
                        <option value='0'>Active</option>
                    </select>
                </td>
            )
        }
        return (
            <td className="TodoTH2"><span className={(isCompleted === '1' ? "taskStatus" : "not-taskStatus")}>{isCompleted === '1' ? "Completed" : "Active"}</span></td>
        );
    }

    render() {
        // const { isCompleted } = this.props;
        return (
            <tr >
                {this.renderTask()}
                {this.ChangeStatus()}
                {this.renderActionSection()}
            </tr>
        )
    }

    setEditState(isEditing) {
        this.setState({
            isEditing
        });
    }

    toggleTask() {
        this.props.toggleTask(this.props.id);
    }

    editTask(e) {
        this.props.editTask(this.props.id, this.refs.task.value, IsCompleted);
        this.setState({
            isEditing: false
        });
        e.preventDefault();
    }

    deleteTask() {
        this.props.deleteTask(this.props.id);
    }
}
