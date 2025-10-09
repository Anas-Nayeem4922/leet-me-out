import axios from "axios";

export async function getProblems() {
    const response = await axios.get(
        process.env.NEXT_PUBLIC_PROBLEM_URL || "http://localhost:3001"
    );
    return response.data.p;
}

export const totalEasy = 1;
export const totalMedium = 4;
export const totalHard = 1;
