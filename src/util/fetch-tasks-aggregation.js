export default function fetchTaskAggregation(userId, taskId) {
    return [
        {
            '$match': {
                '_id.user_id': String(userId), 
                '_id.task_id': Number(taskId)
            }
        },
        {
            '$graphLookup': {
                from: 'Tasks', 
                startWith: '$_id.task_id', 
                connectFromField: '_id.task_id', 
                connectToField: 'task_parent_id', 
                as: 'subtasks'
                // TODO maxDepth?
            }
        },
        {
            '$project': {
                tasks: {
                    '$concatArrays': [
                        [
                            {
                                task_parent_id: '$task_parent_id', 
                                task_title: '$task_title', 
                                task_desc: '$task_desc', 
                                _id: '$_id', 
                                task_completed: '$task_completed'
                            }
                        ],
                        '$subtasks'
                    ]
                }
            }
        },
        {
            '$unwind': '$tasks'
        },
        {
            '$sort': {
                'tasks.task_parent_id': 1, 
                'tasks._id.task_id': 1
            }
        },
        {
            '$replaceRoot': {
                newRoot: '$tasks'
            }
        }
    ];
}
