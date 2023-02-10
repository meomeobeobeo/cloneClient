import {createSlice} from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name: "project",
    initialState: {
        id: "108218",
        name: "singularity 1.0",
        url: "https://www.atlassian.com/software/jira",
        description:
            "Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.",
        category: "software",
        createdAt: "2023-02-01T04:46:12.249Z",
        updatedAt: "2023-02-01T04:46:12.249Z",
        issues: [
            {
                id: "881751",
                title:
                    "You can track how many hours were spent working on an issue, and how many hours remain.",
                type: "task",
                status: "inprogress",
                priority: "1",
                listPosition: 7,
                createdAt: "2023-02-01T04:46:12.349Z",
                updatedAt: "2023-02-01T04:46:12.349Z",
                userIds: [],
            },
            {
                id: "881744",
                title: "This is an issue of type: Task.",
                type: "bug",
                status: "backlog",
                priority: "4",
                listPosition: 1,
                createdAt: "2023-02-01T04:46:12.292Z",
                updatedAt: "2023-02-01T04:46:12.292Z",
                userIds: ["325392"],
            },
            {
                id: "881745",
                title: "Click on an issue to see what's behind it.",
                type: "task",
                status: "backlog",
                priority: "2",
                listPosition: 2,
                createdAt: "2023-02-01T04:46:12.292Z",
                updatedAt: "2023-02-01T04:46:12.292Z",
                userIds: ["325392"],
            },
            {
                id: "881746",
                title:
                    "Try dragging issues to different columns to transition their status.",
                type: "story",
                status: "backlog",
                priority: "3",
                listPosition: 3,
                createdAt: "2023-02-01T04:46:12.292Z",
                updatedAt: "2023-02-01T04:46:12.292Z",
                userIds: [],
            },
            {
                id: "881747",
                title: "Each issue can be assigned priority from lowest to highest.",
                type: "task",
                status: "selected",
                priority: "5",
                listPosition: 5,
                createdAt: "2023-02-01T04:46:12.334Z",
                updatedAt: "2023-02-01T04:46:12.334Z",
                userIds: [],
            },
            {
                id: "881748",
                title: "You can use rich text with images in issue descriptions.",
                type: "story",
                status: "backlog",
                priority: "1",
                listPosition: 4,
                createdAt: "2023-02-01T04:46:12.332Z",
                updatedAt: "2023-02-01T04:46:12.332Z",
                userIds: ["325390"],
            },
            {
                id: "881749",
                title:
                    "Each issue has a single reporter but can have multiple assignees.",
                type: "story",
                status: "selected",
                priority: "4",
                listPosition: 6,
                createdAt: "2023-02-01T04:46:12.340Z",
                updatedAt: "2023-02-01T04:46:12.340Z",
                userIds: ["325390", "325391"],
            },
            {
                id: "881750",
                title: "Try leaving a comment on this issue.",
                type: "task",
                status: "done",
                priority: "3",
                listPosition: 7,
                createdAt: "2023-02-01T04:46:12.345Z",
                updatedAt: "2023-02-01T04:46:12.345Z",
                userIds: ["325391"],
            },
        ],


        reducers: {},
        extraReducers: {}
    }
});
