
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from "react-redux";
import { scoreState, postNewScore } from '../lib/slices/scoreSlice'
import { TextField } from 'mui-rff';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import validator from 'validator'
const formFields = [
    {
        field: (
            <TextField
                label="Full Name"
                name="fullName"
                margin="none"
                required={true}
            />
        ),
    },
    {
        field: (
            <TextField
                label="Phone Number"
                name="phoneNumber"
                margin="none"
                required={true}
            />
        ),
    }
]

const validateScorePost = (values: { fullName: string; phoneNumber: string; score: number }) => {
    const errors: { fullName: string; phoneNumber: string; score: string } = {
        fullName: '',
        phoneNumber: '',
        score: '',
    };
    if (!values.score || validator.isEmpty(values.score.toString())) {
        errors.score = 'Required';
    }
    if (!values.fullName || validator.isEmpty(values.fullName)) {
        errors.fullName = 'Required';
    }
    if (!values.phoneNumber || !validator.isMobilePhone(values.phoneNumber)) {
        errors.phoneNumber = "Invalid mobile phone number"
    }
    if (!values.phoneNumber || validator.isEmpty(values.phoneNumber)) {
        errors.phoneNumber = 'Required';
    }
    return errors;
};


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function GameOverForm() {
    const { score } = useSelector(scoreState);

    const classes = useStyles();
    const dispatch = useDispatch()
    const onSubmit = async (values: any) => {
        console.log(values);
        validateScorePost(values)
        await dispatch(postNewScore(values))
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Your Score: {score}
                </Typography>
                <Typography component="h1" variant="h5">
                    Save Score
                </Typography>
                <Form
                    onSubmit={() => onSubmit}
                    initialValues={{ fullName: '', phoneNumber: '', score: score.toString() }}
                    validate={validateScorePost}
                    render={({ handleSubmit, values }) => (
                        <form onSubmit={handleSubmit} noValidate>

                            <Grid container alignItems="flex-start" spacing={2}>
                                {formFields.map((item, idx) => (
                                    <Grid xs={12} item key={idx}>
                                        {item.field}
                                    </Grid>
                                ))}
                               

                                <Grid xs={12} item>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        onClick={() => { onSubmit(values) }}
                                    >
                                        Submit
                                    </Button>
                                    <br />
                                </Grid>
                            </Grid>
                            <br />
                        </form>
                    )}
                />
            </div>
            <style jsx>{`
                form {
                    margin: 0 auto;
                    background:#ffffffd6;
                    padding: 10px;
                    border-radius: 12px;
                }
            `}</style>
        </Container>
    );
}