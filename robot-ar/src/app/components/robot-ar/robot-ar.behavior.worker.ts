/// <reference lib="webworker" />
import {
    ApplicationBehaviors,
    OptionalPromise,
    registerApplicationBehavior,
} from '@universal-robots/contribution-api';
import { RobotArNode } from './robot-ar.node';

// factory is required
const createApplicationNode = (): OptionalPromise<RobotArNode> => ({
    type: 'baggi97-robot-ar-robot-ar',    // type is required
    version: '1.0.0'     // version is required
});

const behaviors: ApplicationBehaviors = {
    factory: createApplicationNode,
};

registerApplicationBehavior(behaviors);
