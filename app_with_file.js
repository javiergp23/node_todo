import {createInterface} from 'readline';
import chalk from 'chalk';
import {readFileSync, writeFileSync} from 'fs';

const tasks = [];
const DB_FILE = "tasks.txt";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
})


function addTask(){
    rl.question(chalk.bgMagentaBright("Escribe la tarea: "), (task) => {
        tasks.push({task, completed: false});
        console.log(chalk.greenBright.bold("Tarea agregada exitosamente"));
        saveTasks();
        displayMenu();
        chooseOption();
    })
}

function listTasks(){
    if(tasks.length === 0){
        console.log(chalk.greenBright.bold("No hay tareas por hacer"));
        chooseOption();
    }else{
        console.log(chalk.yellow.bold("Tareas por hacer: "));
        tasks.forEach((task, index) => {
            let status = task.completed ? "✅"  : "❌";
            if(task.completed){
                console.log(chalk.greenBright(`${index + 1}. ${status} - ${task.task}`))
            }else{
                console.log(chalk.redBright(`${index + 1}. ${status} - ${task.task}`))
            }
        })
        chooseOption();
    }
} 

function completeTask(){
    rl.question(chalk.bgMagentaBright("Escribe el numero de la tarea que quieres completar: "), (taskNumber) =>{
        const index = parseInt(taskNumber) - 1;
        if(index >= 0 && index < tasks.length){
            tasks[index].completed = true;
            saveTasks();
            console.log(chalk.greenBright.bold("Tarea completada exitosamente"));
            chooseOption();
        }else{
            console.log(chalk.redBright.bold("Numero de tarea invalida"));
            completeTask();
        }
    }
    )
}

function displayMenu(){
    console.log(chalk.redBright.bold("To Do App")),
    console.log(chalk.blueBright.bold('Menu de opciones:'))
    console.log("1.- Agregar Tarea"),
    console.log("2.- Listar Tareas"),
    console.log("3.- Completar Tarea"),
    console.log("4.- Salir")
}

function loadTasks(){
    try{
        const data = readFileSync(DB_FILE, "utf-8");
        constlines = data.split("\n");
        tasks.length = 0;

        lines.forEach(( line) => {
            if(line.trim()  !== ""){
                const [task, completed] = line.split("|");
                tasks.push({task, completed: completed  === true})
            }
            console.log(chalk.greem.bold("Las tareas han sido cargadas desde la DB"
            ))
        })
    }catch(error){
        console.log(chalk.redBright.bold("Error cargando tareas"));
    }
}

function saveTasks(){
    const data = tasks.map(task => `${task.task}|${task.completed}`).join("\n");
    writeFileSync(DB_FILE, data, "utf-8");
    console.log(chalk.green.bold("Tarea agregada a la DB con exito"))
}

function chooseOption(){
    rl.question("Elige una opcion, digita el numero de la opcion: ", (choice) =>{
        switch(choice){
            case "1":
                addTask();
                break;
            case "2":
                listTasks();
                break;
            case "3":
                completeTask();
                break;
            case "4":
                console.log(chalk.yellow.bold("Salir"));
                rl.close();
                break;
            default:
                console.log(chalk.red.bold("Opcion no valida"));
                chooseOption();    
                break;
        }
    })
}


loadTasks();
displayMenu();
chooseOption();

