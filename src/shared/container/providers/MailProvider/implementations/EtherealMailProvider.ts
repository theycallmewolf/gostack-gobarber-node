import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {

  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      this.client = transporter;
    })
  }

  public async sendMail({ to, from, subject }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'GoBarber Team',
        address: from?.email || 'no-reply@gobarber.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: 'Recuperação de palavra-passe',
      text: 'test',
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}