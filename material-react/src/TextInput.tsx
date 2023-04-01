import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

const WrapForm = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    width: "95%",
    margin: `${theme.spacing(0)} auto`
}));
export const TextInput = (props: any) => {
    const {
        handleSend,
        loading,
    } = props;

    const [text, setText] = useState<string>("");

    return (
        <WrapForm>
            <TextField
                id="standard-text"
                label="Text Input"
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleSend(text);
                        setText('');
                    }
                }}
            />
            <LoadingButton
                loading={loading}
                variant="contained"
                color="primary"
                disabled={!text}
                onClick={() => {
                    handleSend(text);
                    setText('');
                }}
            >
                <SendIcon />
            </LoadingButton>
        </WrapForm>
    )
}



