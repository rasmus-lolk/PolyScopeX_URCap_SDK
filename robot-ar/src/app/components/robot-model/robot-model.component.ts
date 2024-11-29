import {Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs";

import * as AFRAME from 'aframe';
import * as THREE from 'three';

@Component({
  selector: 'app-robot-model',
  templateUrl: './robot-model.component.html',
  styleUrl: './robot-model.component.scss',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RobotModelComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  robotModelPath = signal<string>(`${window.location.host}/assets/robot-models/`);
  robotType = toSignal(this.activatedRoute.params.pipe(map((p) => p['robotType'])));

  robotModelUrl = computed(() => `${this.robotModelPath()}${this.robotType()}e_2K.glb`);

  ngOnInit(): void {
    AFRAME.registerComponent('live-robot', {
      init: function () {
        // Wait for model to load.
        this.el.addEventListener('model-loaded', () => {


          const scene = this.el.sceneEl.object3D;

          const root = scene.getObjectByName('root');
          root.position.set(0, 0, 0);

          const robotModel = scene.getObjectByName('z-up');

          const webSocket = new WebSocket(`ws://${window.location.host}/universal-robots/java-backend/java-backend/websocket-api/robot/position`);

          webSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            const jointPositions = data.jointPositions.jointPositions;

            const base = robotModel.getObjectByName('__base');
            base.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), jointPositions[0]);

            const shoulder = robotModel.getObjectByName('__shoulder');
            shoulder.setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), jointPositions[1]);

            const elbow = robotModel.getObjectByName('__elbow');
            elbow.setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), jointPositions[2]);

            const wrist1 = robotModel.getObjectByName('__wrist-1');
            wrist1.setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), jointPositions[3]);
            const wrist2 = robotModel.getObjectByName('__wrist-2');
            wrist2.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), jointPositions[4]);
            const wrist3 = robotModel.getObjectByName('__wrist-3');
            wrist3.setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), jointPositions[5]);
            console.log(jointPositions);

          };



        });
      }
    });
  }
}
