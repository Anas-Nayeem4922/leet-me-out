import CodeSubmissionComponent from "@/components/CodeSubmission";

export default async function CodeSubmission({
    params,
}: {
    params: Promise<{ submissionId: number }>;
}) {
    const submissionId = (await params).submissionId;
    return (
        <div>
            <CodeSubmissionComponent submissionId={submissionId} />
        </div>
    );
}
