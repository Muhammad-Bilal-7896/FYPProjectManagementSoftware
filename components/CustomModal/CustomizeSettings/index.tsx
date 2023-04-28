import { useState } from "react";

import {
    Box,
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    Switch
} from "@mui/material";
import { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    // border: "1px solid #E5E5E5",
    marginLeft: "1.5px",
    alignItems: "center",
    width: "100%",
    '& .MuiFormControlLabel-label': {
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(1),
        fontSize: "18px",
        fontWeight: theme.typography.fontWeightLight,
        color: theme.palette.text.primary,
    },
}));

import styles from "./style.module.css";

interface CustomizeSettingsProps {
    widgetsList: any;
    setWidgetsList: any;
}

const CustomizeSettings: React.FC<CustomizeSettingsProps> = ({
    widgetsList,
    setWidgetsList,
}) => {

    const toggleWidgetVisibility = (id: any) => {
        setWidgetsList((widgetsList: any) =>
            widgetsList.map((widget: any) =>
                widget.id === id
                    ? { ...widget, isVisible: !widget.isVisible }
                    : widget
            )
        );
    };

    return (
        <div className={styles.modalBody}>
            <h6 className="font-light leading-6">Customize the background and the widgets you want to see on your Dashboard.</h6>
            <FormControl component="fieldset" variant="standard"
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <FormLabel component="legend">
                    Choose the widgets that you wanna show at dashboard
                </FormLabel>
                <FormGroup
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    }}
                >
                    {widgetsList.map((widget: any, index: number) => (
                        <CustomFormControlLabel
                            key={index}
                            control={
                                <IOSSwitch
                                    checked={widget.isVisible}
                                    onChange={() => toggleWidgetVisibility(widget.id)}
                                />
                            }
                            label={widget.name}
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </div>
    )
}
export default CustomizeSettings;