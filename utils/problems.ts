import axios from "axios";

export async function getProblems() {
    const response = await axios.get(
        process.env.PROBLEM_URL || "http://localhost:3001"
    );
    return response.data.p;
}
