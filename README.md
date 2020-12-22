# GoBarber

## Recuperação de palavra-passe
**RF**
- O utilizador deve poder recuperar a sua palavra-passe através do seu email;
- O utilizador deve receber um email com instruções de recuperação de palavra-passe;
- O utilizador deve poder fazer o reset da sua palavra-passe;

**RNF**
- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar o Amazon SES para envios de produção;
- O envio de emails deve acontecer em segundo plano (background job);

**RN**
- O link enviado por email para fazer o reset da palavra-passe deve expirar em 2 horas;
- O utilizador precisa de confirmar a nova palavra-passe ao fazer o reset da mesma



## Atualização de conta
**RF**
- O utilizador deve poder atualizar o seu nome, email e palavra-passe;

**RN**
- O utilizador não pode alterar o seu email para um email já utilizado 
- Para atualizar a sua palavra-passe o utilizador deve inserir a sua palavra-passe atual
- Para atualizar a sua palavra-passe o utilizador deve confirmar a nova palavra-passe 



## Dashboard
**RF**
- o utilizador deve poder listar as suas reservas de um dia específico;
- O prestador deve receber uma notificação sempre que houver uma nova reserva;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**
- As reservas do prestador no dia devem ser armazenadas em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN**
- A notificação deve ter um status de lida ou não lida;



## Agendamento de serviços
**RF**
- O utilizador deve poder listar todos os prestadores de serviço registados;
- O utilizador deve poder visualizar os dias disponíveis de um mês com pelo menos um horário disponível do prestador selecionado;
- O utilizador deve poder listar os horários disponíveis de um dia específico do prestador selecionado;

**RNF**
- A lista de prestadores deve ser guardada em cache;

**RN**
- Cada agendamento deve durar 1 hora;
- As reservas devem estar disponíveis entre as 8:00 e as 18:00 (primeiro 8:00, último 17:00)
- O utilizador não pode agendar um horário já ocupado;
- O utilizador não pode agendar um horário que já passou;
- O utilizador não pode agendar um serviço consigo próprio;
