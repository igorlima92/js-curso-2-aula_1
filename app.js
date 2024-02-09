   let listaDeNumerosSorteados = [];
   let limiteNumero = 10;
   let numeroSecreto = gerarNumeroAleatorio();
   let tentativas = 1;


   function exibirTextoNaTela(tag, texto) {
       let campo = document.querySelector(tag);
       campo.innerHTML = texto;
       responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
   }
   
   function exibirMensagemInicial(){
   exibirTextoNaTela('h1', 'Jogo do número secreto');
   exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
   }

   exibirMensagemInicial();
   
   function verificarChute() {
       let chute = document.querySelector('input').value;
        if (chute == numeroSecreto){
            exibirTextoNaTela('h1', 'Acertou! 😎');
            let palavraTentativa = tentativas > 1 ?  'tentativas' : 'tentativa';
            let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
            exibirTextoNaTela('p', mensagemTentativas);
            document.getElementById('reiniciar').removeAttribute('disabled');
        }else{
            if(chute > numeroSecreto){
                exibirTextoNaTela('p', 'O número secreto é menor.');
            }else{
                exibirTextoNaTela('p', 'O número secreto é maior.');
            }
            tentativas++;
            limparCampo()
        }
   }
   
   function gerarNumeroAleatorio() {
       let numeroEscolhido = parseInt(Math.random() * limiteNumero + 1);
       let quantidadeElementosNaLista = listaDeNumerosSorteados.length;

        if (quantidadeElementosNaLista == limiteNumero){
            listaDeNumerosSorteados = [];
        }

       if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
       }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
       }
   }

   /*Função para limpar o campo toda vez que clicar em chutar*/
   function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
   }



/*função para reiniciar o jogo e habilitar o botão 'Novo Jogo' após acertar o palpite*/
   function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas=1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
   }