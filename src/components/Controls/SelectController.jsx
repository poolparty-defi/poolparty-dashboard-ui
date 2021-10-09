import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@material-ui/core";

export const SelectController = props => {
    const {errors, options, name, label, variant, className} = props;

    const propsCopy = {...props};
    delete propsCopy.errors;
    delete propsCopy.helperText;
    delete propsCopy.options;
    delete propsCopy.name;
    delete propsCopy.label;
    delete propsCopy.variant;
    delete propsCopy.className;

    return (
        <FormControl variant={variant} className={className} error={!!errors[name]} fullWidth={propsCopy.fullWidth}>
            {label && <InputLabel id={`${label}-label`}>{label}</InputLabel>}
            <Select
                {...propsCopy}
                name={name}
                labelId={label ? `${label}-label` : undefined}
                label={label}
            >
                {options}
            </Select>

            {!!errors[name] && <FormHelperText>{errors[name]}</FormHelperText>}
        </FormControl>
    );
}