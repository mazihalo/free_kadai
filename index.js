const fs = require('fs-extra');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');

const loadTasks = () => {
  try {
    return fs.readJsonSync(filePath);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  fs.writeJsonSync(filePath, tasks);
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task, completed: false });
  saveTasks(tasks);
  console.log(`タスク "${task}" を追加しました。`);
};

const listTasks = () => {
  const tasks = loadTasks();
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.task} - ${task.completed ? "完了" : "未完了"}`);
  });
};

const completeTask = (index) => {
  const tasks = loadTasks();
  if (index < 1 || index > tasks.length) {
    console.log("無効なインデックスです。");
    return;
  }
  tasks[index - 1].completed = true;
  saveTasks(tasks);
  console.log(`タスク "${tasks[index - 1].task}" を完了しました。`);
};

const deleteTask = (index) => {
  const tasks = loadTasks();
  if (index < 1 || index > tasks.length) {
    console.log("無効なインデックスです。");
    return;
  }
  const [removed] = tasks.splice(index - 1, 1);
  saveTasks(tasks);
  console.log(`タスク "${removed.task}" を削除しました。`);
};

const [,, command, ...args] = process.argv;

switch (command) {
  case 'add':
    addTask(args.join(' '));
    break;
  case 'list':
    listTasks();
    break;
  case 'complete':
    completeTask(parseInt(args[0], 10));
    break;
  case 'delete':
    deleteTask(parseInt(args[0], 10));
    break;
  default:
    console.log('使用方法: add <タスク内容> | list | complete <番号> | delete <番号>');
}
