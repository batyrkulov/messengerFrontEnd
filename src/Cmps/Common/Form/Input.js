import React from "react";
import {FormFieldReaction} from "./FormFieldReaction";

export const Input = ({meta, input, ...restProps})=> {
    return <FormFieldReaction meta={meta}>
        <input {...input} {...restProps}/>
    </FormFieldReaction>
}