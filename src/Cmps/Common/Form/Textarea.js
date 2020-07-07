import React from "react";
import {FormFieldReaction} from "./FormFieldReaction";

export const Textarea = ({meta, input, ...restProps})=> {
    return <FormFieldReaction meta={meta}>
        <textarea {...input} {...restProps}/>
    </FormFieldReaction>
}