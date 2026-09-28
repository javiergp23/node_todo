import {createInterface} from 'readline';
import chalk from 'chalk';


const tasks = [];

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
})

function displayMenu(){
    console.log(chalk.redBright.bold("To Do App")),
    console.log(chalk.blueBright.bold('Menu de opciones:'))
    console.log("1.- Agregar Tarea"),
    console.log("2.- Listar Tareas"),
    console.log("3.- Completar Tarea"),
    console.log("4.- Salir")
}

function chooseOption(){
    rl.question("Elige una opcion, digita el numero de la opcion: ", (choice) =>{
        switch(choice){
            case "1":
                console.log("Crear tarea");
                break;
            case "2":
                console.log("Listar tareas");
                break;
            case "3":
                console.log("Completar tareas");
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

displayMenu();
chooseOption();

