import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('process-payment')
  processPayment(@Payload() data: any) {
    console.log('[Payment Service] Payment in process', data);

    this.kafkaClient.emit('payment-succeed', data);
  }
}
