import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user-dto';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(private mailService: MailerService) {}
  @Process('sendMail-job')
  async sendMailJob(job: Job<CreateUserDTO>) {
    const { data } = job;
    await this.mailService.sendMail({
      to: data.email,
      from: 'Teste',
      subject: 'Cadastro de Usuario',
      text: `Bem vindo ${data.name}`,
    });
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log('On Completed', job.name);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log('On Progress', job.name);
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log('On Active ', job.name);
  }
}
export { SendMailConsumer };
