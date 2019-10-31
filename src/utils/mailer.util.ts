
import { createTransport } from 'nodemailer';
import { join } from 'path';
import { renderFile, Data } from 'ejs';
import { Console } from './logger.util';
import { environment } from './env.util';

export const Mailer: App.Mailer = {
	account: null,
	transporter: null,
	async init(): Promise<void> {
		Console.info('Initializing Mailer');
		// const account = await createTestAccount();
		// Console.info(account);
		this.transporter = createTransport({
			auth: {
				pass: environment.SENDER_EMAIL, // generated ethereal password
				user: environment.SENDER_PASSWORD, // generated ethereal user
			},
			service: 'gmail',
		});
	},
	async sendMail(type: App.MailType, to: string): Promise<void> {
		const options = {
			from: 'TEA App',
			html: await this.genTemplate(`${type}.html`, {}),
			subject: 'Reset Password: TEA App',
			to,
		};
		const info = await this.transporter.sendMail(options);
		Console.info(info);
		return;
	},
	async genTemplate(file: string, data: Data): Promise<string> {
		const templatePath = join(process.cwd(), 'public/templates', file);
		const templateHtml = await renderFile(templatePath, data, {});
		return templateHtml as string;
	},
};
