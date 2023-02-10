import {v4 as uuidv4} from "uuid";

export const data = [
    {
        id: '1',
        issue_type: "task",
        short_summary: "task 1",
        assigness: "hihi",
        description: "this is the task",
        priority: "medium",
        reporter: "law",
    },
    {
        id: '2',
        issue_type: "story",
        short_summary: "task 2",
        assigness: "hihi",
        description: "this is the task",
        priority: "medium",
        reporter: "law",
    },
    {
        id: '3',
        issue_type: "task",
        short_summary: "task 3",
        assigness: "hihi",
        description: "this is the task",
        priority: "medium",
        reporter: "law",

        // Priority: 'Low',

    },
    {
        id: '4',

        issue_type: "bug",
        short_summary: "task 4",
        assigness: "hihi",
        description: "this is the task",
        priority: "low",
        reporter: "law",
    },
    {
        id: '5',
        issue_type: "task",
        short_summary: "task 5",
        assigness: "hihi",
        description: "this is the task",
        priority: "high",
        reporter: "law",
    },
    {
        id: '6',
        issue_type: "task",
        short_summary: "task 6",
        assigness: "hihi",
        description: "this is the task",
        priority: "high",
        reporter: "law",
    },

];

export const columnsFromBackend = {
    [uuidv4()]: {
        title: "Backlog",
        items: data,
    },
    [uuidv4()]: {
        title: "Selected for development",
        items: [],
    },
    [uuidv4()]: {
        title: "In progress",
        items: [],
    },
    [uuidv4()]: {
        title: "DONE",
        items: [],
    },
};
