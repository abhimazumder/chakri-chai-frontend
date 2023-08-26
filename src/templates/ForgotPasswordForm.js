const ForgotPasswordFormLayout = {

    "Email Address": {
        SIZE: 12,
        FIELD_TYPE: "EmailField",
        FIELD_LABEL: "Email Address",
        FIELD_ID: "form-field-1",
        FIELD_NAME: "Email Address",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        ERROR: false,
        VALUE: '',
    },

    "OTP": {
        SIZE: 12,
        FIELD_TYPE: "OTP",
        FIELD_LABEL: "Enter the OTP",
        FIELD_ID: "form-field-2",
        FIELD_NAME: "OTP",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: true,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        ERROR: false,
        VALUE: '',
    },
}

export default ForgotPasswordFormLayout;