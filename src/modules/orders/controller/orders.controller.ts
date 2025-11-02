import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDTO } from '../entities/dto/create-order.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
@UsePipes(new ValidationPipe({ transform: true }))
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDTO: CreateOrderDTO) {
    return this.ordersService.create(createOrderDTO);
  }
}
