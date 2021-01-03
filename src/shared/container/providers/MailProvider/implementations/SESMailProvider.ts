// import nodemailer, { Transporter } from 'nodemailer/lib/ses-transport';
import { injectable, inject } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class SESMailProvider implements IMailProvider {

  // private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) { }

  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    console.log('works!')
  }
}