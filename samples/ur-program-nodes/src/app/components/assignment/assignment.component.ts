import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnChanges,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  isWaypoint,
  MoveScreenOptions,
  TabInputModel,
  URVariable,
  VariableValueType, WaypointType,
} from '@universal-robots/contribution-api';
import { DropdownOption, InputValidator, SelectedInput, TabInputValue } from '@universal-robots/ui-models';
import { CommonProgramPresenterComponent } from '../common-program-presenter.component';
import { getVariableNameValidator } from '../validator-helper';
import {SampleAssignmentNode} from "./assignment.node";

@Component({
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentComponent extends CommonProgramPresenterComponent<SampleAssignmentNode> implements OnChanges {
  protected readonly translateService = inject(TranslateService);
  protected readonly cd = inject(ChangeDetectorRef);

  PositionType = WaypointType;

  variables: WritableSignal<Array<URVariable>> = signal([]);
  filteredVariables: WritableSignal<Array<URVariable>> = signal([]);
  variableOptions: WritableSignal<Array<DropdownOption>> = signal([]);
  selectedVariableOption = signal<DropdownOption | undefined>(undefined);
  selectedWaypointSource = signal<(DropdownOption & { value: WaypointType }) | undefined>(undefined);
  tabInputValue = signal<TabInputValue | undefined>(undefined);
  isTabInput: WritableSignal<boolean> = signal(false);
  isValid: WritableSignal<boolean> = signal(false);

  wayPointSources: DropdownOption[] = this.getWaypointSources();
  expressionValidators: Array<InputValidator> = [];
  variableNameValidator: InputValidator;
  variableDropdown = signal<{ label: string; icon: string }>({
    label: this.translateService.instant('presenter.assignment.variable_dropdown.new'),
    icon: 'pencil',
  });

  variableTypes = Object.values(VariableValueType)
    .filter((val) => val !== VariableValueType.FRAME)
    .sort((a, b) => a.localeCompare(b));

  popoverTranslations = {
    popoverHeader: '',
    createNewOption: '',
    placeholderText: '',
    createInputLabel: '',
  };

  private async fetchVariables() {
    this.variables.set(
      (await this.presenterAPI.symbolService.getVariables())
        .filter((variable) => variable.valueType !== VariableValueType.FRAME)
        .sort((a, b) => a.name.localeCompare(b.name)),
    );
    this.variableOptions.set(
      await Promise.all(
        this.variables().map(async (variable) => {
          const isValidVariable = await this.presenterAPI.symbolService.isRegisteredVariableName(variable.name);
          return {
            label: variable.name,
            value: variable.name,
            invalid: variable.suppressed || !isValidVariable,
          };
        }),
      ),
    );
    this.filteredVariables.set(
      this.variables().filter((variable) => {
        return variable.valueType !== VariableValueType.FRAME &&
        variable.name !== this.contributedNode.parameters.variable.entity.name
          ? variable
          : '';
      }),
    );
  }

  capitalizedLabel(label: string) {
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  async ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (changes.presenterAPI) {
      await this.fetchVariables();
    }
  }

  onSetRobotSettings() {
    super.onSetRobotSettings();
    this.setPopoverTranslations();
    this.setValidators();
    this.wayPointSources = this.getWaypointSources();
  }

  async onSetContributedNode() {
    super.onSetContributedNode();

    // Set UI validation state:
    const tabInputModel = this.contributedNode.parameters.variable;
    let isSuppressed = false;
    if (tabInputModel.selectedType !== SelectedInput.VALUE) {
      isSuppressed = await this.presenterAPI.symbolService.isSuppressed(tabInputModel.entity.name);
    }
    if (isSuppressed || String(tabInputModel.value).length === 0) {
      this.isValid.set(false);
    } else {
      this.isValid.set(true);
    }

    // non-tabInput types validation:
    this.setValidators();

    // get latest variables list:
    await this.fetchVariables();

    await this.setSelectedVariable();

    const waypointType = this.contributedNode.parameters.waypointType;
    const label = this.wayPointSources.find((source) => source.value === waypointType)?.label;
    if (label) this.selectedWaypointSource.set({ value: waypointType, label });

    const { value, selectedType } = tabInputModel;
    this.tabInputValue.set({ value, selectedType });

    this.cd.detectChanges();
  }

  private async setSelectedVariable() {
    const variable = this.contributedNode.parameters.variable.entity;
    const invalid =
      (await this.presenterAPI.symbolService.isSuppressed(variable.name)) ||
      !(await this.presenterAPI.symbolService.isRegisteredVariableName(variable.name));
    this.selectedVariableOption.set({
      label: variable.name,
      value: variable.name,
      invalid,
    });
  }

  setPopoverTranslations() {
    this.popoverTranslations.popoverHeader = this.translateService.instant('presenter.assignment.label.pick_variable');
    this.popoverTranslations.placeholderText = this.translateService.instant('presenter.assignment.label.pick_variable_placeholder');
    this.popoverTranslations.createNewOption = this.translateService.instant('presenter.assignment.label.create_new_option');
    this.popoverTranslations.createInputLabel = this.translateService.instant('presenter.assignment.label.name');
  }

  setValidators() {
    this.expressionValidators = [
      (input: string) => {
        if (this.contributedNode.parameters.waypointType === WaypointType.Expression && input.length === 0) {
          return this.translateService.instant('presenter.assignment.empty_expression_error');
        }
        return null;
      },
      (input: string) => {
        if (!input) {
          return this.translateService.instant('presenter.assignment.empty_expression_error');
        }
        return null;
      },
    ];

    this.variableNameValidator = getVariableNameValidator.bind(this)();
  }

  async setNewVariable(varName: string) {
    this.contributedNode.parameters.variable.entity = await this.presenterAPI.symbolService.generateVariable(
      varName,
      this.contributedNode.parameters.variable.entity.valueType ?? VariableValueType.STRING,
    );
    this.saveNode();
  }

  variableDropdownOpen() {
    this.variableDropdown.set(
      this.contributedNode.parameters.variable.entity.reference
        ? { label: this.translateService.instant('presenter.assignment.variable_dropdown.new'), icon: 'plus' }
        : { label: this.translateService.instant('presenter.assignment.variable_dropdown.rename'), icon: 'pencil' },
    );
  }

  async selectVariable(selectedVariableOption: unknown) {
    const selectedVariable = selectedVariableOption as DropdownOption;

    if (selectedVariable.label === this.contributedNode.parameters.variable.entity.name) {
      return;
    }
    const variable = this.variables().find((variable) => variable.name === selectedVariable.label);
    if (!variable) {
        return;
    }
    this.contributedNode.parameters.variable.entity = { ...structuredClone(variable), reference: true } as URVariable;

    if (variable.valueType === VariableValueType.WAYPOINT) {
      this.contributedNode.parameters.waypointType = WaypointType.Teach;
    }
    this.saveNode();
  }

  setTabInputValue($event: TabInputValue) {
    this.contributedNode.parameters.variable.selectedType = $event.selectedType;
    this.contributedNode.parameters.variable.value = String($event.value);
    this.saveNode();
  }

  getWaypointSources() {
    return [
      {
        label: this.translateService.instant('presenter.assignment.label.teach'),
        value: WaypointType.Teach,
      },
      {
        label: this.translateService.instant('presenter.assignment.label.expression'),
        value: WaypointType.Expression,
      },
    ];
  }

  setType($event: unknown) {
    const value = $event as string;
    const valueType: VariableValueType = VariableValueType[value.toUpperCase()];
    let newValue: string | number = '';

    const variable = this.contributedNode.parameters.variable;

    if (valueType === 'waypoint') {
      this.contributedNode.parameters.waypointType = WaypointType.Teach;
    }
    if (valueType === 'float' || valueType === 'integer') {
      newValue = 0;
    }
    this.contributedNode.parameters.variable = new TabInputModel<URVariable>(
      { ...variable.entity, valueType },
      SelectedInput.VALUE,
      newValue,
    );

    this.saveNode();
    this.cd.detectChanges();
  }

  public async openMoveScreen() {
    window.parent.performance.mark('setWaypointStart');
    const waypoint = this.contributedNode.parameters.waypoint;
    const options: MoveScreenOptions = {
      moveScreenTarget: 'waypoint',
      moveScreenTargetLabel: this.contributedNode.parameters.variable.entity.name,
      frame: this.contributedNode.parameters.waypoint?.frame,
      tcp: this.contributedNode.parameters.waypoint?.tcp,
    };
    if (isWaypoint(waypoint)) {
        options.position = waypoint;
    }

    const newWaypoint = await this.presenterAPI.robotMoveService.openMoveScreen(options);
    if (isWaypoint(newWaypoint)) {
      this.contributedNode.parameters.waypoint = newWaypoint;
      this.saveNode();
    }
  }

  public setWaypointSource($event: unknown) {
    const option = $event as DropdownOption & { value: WaypointType };
    this.contributedNode.parameters.waypointType = option.value;
    this.saveNode();
  }
}
