import axios from "axios";

let p: any[] = [];

export async function getProblems() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await axios.get(`${baseUrl}/api/getAllProblems`);
    const prob = response.data.problems;
    const problems = prob.map((p: any) => ({
        id: p.id,
        ...p.problem,
    }));
    p = problems;
    return problems;
}
