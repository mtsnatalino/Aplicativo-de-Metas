const { select, input, checkbox } = require('@inquirer/prompts')


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

async function listarMetas() {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    });

    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada");
        return;
    }

    metas.forEach((m) =>{
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        });
        
        meta.checked = true
    });

    console.log("METAS CONCULUIDAS")
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
                await listarMetas()
                break
            case "sair":
                console.log("Até a proxima")
                return
        }
            
    }
}

start(); 