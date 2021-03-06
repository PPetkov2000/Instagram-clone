import React from "react";
import { Form } from "react-bootstrap";

function EditProfileFormGroup({
  labelText,
  fieldType,
  fieldValue,
  handleChange,
}) {
  return (
    <Form.Group controlId={labelText} className="edit-profile__form-group">
      <Form.Label className="edit-profile__form-group-label">
        {labelText}
      </Form.Label>
      <Form.Control
        type={fieldType}
        placeholder={labelText}
        defaultValue={fieldValue}
        className="edit-profile__form-group-field"
        onChange={handleChange}
      />
    </Form.Group>
  );
}

export default EditProfileFormGroup;
