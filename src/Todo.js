import { useContext, useState } from "react"
import contextTodo from './cotext';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import BrushIcon from '@mui/icons-material/Brush';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function Todo({ todo }) {
    const currentTodos = useContext(contextTodo)
    const [open, setOpen] = useState(false);
    const handleClickOpen = (id) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div className="todo">
                <ButtonGroup size="medium" variant="outlined" aria-label="Basic button group">
                    <Button variant="outlined" color="error" onClick={() => currentTodos.deleteTodo(todo.id)} startIcon={<DeleteIcon />} />
                    <Button variant="outlined" onClick={handleClickOpen} startIcon={<BrushIcon />} />
                    <Button variant={todo.isFinished ? "contained" : "outlined"} style={{ background: (todo.isFinished ? "" : "white") }} color="success" startIcon={<CheckIcon />}
                        onClick={() => currentTodos.toogleFinishTodo(todo.id)} />
                </ButtonGroup>
                <h3>{todo.title}</h3>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const task = formJson.task;
                        if (task)
                            currentTodos.updateTodo(todo.id , task)
                            
                        handleClose();
                    },
                }}
            >
                <DialogContent  style={{ width: "40vw" , padding : "30px"  }}>
                    <DialogContentText>
                        <h1>
                            update this todo
                        </h1>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="task"
                        label="UPDATE THE TODO TITLE"
                        type="text"
                        fullWidth
                        variant="standard"
                       
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ background: "gray", color: "white" }} >Cancel</Button>
                    <Button type="submit" variant="contained" color="success" >Confirm</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}