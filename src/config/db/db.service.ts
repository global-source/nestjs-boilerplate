import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DBConfigService {
  constructor(private dbservice: ConfigService) {}

  get host(): string {
    return this.dbservice.get<string>('postgres.host');
  }

  get port(): number {
    return Number(this.dbservice.get<string>('postgres.port'));
  }

  get user(): string {
    return this.dbservice.get<string>('postgres.user');
  }

  get password(): string {
    return this.dbservice.get<string>('postgres.password');
  }

  get name(): string {
    return this.dbservice.get<string>('postgres.name');
  }

  get replicaHost(): string {
    return this.dbservice.get<string>('postgres.replica_host');
  }

  get replicaPort(): string {
    return this.dbservice.get<string>('postgres.replica_port');
  }

  get replicaUser(): string {
    return this.dbservice.get<string>('postgres.replica_user');
  }

  get replicaPassword(): string {
    return this.dbservice.get<string>('postgres.replica_password');
  }

  get replicaName(): string {
    return this.dbservice.get<string>('postgres.replica_name');
  }
}
