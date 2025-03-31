
export interface QuestionListProps {
    subject: string;
    class: string;
    questions_approved: number;
    questions_pending: number;
    updatedAt: string;
    id: number;

}

export const dummyQuestionList: QuestionListProps[] = [
    {
        subject: "Mathematics",
        class: "SS1",
        questions_approved: 44,
        questions_pending: 23,
        updatedAt: "23/03/2025",
        id: 1,
    },
    {
        subject: "Physics",
        class: "SS3",
        questions_approved: 32,
        questions_pending: 13,
        updatedAt: "15/03/2025",
        id: 2,
    },
    {
        subject: "Mathematics",
        class: "JSS1",
        questions_approved: 24,
        questions_pending: 35,
        updatedAt: "23/03/2025",
        id: 3,
    },
    {
        subject: "Biology",
        class: "SS2",
        questions_approved: 44,
        questions_pending: 23,
        updatedAt: "10/02/2025",
        id: 4
    },
]