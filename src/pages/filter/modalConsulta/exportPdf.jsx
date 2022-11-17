import pdfMake from  'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export default function(catequizandos){
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    console.log("CATEQUIZNANDOSSSS", catequizandos)
    
    const reportTitle = [{
        text: "Relatorio de Catequizandos",
        fontSize:15,
        alignment:'left',
        bold:true,
        margin:[20,15,20,80]
    }]

    const dados = catequizandos.map((cat)=>{
        return [
            {
                text:cat.nome, fontSize:9, margin:[0,2,0,2]
            },
            {
                text:cat.idade, fontSize:9,margin:[0,2,0,2]
            },
            {
                text:cat.data_nascimento,fontSize:9,margin:[0,2,0,2]
            },
            {
                text:cat.telefone_1, fontSize:9,margin:[0,2,0,2]
            },
            {
                text:cat.estado_civil,fontSize:9,margin:[0,2,0,2]
            },
            {
                text:cat.sac_concluidos,fontSize:9,margin:[0,2,0,2]
            },
            {
                text:cat.sac_emProcesso,fontSize:9,margin:[0,2,0,2]
            }
            
        ]

    })
    const details = [{
        table:{
            headerRows:1,
            widths:['*','*','*',100,'*','*','*'],
            body:[
                [  
                {
                    text:"Nome", style:'tableHeader',fontSize:10
                },
                {
                    text:"Idade", style:'tableHeader',fontSize:10
                },
                {
                    text:"Data Nasc", style:'tableHeader',fontSize:10
                },
                {
                    text:"Telefone", style:'tableHeader',fontSize:10
                },
                {
                    text:"Estado Civil", style:'tableHeader',fontSize:10
                },
                {
                    text:"Sac Concluidos", style:'tableHeader',fontSize:10
                },
                {
                    text:"Sacs em Processo", style:'tableHeader',fontSize:10
                }
            ],
            ...dados
            ]

        },
        layout:'headerLineOnly'
    }
]
    const rodape = (currentPage,pageCount)=>{
        return[{
        text: currentPage +"/"+ pageCount,
        alignment:'right',
        fontSize:9,
        margin:[0,10,20,0]
    },
    {
        text: new Date().toLocaleDateString() +" "+ new Date().toLocaleTimeString(),
        alignment:'left',
        fontSize:9,
        margin:[20,-10,0,20] 
    }

]

    }

    const docDefinitions = {
        pageSize:'A4',
        pageMargins:[15,50,15,40],

        header:[reportTitle],
        content:[details],
        footer:rodape
    }

    pdfMake.createPdf(docDefinitions).download()
}