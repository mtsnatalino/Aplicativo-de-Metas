const { select, input } = require('@inquirer/prompts')


let meta = {value: "Tomar 3L de agua por dia", checked: false}

let metas = [meta]

async function cadastrarMeta(){
    const meta = await input({message: "Digite a meta:"})

    if (meta.length == 0) {
        console.log("A meta nao pode ser vazia.")
        return
    }
    
    metas.push({value:meta, checked:false})

}

async function start() {
       
    while(true){
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })
        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                console.log("vamos listar")
                break
            case "sair":
                console.log("Até a proxima")
                return
        }
            
    }
}

start(); 