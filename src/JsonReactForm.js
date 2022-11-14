import React from "react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";

/**
 * JsonReactForm properties
 *
 * @typedef {object} JsonReactFormProperty
 * @property {Function} onChange - method to trigger a field has changed
 * @property {string} data - form data
 * @property {string} name - field name
 * @property {string} schema - schema definition using http://json-schema.org/ standard
 * @property {string} uiSchema - indicates how the form should be rendered
 */

/**
 * JsonReactForm component
 *
 * @param {JsonReactFormProperty} - - component properties
 * @returns {null|JsonSchemaReactForm} - rendered component or null
 * @class
 */
export default function JsonReactForm({
  data,
  onChange,
  name,
  schema,
  uiSchema,
}) {
  if (!schema) {
    return null;
  }

  return (
    <Form
      showErrorList={false}
      liveValidate={true}
      idPrefix={name}
      name={name}
      formData={data}
      schema={schema || {}}
      uiSchema={uiSchema || {}}
      onChange={onChange}
      validator={validator}
    >
      {/* This will prevent the "Submit" button to get rendered */}
      <br />
    </Form>
  );
}
