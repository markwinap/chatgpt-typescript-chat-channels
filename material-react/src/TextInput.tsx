import React, { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button'
import { createMakeAndWithStyles } from 'tss-react';

export const { makeStyles, withStyles } = createMakeAndWithStyles({
    useTheme,
});

const useStyles = makeStyles()((theme) => ({
    wrapForm: {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText: {
        width: "100%"
    },
    button: {
        //margin: theme.spacing(1),
    },
}));

export const TextInput = (props: any) => {
    const {
        handleSend,
        loading,
    } = props;

    const [text, setText] = useState<string>("");

    const classes = useStyles().classes;
    return (
        <>
            <form className={classes.wrapForm} noValidate autoComplete="off">
                <TextField
                    id="standard-text"
                    label="Text Input"
                    className={classes.wrapText}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSend(text);
                            setText('');
                        }
                    }}
                //margin="normal"
                />
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={!text}
                    onClick={() => {
                        handleSend(text);
                        setText('');
                    }}
                >
                    <SendIcon />
                </LoadingButton>
            </form>
        </>
    )
}



