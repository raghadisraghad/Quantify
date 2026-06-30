import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Eureka } from 'eureka-js-client';

@Injectable()
export class EurekaService implements OnModuleInit, OnModuleDestroy {
  private client!: Eureka;

  onModuleInit() {
    this.client = new Eureka({
      // Application instance configuration
      instance: {
        app: 'notification-service',
        hostName: process.env.HOST_NAME || 'localhost',
        ipAddr: process.env.IP_ADDR || '127.0.0.1',
        port: {
          '$': Number(process.env.PORT),
          '@enabled': true,
        },
        vipAddress: 'notification-service',
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',                // Use 'MyOwn' for local development/non-AWS
        },
      },
      // Eureka Server configuration
      eureka: {
        host: process.env.EUREKA_HOST,
        port: Number(process.env.EUREKA_PORT),
        servicePath: '/eureka/apps/',
      },
    });

    this.client.start((error) => {
      if (error) {
        console.error('Eureka registration failed:', error);
      } else {
        console.log('NestJS service successfully registered with Eureka.');
      }
    });
  }

  onModuleDestroy() {
    this.client.stop((error) => {
      console.log('Eureka client stopped:', error || 'successfully');
    });
  }
}