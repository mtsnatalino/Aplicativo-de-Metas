const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = "Bem vindo ao App de Metas"

let meta = {value: "Tomar 3L de agua por dia", checked: false}

let metas = [meta]

async function cadastrarMeta(){
    const meta = await input({message: "Digite a meta:"})

    if (meta.length == 0) {
        mensagem = "A meta nao pode ser vazia."
        return
    }
    
    metas.push({value:meta, checked:false})

    mensagem = "Meta cadastrada com sucesso"

}

async function listarMetas() {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    });

    metas.forEach((m) =>{
        m.checked = false
    })

    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada");
        return;
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        });
        
        meta.checked = true
    });

    mensagem = "Metas Concluídas!" 
}

async function metasRealizadas(){
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        mensagem ="Nao existem metas realizadas! :("
        return 
    }

    await select({
       message: "Metas realizadas: " + "(" + realizadas.length + ")",
       choices: [...realizadas]

    })
}

async function metasAbertas(){
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0) {
        mensagem = "Não existe metas abertas :)"
        return
    }

    await select({
        message: "Metas abertas: " + "(" + abertas.length + ")",
        choices: [...abertas]
    })
}

async function deletarMetas(){
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const itensADeletar = await checkbox({
        message: "Selecione um item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if (itensADeletar.length == 0) {
        mensagem = "Nenhum item para deletar"
        return
    }

    itensADeletar.forEach((item) =>{
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"
}

function mostrarMensagem() {
    console.clear()

    if (mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

async function start() {
       
    while(true){
        mostrarMensagem()

        const opcao = await select({
            message: "---------Menu---------",
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
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
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
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até a proxima")
                return
        }
            
    }
}

start(); 