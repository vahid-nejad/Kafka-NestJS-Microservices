import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order-created')
  sendOrderCreatedNotification(@Payload() data: any) {
    console.log('[Notification Service]  Sending Order Created Email', data);
  }

  @MessagePattern('payment-succeed')
  SendPaymentSucceedNotification(@Payload() data: any) {
    console.log('[Notification Service] Sending Payment Succeed Email', data);
  }
}
