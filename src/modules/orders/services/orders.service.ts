import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from '../entities/dto/create-order.dto';
import { OrderStatus } from '../entities/enum/order.status.enum';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDTO: CreateOrderDTO): Promise<Order> {
    const newOrder = this.orderRepository.create(createOrderDTO);

    await new Promise((resolve) => setTimeout(resolve, 500));

    newOrder.status = OrderStatus.PENDING;

    return this.orderRepository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: string): Promise<Order | null> {
    return this.orderRepository.findOneBy({ id });
  }
}
