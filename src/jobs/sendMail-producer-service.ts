import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common/decorators/core';
import { Queue } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user-dto';

@Injectable()
class SendMailProducerService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) {}
  async sendMail(createUserDTO: CreateUserDTO) {
    await this.queue.add('sendMail-job', createUserDTO, {
      delay: 5000,
      attempts: 2,
    });
  }
}
export { SendMailProducerService };
