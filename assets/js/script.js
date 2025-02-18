// Seleciona a Seção about
const sobre = document.querySelector("#about");

// Seleciona o Formulário
const formulario = document.querySelector("#formulario");

// Expressão Regular para validar o e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Função para consumir os dados do Github
async function getApiGithub(){
    try {
        // Envia a Requisição HTTP
        const dadosPerfil = await fetch(`https://api.github.com/users/eduarda-galeno`);
        
        // Converte a resposta para o formato JSON
        const perfil = await dadosPerfil.json();

        // Cria o conteúdo da Seção About com os dados da resposta da Requisição
        let conteudo = `
            <!-- Imagem da Seção Sobre -->
            <img src="${perfil.avatar_url}" alt="Foto do Perfil do Github - ${perfil.name}">

            <!-- Texto da Seção Sobre -->
            <article id="about_texto">
                <h2>Sobre mim</h2>
                <p>Sou Desenvolvedora Full Stack, formada em Sistemas de Informação, com inglês avançado e experiência em suporte a ERP. Participei de projetos práticos, aplicando tecnologias como HTML5, CSS3, Tailwind CSS, ReactJS, TypeScript e Node.js para desenvolver soluções eficientes e bem estruturadas. Conheça meus projetos:</p>

                <!-- Detalhes do Github -->
                <div id="about_github" class="flex sobre_github">
                    <a href="${perfil.html_url}" target="_blank" class="botao">
                        Github
                    </a>
                    <p>${perfil.followers} Seguidores</p>
                    <p>${perfil.public_repos} Repositórios</p>
                </div>
            </article>
        `;

        // Substitui todo o conteúdo existente da Seção About
        sobre.innerHTML = conteudo;

    } catch (error) {
        console.error(error);
    }
}

// Validação do Formulário antes do envio
formulario.addEventListener("submit", function(event){
    
    // Impede que o formulário seja enviado antes da validação
    event.preventDefault();

    // Seleciona os elementos do campo nome (input e span)
    const campoNome = document.querySelector("#nome");
    const txtNome = document.querySelector("#txtNome");

    // Verifica se o campo possui menos de 3 caracteres
    if(campoNome.value.length < 3){
        txtNome.innerHTML = "O Nome deve ter no mínimo 3 caracteres.";
        campoNome.focus();
        return;
    } else {
        txtNome.innerHTML = "" ;
    }

    // Seleciona os elementos do campo email (input e span)
    const campoEmail = document.querySelector("#email");
    const txtEmail = document.querySelector("#txtEmail");

    // Valida através da Expressão Regular se o usuário digitou um e-mail válido
    if(!campoEmail.value.match(emailRegex)){
        txtEmail.innerHTML = "Digite um e-mail válido.";
        campoEmail.focus();
        return;
    } else {
        txtEmail.innerHTML = "" ;
    }

    // Seleciona os elementos do campo assunto (input e span)
    const campoAssunto = document.querySelector("#assunto");
    const txtAssunto = document.querySelector("#txtAssunto");

    // Verifica se o campo possui pelo menos 5 caracteres
    if(campoAssunto.value.length < 5){
        txtAssunto.innerHTML = "O assunto deve ter no mínimo 5 caracteres.";
        campoAssunto.focus();
        return;
    } else {
        txtAssunto.innerHTML = "" ;
    }

    // Envia o formulário caso os 3 campos sejam validados
    formulario.submit();
});

// Executa a função ao carregar o script, gerando a Seção About
getApiGithub();
