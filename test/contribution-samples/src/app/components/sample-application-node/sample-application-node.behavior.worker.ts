/// <reference lib="webworker" />
import {
    ApplicationBehaviors,
    ApplicationNode, OptionalPromise,
    registerApplicationBehavior,
    ScriptBuilder
} from '@universal-robots/contribution-api';
import { SampleApplicationNodeNode } from './sample-application-node.node';

// factory is required
const createApplicationNode = (): OptionalPromise<SampleApplicationNodeNode> => ({
    type: 'universal-robots-contribution-samples-sample-application-node',    // type is required
    version: '1.0.0'     // version is required
});

// generatePreamble is optional
const generatePreambleScriptCode = (node: SampleApplicationNodeNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    return builder;
};

// upgradeNode is optional
const upgradeApplicationNode
  = (loadedNode: ApplicationNode, defaultNode: SampleApplicationNodeNode): SampleApplicationNodeNode =>
      defaultNode;

// downgradeNode is optional
const downgradeApplicationNode
  = (loadedNode: ApplicationNode, defaultNode: SampleApplicationNodeNode): SampleApplicationNodeNode =>
      defaultNode;

const behaviors: ApplicationBehaviors = {
    factory: createApplicationNode,
    generatePreamble: generatePreambleScriptCode,
    upgradeNode: upgradeApplicationNode,
    downgradeNode: downgradeApplicationNode
};

registerApplicationBehavior(behaviors);
