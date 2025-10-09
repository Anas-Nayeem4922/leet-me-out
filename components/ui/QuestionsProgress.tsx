import { Check } from "lucide-react";

interface QuestionsData {
    easy: {
        solved: number;
        total: number;
    };
    medium: {
        solved: number;
        total: number;
    };
    hard: {
        solved: number;
        total: number;
    };
}

interface QuestionsProgressProps {
    data: QuestionsData;
}

const QuestionsProgress = ({ data }: QuestionsProgressProps) => {
    const totalSolved =
        data.easy.solved + data.medium.solved + data.hard.solved;
    const totalQuestions =
        data.easy.total + data.medium.total + data.hard.total;

    // 240 degree arc configuration
    const totalDegrees = 240;
    const startAngle = 150; // Start from bottom-left

    const radius = 90;
    const strokeWidth = 6;

    // Calculate completion ratios
    const easyRatio = data.easy.solved / data.easy.total;
    const mediumRatio = data.medium.solved / data.medium.total;
    const hardRatio = data.hard.solved / data.hard.total;

    // Calculate proportional degrees for each section
    const easyDegrees = (data.easy.total / totalQuestions) * totalDegrees;
    const mediumDegrees = (data.medium.total / totalQuestions) * totalDegrees;
    const hardDegrees = (data.hard.total / totalQuestions) * totalDegrees;

    // Helper function to create arc path
    const createArc = (startDeg: number, endDeg: number) => {
        const startRad = (startDeg * Math.PI) / 180;
        const endRad = (endDeg * Math.PI) / 180;

        const x1 = 100 + radius * Math.cos(startRad);
        const y1 = 100 + radius * Math.sin(startRad);
        const x2 = 100 + radius * Math.cos(endRad);
        const y2 = 100 + radius * Math.sin(endRad);

        const largeArcFlag = endDeg - startDeg > 180 ? 1 : 0;

        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
    };

    // Easy section
    const easyStart = startAngle;
    const easyEnd = easyStart + easyDegrees;
    const easyBackgroundPath = createArc(easyStart, easyEnd);
    const easyProgressEnd = easyStart + easyDegrees * easyRatio;
    const easyProgressPath = createArc(easyStart, easyProgressEnd);

    // Medium section
    const mediumStart = easyEnd;
    const mediumEnd = mediumStart + mediumDegrees;
    const mediumBackgroundPath = createArc(mediumStart, mediumEnd);
    const mediumProgressEnd = mediumStart + mediumDegrees * mediumRatio;
    const mediumProgressPath = createArc(mediumStart, mediumProgressEnd);

    // Hard section
    const hardStart = mediumEnd;
    const hardEnd = hardStart + hardDegrees;
    const hardBackgroundPath = createArc(hardStart, hardEnd);
    const hardProgressEnd = hardStart + hardDegrees * hardRatio;
    const hardProgressPath = createArc(hardStart, hardProgressEnd);

    return (
        <div className='flex items-center justify-center gap-8 p-8 bg-dark-gray rounded-lg shadow-xl/30'>
            {/* Circular Progress Chart */}
            <div className='relative'>
                <svg width='200' height='180' viewBox='0 0 200 200'>
                    {/* Easy Section */}
                    <path
                        d={easyBackgroundPath}
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={strokeWidth}
                        strokeLinecap='round'
                        className='text-green-text/30'
                    />
                    <path
                        d={easyProgressPath}
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={strokeWidth}
                        strokeLinecap='round'
                        className='text-green-text'
                    />

                    {/* Medium Section */}
                    <path
                        d={mediumBackgroundPath}
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={strokeWidth}
                        strokeLinecap='round'
                        className='text-yellow-500/30'
                    />
                    <path
                        d={mediumProgressPath}
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={strokeWidth}
                        strokeLinecap='round'
                        className='text-yellow-500'
                    />

                    {/* Hard Section */}
                    <path
                        d={hardBackgroundPath}
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={strokeWidth}
                        strokeLinecap='round'
                        className='text-red-text/30'
                    />
                    <path
                        d={hardProgressPath}
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={strokeWidth}
                        strokeLinecap='round'
                        className='text-red-text'
                    />
                </svg>

                {/* Center Content */}
                <div className='absolute inset-0 flex flex-col items-center justify-center pt-8'>
                    <div className='text-5xl font-bold text-white'>
                        {totalSolved}
                        <span className='text-2xl text-white'>
                            /{totalQuestions}
                        </span>
                    </div>
                    <div className='flex items-center gap-1.5 text-sm text-white mt-1'>
                        <Check className='w-4 h-4 text-green-500' />
                        <span>Solved</span>
                    </div>
                </div>
            </div>

            {/* Difficulty Stats */}
            <div className='flex flex-col gap-3'>
                <div className='bg-gray py-1 rounded-md px-10'>
                    <div className='text-green-text text-sm font-medium mb-1 text-center'>
                        Easy
                    </div>
                    <div className='text-sm font-bold text-white text-center'>
                        {data.easy.solved}/{data.easy.total}
                    </div>
                </div>

                <div className='bg-gray py-1 rounded-md px-10'>
                    <div className='text-yellow-text text-sm font-medium mb-1 text-center'>
                        Med.
                    </div>
                    <div className='text-sm font-bold text-white text-center'>
                        {data.medium.solved}/{data.medium.total}
                    </div>
                </div>

                <div className='bg-gray py-1 rounded-md px-10'>
                    <div className='text-red-text text-sm font-medium mb-1 text-center'>
                        Hard
                    </div>
                    <div className='text-sm font-bold text-white text-center'>
                        {data.hard.solved}/{data.hard.total}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionsProgress;
