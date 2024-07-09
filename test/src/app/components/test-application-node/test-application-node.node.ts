import { ApplicationNode } from '@universal-robots/contribution-api';

export interface TestApplicationNodeNode extends ApplicationNode {
  type: string;
  version: string;
}
