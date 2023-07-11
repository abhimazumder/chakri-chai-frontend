 export const SampleJob = {
    JOB_ID: '650112',
    JOB_TITLE: 'Software Engineer - Entry Level',
    JOB_LOCATIONS: {
        "IN" : ['Pune', 'Bengaluru'],
        "ZA" : ['Cape Town']
    },
    JOB_FEATURES : {
        EMPLOYMENT_TYPE: 'Full Time',
        WORK_MODE: 'WFH',
        REQUIRED_EXPERIENCE: {
            RANGE: {
                MINIMUM: 1,
            },
            UNIT: 'Year'
        },
        OPENNINGS: 2,
        COMPENSATION: {
            RANGE: {
                MINIMUM: '100,000',
                // MAXIMUM: '150,000'
                MAXIMUM: '200,000'
            },
            CURRENCY: 'DOLLAR',
        },
    },
    SECTIONS: {
        "Job Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla tristique justo, a semper purus scelerisque eu. Nulla facilisi. Vivamus at felis ac elit luctus fermentum. Phasellus dignissim ante eget nunc hendrerit posuere. Mauris sed fermentum nisi. Nullam vulputate dolor nec lorem tristique cursus. Donec consectetur mi vel metus sagittis, ac malesuada odio varius.",
        "Requirements": "Fusce rhoncus vestibulum tortor, in finibus nulla ullamcorper ac. Nullam ut elit ut libero eleifend facilisis. Sed ultrices mauris nec metus ullamcorper, in commodo nunc lacinia. Nunc pulvinar dapibus diam, vitae rhoncus urna pulvinar eu. Morbi finibus fermentum mi, vitae dignissim libero semper id. Maecenas aliquam nibh ac ex vestibulum, id commodo tortor convallis.",
        "Role": "Make tea for other employess.",
        "Educaion": "10th pass",
        "Skills" : ['Git', 'HTML', 'CSS', 'JavaScript', 'Node.JS', 'React.JS']
        //Required at least one section with any name, predefined sections with option to add, DESCRIPTION and SKILLS
    },
    DEPARTMENT: "Engineering",
    POSTING_DATE: '12/10/22',
    APPLICATION_DEADLINE: '20/10/22',
};
