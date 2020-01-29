var tasks = [];
var dialog, task_id = 0, delete_dialog;

$(function () {
    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        width: 350,
        modal: true,
        buttons: {
            "Save": function() {
                if (task_id > 0) {
                    editTask();
                } else {
                    addTask();
                }
            },
            Cancel: function () {
                dialog.dialog("close");
            }
        },
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    delete_dialog = $("#dialog-confirm").dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Delete": deleteTask,
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    var form,
        name = $('#name'),
        description = $('#description'),
        deadline = $('#deadline'),
        priority = $('#priority'),
        allFields = $([]).add(name).add(description).add(deadline).add(priority),
        tips = $('.validateTips');

    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        addUser();
    });

    function updateTips(t) {
        tips.text(t).addClass("ui-state-highlight");
        setTimeout(function () {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkRegexp(o, regexp, n) {
        if (!(regexp.test(o.val()))) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }

    function addTask() {
        var valid = true;
        allFields.removeClass( "ui-state-error" );

        valid = valid && checkRegexp(name, /^[a-z]([0-9a-z_\s])+$/i, "Task name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        valid = valid && checkRegexp(description, /([^\s])/, "Task description may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        valid = valid && checkRegexp(deadline, /^\d{4}-\d{2}-\d{2}$/, "Deadline must be valid format : dd/mm/yyyy" );

        if (valid) {
            tasks.push({
                id: getMaxID(),
                name: name.val(),
                description: description.val(),
                deadline: deadline.val(),
                priority: priority.val()
            });
            dialog.dialog('close');

            refreshList();
        }
    }

    function editTask() {
        var valid = true;
        allFields.removeClass( "ui-state-error" );

        valid = valid && checkRegexp(name, /^[a-z]([0-9a-z_\s])+$/i, "Task name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        valid = valid && checkRegexp(description, /([^\s])/, "Task description may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        valid = valid && checkRegexp(deadline, /^\d{4}-\d{2}-\d{2}$/, "Deadline must be valid format : dd/mm/yyyy" );

        if (valid) {
            var index = tasks.findIndex(task => task.id == task_id);
            tasks[index] = {
                id: tasks[index].id,
                name: name.val(),
                description: description.val(),
                deadline: deadline.val(),
                priority: priority.val()
            };
            dialog.dialog('close');

            refreshList();
        }
    }

    function deleteTask() {
        var index = tasks.findIndex(task => task.id == task_id);
        tasks.splice(index, 1);
        delete_dialog.dialog('close');
        refreshList();
    }
});

function getMaxID() {
    var id = 0;
    tasks.forEach(task => {
        if (id <= task.id) {
            id = task.id;
        }
    });
    return id + 1;
}

function refreshList() {
    $('#task_list').html('');
    tasks.forEach((task, i) => {
        $('#task_list').append(`
            <tr>
                <td>${i + 1}</td>
                <td>${task.name}</td>
                <td>${task.description}</td>
                <td>${task.deadline}</td>
                <td>${task.priority}</td>
                <td><button class="ui-button ui-corner-all ui-widget" onclick="onEditTask(${task.id})">Edit</button></td>
                <td><button class="ui-button ui-corner-all ui-widget" onclick="onDeleteTask(${task.id})">Delete</button></td>
            </tr>
        `);
    });
}

function onAddTask() {
    task_id = 0;
    dialog.dialog('open');
}

function onEditTask(id) {
    var task = tasks.find(task => task.id == id);
    task_id = id;
    
    $('#name').val(task.name);
    $('#description').val(task.description);
    $('#deadline').val(task.deadline);
    $('#priority').val(task.priority);
    dialog.dialog('open');
}

function onDeleteTask(id) {
    task_id = id;
    delete_dialog.dialog('open');
}