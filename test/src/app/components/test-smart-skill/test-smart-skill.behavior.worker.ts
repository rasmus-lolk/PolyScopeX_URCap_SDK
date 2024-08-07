import { registerSmartSkillBehavior, ScriptBuilder, SmartSkillBehaviors } from '@universal-robots/contribution-api';

const behaviors: SmartSkillBehaviors = {
    // factory is required
    factory: () => {
        return {
            type: 'test-test-test-smart-skill',
            name: 'Test Smart Skill',
            parameters: {
            },
        };
    },

    // startExecution is required
    startExecution: (instance) => {
        return new ScriptBuilder();
    },

    // stopExecution is optional
    stopExecution: (instance) => {
        return new ScriptBuilder();
    },
};

registerSmartSkillBehavior(behaviors);