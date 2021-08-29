# Labenu Music Awards
**LAMA**, *Labenu Musical Awards*
## Primeiros Passos

* Clonar este repositório
* Executar `npm install` para adicionar as dependências
* Criar um arquivo .env na raiz do projeto e preencher as chaves a seguir com os valores apropriados:
   ```
   DB_HOST = 
   DB_USER = 
   DB_PASSWORD = 
   DB_SCHEMA = 

   JWT_KEY = 
   ACCESS_TOKEN_EXPIRES_IN =

   BCRYPT_COST = 
   ```

## Documentação dos endpoints no Postman

https://documenter.getpostman.com/view/15825757/TzzHnYuh

# Labenu Music Awards
Como você deve saber muito bem, o nosso querido chefinho Astrodev é uma pessoa com Networking incrível e ele conhece vários artistas estrelados. Além disso, ele também é um grande ~~megalomaníaco~~ visionário e está planejando fazer um grande evento: o **LAMA**, *Labenu Musical Awards*, um festival  com várias bandas famosas para a formatura da sua turma e, no final, vocês podem eleger a banda que mais gostaram! Entretanto, na opinião dele, vocês só serão merecedores se entregarem um sistema impecável que permita o gerenciamento completo desses shows.

Para isso já deixamos algumas tabelas prontas para vocês não precisarem se preocupar com a modelagem do banco. Deixamos também um template do projeto já com a estrutura da parte de usuários. Vocês podem usá-las a vontade, mas, se quiser fazer do zero sem esse auxílio, também pode.

- 1. Cadastro

     Para se cadastrar, é necessário passar um email, um nome e uma senha, e também uma função dentro do sistema. Você pode ser um cliente (usuário normal) ou um administrador do sistema (admin). 

- 2. Login

    Para realizar o login, basta informar seu e-mail e a sua senha. 

- 3. Endpoint de registrar banda

     Para uma banda ser criada, precisamos das informações: nome, gênero musical principal a qual ela se identifica e o nome de um responsável (que pode ser qualquer membro dela). Não podem existir duas bandas com o mesmo nome. **Somente administradores** podem registrar bandas. 

- 4. Endpoint de visualização de detalhes sobre a banda

    Esse endpoint deve receber o id da banda para retornar as informações sobre ela.

- 5. Endpoint de adicionar um show a um dia

    Para cadastrar um show, o endpoint precisa do id da banda, o dia (sexta, sábado ou domingo) e o horário em que ela irá se apresentar. Para o horário ser válido é necessário estar entre 08h e 23h. Além disso os shows só podem ser marcados em horários redondos, ou seja, pode ser 08h - 09h ou 09h - 13h mas não pode ser 09h - 10h30 ou 10h30 - 14h. Não é possível marcar dois shows no mesmo horário de um mesmo dia.

- 6. Endpoint de pegar todos os shows de uma data

    Recebe um dia (sexta, sábado ou domingo) e retorna todos os shows daquela data (ordenados pelo horário), mostrando somente o nome da banda e o gênero musical principal.
