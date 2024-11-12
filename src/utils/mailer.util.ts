import { createTransport, Transporter } from 'nodemailer';
import { join } from 'path';
import { renderFile, Data } from 'ejs';
// import { Console } from './logger.util';

export const Mailer = {
	account: null,
	transporter: null as Transporter | null,
	async init(): Promise<void> {
		console.info('Initializing Mailer');
		// const account = await createTestAccount();
		// Console.info(account);
		this.transporter = createTransport({
			auth: {
				pass: process.env.SENDER_EMAIL, // generated ethereal password
				user: process.env.SENDER_PASSWORD, // generated ethereal user
			},
			service: 'gmail',
		});
	},
	async sendMail(type: string, to: string): Promise<void> {
		const options = {
			from: 'TEA App',
			html: await this.genTemplate(`${type}.html`, {}),
			subject: 'Reset Password: TEA App',
			to,
		};
		const info = await this.transporter?.sendMail(options);
		console.info(info);
		return;
	},
	async genTemplate(file: string, data: Data): Promise<string> {
		const templatePath = join(process.cwd(), 'public/templates', file);
		const templateHtml = await renderFile(templatePath, data, {});
		return templateHtml;
	},
};
