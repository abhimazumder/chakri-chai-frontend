const FromLayout = {

    "First Name": {
        SIZE: 6,
        FIELD_TYPE: "Textfield",
        FIELD_LABLE: "First Name",
        FIELD_ID: "form-field-1",
        FIELD_NAME: "First Name",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        ERROR: false,
        VALUE: ''
    },

    "Last Name": {
        SIZE: 6,
        FIELD_TYPE: "Textfield",
        FIELD_LABLE: "Last Name",
        FIELD_ID: "form-field-2",
        FIELD_NAME: "Last Name",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        ERROR: false,
        VALUE: ''
    },

    "Date of Birth": {
        SIZE: 6,
        FIELD_TYPE: "Date",
        FIELD_LABLE: "Date of Birth",
        FIELD_ID: "form-field-3",
        FIELD_NAME: "Date of Birth",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        ERROR: false,
        VALUE: ''
    },

    "Gender": {
        SIZE: 6,
        FIELD_TYPE: "Dropdown",
        FIELD_LABLE: "Gender",
        FIELD_ID: "form-field-4",
        FIELD_NAME: "Gender",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        OPTIONS: [
            { VALUE: "Select a option", ID: "Select a option", DISABLED: true },
            { VALUE: "Male", ID: "Male", DISABLED: false },
            { VALUE: "Female", ID: "Female", DISABLED: false },
            { VALUE: "Others", ID: "Others", DISABLED: false }
        ],
        ERROR: false,
        VALUE: ''
    },

    "E-mail": {
        SIZE: 6,
        FIELD_TYPE: "Email",
        FIELD_LABLE: "E-mail",
        FIELD_ID: "form-field-5",
        FIELD_NAME: "E-mail",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        ERROR: false,
        VALUE: ''
    },

    "Phone": {
        SIZE: 6,
        FIELD_TYPE: "Phone Number",
        FIELD_LABLE: "Phone",
        FIELD_ID: "form-field-6",
        FIELD_NAME: "Phone",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        ERROR: false,
        VALUE: ''
    },

    "Address": {
        FIELD_TYPE: "Address",
        FIELD_LABLE: "Address",
        FIELD_ID: "form-field-7",
        FIELD_NAME: "Address",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        SUB_FIELDS: {
            "Country": {
                SIZE: 6,
                FIELD_TYPE: "Dropdown",
                FIELD_LABLE: "Country",
                FIELD_ID: "form-field-7-a",
                FIELD_NAME: "Country",
                EXPANDABLE: false,
                REQUIRED: true,
                DISABLED: false,
                PARENT_FIELD_NAME: "Address",
                PARENT_FIELD_ID: "form-field-7",
                OPTIONS: [],
                ERROR: false,
                VALUE: ''
            },

            "State/Province": {
                SIZE: 6,
                FIELD_TYPE: "Dropdown",
                FIELD_LABLE: "State/Province",
                FIELD_ID: "form-field-7-b",
                FIELD_NAME: "State/Province",
                EXPANDABLE: false,
                REQUIRED: true,
                DISABLED: true,
                PARENT_FIELD_NAME: "Address",
                PARENT_FIELD_ID: "form-field-7",
                OPTIONS: [],
                ERROR: false,
                VALUE: ''
            },

            "City/Town": {
                SIZE: 6,
                FIELD_TYPE: "Textfield",
                FIELD_LABLE: "City/Town",
                FIELD_ID: "form-field-7-c",
                FIELD_NAME: "City/Town",
                EXPANDABLE: false,
                REQUIRED: true,
                DISABLED: false,
                PARENT_FIELD_NAME: "Address",
                PARENT_FIELD_ID: "form-field-7",
                ERROR: false,
                VALUE: ''
            },

            "Pincode": {
                SIZE: 6,
                FIELD_TYPE: "Number",
                FIELD_LABLE: "Pincode",
                FIELD_ID: "form-field-7-d",
                FIELD_NAME: "Pincode",
                EXPANDABLE: false,
                REQUIRED: true,
                DISABLED: false,
                PARENT_FIELD_NAME: "Address",
                PARENT_FIELD_ID: "form-field-7",
                ERROR: false,
                VALUE: ''
            },

            "Street Address": {
                SIZE: 12,
                FIELD_TYPE: "Textfield",
                FIELD_LABLE: "Street Address",
                FIELD_ID: "form-field-7-e",
                FIELD_NAME: "Street Address",
                EXPANDABLE: false,
                REQUIRED: true,
                DISABLED: false,
                PARENT_FIELD_NAME: "Address",
                PARENT_FIELD_ID: "form-field-7",
                ERROR: false,
                VALUE: ''
            },
        },
    },

    "Experience": {
        FIELD_TYPE: "Experience",
        FIELD_LABLE: "Experience",
        FIELD_ID: "form-field-8",
        FIELD_NAME: "Experience",
        EXPANDABLE: true,
        REQUIRED: false,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        SUB_FIELDS: {
            "Job Title/Role": {
                SIZE: 12,
                FIELD_TYPE: "Textfield",
                FIELD_LABLE: "Job Title/Role",
                FIELD_ID: "form-field-8-a",
                FIELD_NAME: "Job Title/Role",
                EXPANDABLE: false,
                REQUIRED: true,
                DISABLED: false,
                PARENT_FIELD_NAME: "Experience",
                PARENT_FIELD_ID: "form-field-8",
                ERROR: false,
                VALUE: ''
            },

            "Company Name": {
                SIZE: 12,
                FIELD_TYPE: "Textfield",
                FIELD_LABLE: "Company Name",
                FIELD_ID: "form-field-8-b",
                FIELD_NAME: "Company Name",
                EXPANDABLE: false,
                REQUIRED: true,
                DISABLED: false,
                PARENT_FIELD_NAME: "Experience",
                PARENT_FIELD_ID: "form-field-8",
                ERROR: false,
                VALUE: ''
            },

            "Current Job": {
                SIZE: 12,
                FIELD_TYPE: "Checkbox",
                FIELD_LABLE: "Is this your current job?",
                FIELD_ID: "form-field-8-c",
                FIELD_NAME: "Current Job",
                EXPANDABLE: false,
                REQUIRED: false,
                DISABLED: false,
                PARENT_FIELD_NAME: "Experience",
                PARENT_FIELD_ID: "form-field-8",
                ERROR: false,
                VALUE: ''
            },

            "Start Date": {
                SIZE: 6,
                FIELD_TYPE: "Datepicker",
                FIELD_LABLE: "Start Date",
                FIELD_ID: "form-field-8-d",
                FIELD_NAME: "Start Date",
                EXPANDABLE: false,
                REQUIRED: true,
                DISABLED: false,
                PARENT_FIELD_NAME: "Experience",
                PARENT_FIELD_ID: "form-field-8",
                ERROR: false,
                VALUE: ''
            },
            "End Date": {
                SIZE: 6,
                FIELD_TYPE: "Datepicker",
                FIELD_LABLE: "End Date",
                FIELD_ID: "form-field-8-e",
                FIELD_NAME: "End Date",
                EXPANDABLE: false,
                REQUIRED: true,
                PARENT_FIELD_NAME: "Experience",
                PARENT_FIELD_ID: "form-field-8",
                ERROR: false,
                VALUE: ''
            },
        },
        CHILDREN: [],
    },
    "Education": {
        FIELD_TYPE: "Education",
        FIELD_LABLE: "Education",
        FIELD_ID: "form-field-9",
        FIELD_NAME: "Education",
        EXPANDABLE: true,
        REQUIRED: false,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        SUB_FIELDS: {
            "Degree": {
                SIZE: 12,
                FIELD_TYPE: "Dropdown",
                FIELD_LABLE: "Degree",
                FIELD_ID: "form-field-9-a",
                FIELD_NAME: "Degree",
                EXPANDABLE: false,
                REQUIRED: true,
                DISABLED: false,
                PARENT_FIELD_NAME: "Experience",
                PARENT_FIELD_ID: "form-field-9",
                ERROR: false,
                VALUE: ''
            },

            "Specialization": {
                SIZE: 12,
                FIELD_TYPE: "Dropdown",
                FIELD_LABLE: "Specialization",
                FIELD_ID: "form-field-9-b",
                FIELD_NAME: "Specialization",
                EXPANDABLE: false,
                REQUIRED: true,
                DISABLED: false,
                PARENT_FIELD_NAME: "Experience",
                PARENT_FIELD_ID: "form-field-9",
                ERROR: false,
                VALUE: ''
            },

            "College/Universisty": {
                SIZE: 12,
                FIELD_TYPE: "Textfield",
                FIELD_LABLE: "College/University",
                FIELD_ID: "form-field-9-c",
                FIELD_NAME: "College/Universisty",
                EXPANDABLE: false,
                REQUIRED: true,
                DISABLED: false,
                PARENT_FIELD_NAME: "Experience",
                PARENT_FIELD_ID: "form-field-9",
                ERROR: false,
                VALUE: ''
            },

            "From": {
                SIZE: 6,
                FIELD_TYPE: "Datepicker",
                FIELD_LABLE: "From",
                FIELD_ID: "form-field-9-d",
                FIELD_NAME: "From",
                EXPANDABLE: false,
                REQUIRED: true,
                DISABLED: false,
                PARENT_FIELD_NAME: "Experience",
                PARENT_FIELD_ID: "form-field-9",
                ERROR: false,
                VALUE: ''
            },

            "To": {
                SIZE: 6,
                FIELD_TYPE: "Datepicker",
                FIELD_LABLE: "To",
                FIELD_ID: "form-field-9-e",
                FIELD_NAME: "To",
                EXPANDABLE: false,
                REQUIRED: true,
                DISABLED: false,
                PARENT_FIELD_NAME: "Experience",
                PARENT_FIELD_ID: "form-field-9",
                ERROR: false,
                VALUE: ''
            },
        },
        CHILDREN: [],
    },

    "Question 1": {
        SIZE: 12,
        FIELD_TYPE: "Dropdown",
        FIELD_LABLE: "Are you authorized to work in the country specified for this role?",
        FIELD_ID: "form-field-10",
        FIELD_NAME: "Question 1",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        OPTIONS: [
            { VALUE: "Select a option", ID: "Select a option", DISABLED: true },
            { VALUE: "Yes", ID: "Yes", DISABLED: false },
            { VALUE: "No", ID: "No", DISABLED: false },
            { VALUE: "Not sure", ID: "Not sure", DISABLED: false }
        ]
        ,
        ERROR: false,
        VALUE: ''
    },

    "Question 2": {
        SIZE: 12,
        FIELD_TYPE: "Dropdown",
        FIELD_LABLE: "How did you find out about this job?",
        FIELD_ID: "form-field-11",
        FIELD_NAME: "Question 2",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        OPTIONS: [
            { VALUE: "Select a option", ID: "Select a option", DISABLED: true },
            { VALUE: "Social Media", ID: "Social Media", DISABLED: false },
            { VALUE: "Job Board", ID: "Job Board", DISABLED: false },
            { VALUE: "Employee Referral", ID: "Employee Referral", DISABLED: false }
        ]
        ,
        ERROR: false,
        VALUE: ''
    },

    "Question 3": {
        SIZE: 12,
        FIELD_TYPE: "Dropdown",
        FIELD_LABLE: "Are you subject to a notice period at your current employer?",
        FIELD_ID: "form-field-12",
        FIELD_NAME: "Question 3",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        OPTIONS: [
            { VALUE: "Select a option", ID: "Select a option", DISABLED: true },
            { VALUE: "Yes", ID: "Yes", DISABLED: false },
            { VALUE: "No", ID: "No", DISABLED: false },
            { VALUE: "Not sure", ID: "Not sure", DISABLED: false }
        ]
        ,
        ERROR: false,
        VALUE: ''
    },

    "Question 4": {
        SIZE: 12,
        FIELD_TYPE: "Number",
        FIELD_LABLE: "Mention your notice period in number of days",
        FIELD_ID: "form-field-13",
        FIELD_NAME: "Question 4",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        ERROR: false,
        VALUE: ''
    },

    "Question 5": {
        SIZE: 12,
        FIELD_TYPE: "Dropdown",
        FIELD_LABLE: "Are you subject to any prior or existing agreements which would limit, restrict, or prevent you from performing the duties of the position for which you have applied, such as a non-solicitation or a non-competition agreement?",
        FIELD_ID: "form-field-14",
        FIELD_NAME: "Question 5",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        OPTIONS: [
            { VALUE: "Select a option", ID: "Select a option", DISABLED: true },
            { VALUE: "Yes", ID: "Yes", DISABLED: false },
            { VALUE: "No", ID: "No", DISABLED: false },
            { VALUE: "Not sure", ID: "Not sure", DISABLED: false }
        ]
        ,
        ERROR: false,
        VALUE: ''
    },

    "Resume/CV": {
        SIZE: 12,
        FIELD_TYPE: "Attachment",
        FIELD_LABLE: "Drop your Resume/CV here",
        FIELD_ID: "form-field-15",
        FIELD_NAME: "Resume/CV",
        EXPANDABLE: false,
        REQUIRED: true,
        DISABLED: false,
        PARENT_FIELD_NAME: null,
        PARENT_FIELD_ID: null,
        ERROR: false,
        VALUE: ''
    }
}

export default FromLayout;