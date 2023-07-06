import { Container } from "@mui/material"
import JobBrief from "./JobBrief"
import JobFields from "./JobFields"

const JobFormIndex = () => {
    return (
        <>
            <Container style={{marginTop:100}}>
                <JobBrief/>
                <div style={{ marginTop: '20px' }} />
                <JobFields suppressHydrationWarning/>
            </Container>
        </>
    )
}

export default JobFormIndex