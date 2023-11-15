import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result} from '@zxing/library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'qr-reader';
  public cameras: MediaDeviceInfo[] = [];
  public myDevice: MediaDeviceInfo | undefined;
  public scannerEnabled = false;
  public results: string[] = [];

  @ViewChild('scanner')
  scanner!: ZXingScannerComponent;

  ngOnInit() {
    // Puedes iniciar la lógica de inicialización aquí si es necesario
  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]) {
    this.cameras = cameras;
    if (this.cameras.length > 0) {
      this.selectCamera(this.cameras[0].label);
    } else {
      console.warn('No se encontraron cámaras disponibles.');
    }
  }

  scanSuccessHandler(event: string) {
    console.log(event);
    this.results.unshift(event);
  }

  selectCamera(cameraLabel: string) {
    const selectedCamera = this.cameras.find((camera) => camera.label.includes(cameraLabel));

    if (selectedCamera) {
      this.myDevice = selectedCamera;
      console.log(selectedCamera.label);
      this.scannerEnabled = true;
    } else {
      console.warn('No se encontró la cámara seleccionada.');
    }
  }
}











