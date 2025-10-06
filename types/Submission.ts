export interface SubmissionParameters {
    language_id: number;
    source_code: string;
    stdin: string;
    expected_output: string;
    cpu_time_limit: number;
}

export interface SubmissionDetails {
    expected_output: string;
    stdout: string;
    compile_output: string;
    stderr: string;
    status: string;
}
