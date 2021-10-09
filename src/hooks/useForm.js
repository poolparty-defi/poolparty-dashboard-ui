import { useState } from 'react';

const defaultState = {
    inputs: {},
    errors: {}
}

/**
 * Removes an error from the errors object within the state
 * 
 * @param {string} id - The input id/key
 * @param {object} state - A copy of the state 
 * @param {function} setState - Callback to update the state
 */
const removeError = (id, state, setState) => {
    if (!!state.errors[id]) {
        delete state.errors[id];
        setState(state);
    }
}

/**
 * Validates the provided rules on a given input.
 * 
 * @param {string} id - The input id/key
 * @param {object} values - The input values
 * @param {object} state - A copy of the state
 * @param {function} setState - Callback to update the state
 * @returns true if all existing rules are passed, otherwise false
 */
const validate = (id, values, state, setState) => {
    const input = state.inputs[id];
    const rules = input.rules;

    if (!rules) return true;

    // check for required
    if (rules.hasOwnProperty("required")) {
        const isFunc = typeof rules.required.value === "function";
        let passed = false

        if (isFunc) {
            if (!rules.required.value(values)) {
                return true;
            }

            passed = !!values[id]
        }
        else {
            passed = !!rules.required.value && !!values[id]
        }


        if (passed) {
            removeError(id, state, setState);
        }
        else {
            state.errors[id] = rules.required.message ?? "This field is required.";
            setState(state);
            return false;
        }
    }

    // chcek for pattern
    if (rules.hasOwnProperty("pattern")) {
        const passed = rules.pattern.value.test(values[id]);

        if (passed) {
            removeError(id, state, setState);
        }
        else {
            state.errors[id] = rules.pattern.message ?? "Invalid format";
            setState(state);
            return false;
        }
    }

    // check for maxLength
    if (rules.hasOwnProperty("maxLength")) {
        const passed = rules.maxLength.value >= values[id].length;

        if (passed) {
            removeError(id, state, setState);
        }
        else {
            state.errors[id] = rules.maxLength.message ?? `Input value exceeds maximum length of ${rules.maxLength.value}`;
            return false;
        }
    }

    // check for minLength
    if (rules.hasOwnProperty("minLength")) {
        const passed = rules.minLength.value <= values[id].length;

        if (passed) {
            removeError(id, state, setState);
        }
        else {
            state.errors[id] = rules.minLength.message ?? `Input does not meet the minimum length of ${rules.minLength.value}`;
            return false;
        }
    }

    // check that the input matches another input
    if (rules.hasOwnProperty("matches")) {
        if (!state.inputs.hasOwnProperty(rules.matches.value)) {
            throw `Input with name of ${rules.matches.value} was not found to check against`
        }

        const passed = values[id] === values[rules.matches.value];

        if (passed) {
            removeError(id, state, setState);
        }
        else {
            state.errors[id] = rules.matches.message ?? `Input does not match ${rules.matches.value}`
            return false;
        }
    }

    return true;
}

/**
 * Extracts the values out of the initial inputs object to maintain the input value state
 * 
 * @returns An object containing the input values. The object properties/keys are the input name
 */
const extractInputValues = inputs => {
    const values = {}

    for (let key in inputs) {
        values[key] = inputs[key].value
    }

    return values
}

const useForm = inputs => {
    const [state, setState] = useState({ ...defaultState, inputs });

    const [values, setValues] = useState(extractInputValues(inputs));

    /**
     * Clears all of the input values
     */
    const clear = () => {
        setState({ ...defaultState, inputs });
        setValues(extractInputValues(inputs))
    }

    const onChange = e => {
        if (!e.target.name) {
            throw "Invalid input configuration - please provide the name attribute"
        }

        if (!values.hasOwnProperty(e.target.name)) {
            throw `Could not find input with name of ${e.target.name}`
        }

        let val = e.target.value

        if (state.inputs[e.target.name].hasOwnProperty("type")) {
            const type = state.inputs[e.target.name].type;
            
            if (type === "switch") {
                val = e.target.checked
            }

            if (type === "cc") {
                val = val.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
            }

            // if (type === "mm/yy") {
            //     val = val.replace(/[0-9]{3}/g, "$&\\")
            // }
        }

        setValues({...values, [e.target.name]: val})
    }

    const handleSubmit = (callback = Function()) => e => {
        e.preventDefault();

        const stateCopy = {...state}
        let invalid;
        for (let key in state.inputs) {
            if (!validate(key, values, stateCopy, setState)) {
                invalid = true;
            }
        }

        if (invalid) {
            return;
        }

        callback(values);
    }

    const onBlur = e => {
        if (!e.target.name) {
            throw "Invalid input configuration - please provide the name attribute"
        }

        if (!state.inputs.hasOwnProperty(e.target.name)) {
            throw `Could not find input with name of ${e.target.name}`
        }

        if (!state.inputs[e.target.name].hasOwnProperty("rules")) {
            return;
        }

        if (!state.errors.hasOwnProperty(e.target.name)) {
            return;
        }

        const stateCopy = {...state}

        validate(e.target.name, values, stateCopy, setState);
    }

    return {
        inputEvents: {
            onChange,
            onBlur
        },
        handleSubmit,
        clear,
        values,
        errors: state.errors
    }
}

export default useForm;