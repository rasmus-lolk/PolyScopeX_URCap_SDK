import { ApplicationNode } from '@universal-robots/contribution-api';

export interface SampleApplicationNodeNode extends ApplicationNode {
  type: string;
  version: string;
}
