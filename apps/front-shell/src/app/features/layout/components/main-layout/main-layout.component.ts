import {
  Component,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { MicroFrontendService } from '../../../../core/services/micro-frontend/micro-frontend.service';

type ActiveScreen = 'query' | 'management';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  @ViewChild('dynamicHost', { read: ViewContainerRef, static: true })
  dynamicHost!: ViewContainerRef;

  private currentComponentRef: ComponentRef<any> | null = null;
  private activeScreen: ActiveScreen = 'query';

  constructor(private microFrontendService: MicroFrontendService) {}

  async ngOnInit(): Promise<void> {
    await this.renderScreen('query');
  }

  async showQuery(): Promise<void> {
    if (this.activeScreen === 'query') return;
    await this.renderScreen('query');
  }

  async showManagement(): Promise<void> {
    if (this.activeScreen === 'management') return;
    await this.renderScreen('management');
  }

  private async renderScreen(screen: ActiveScreen): Promise<void> {
    try {
      this.dynamicHost.clear();

      if (this.currentComponentRef) {
        this.currentComponentRef.destroy();
        this.currentComponentRef = null;
      }

      if (screen === 'query') {
        const queryModule = await this.microFrontendService.loadRemoteComponent(
          4201,
          'mfeClientQuery',
          './ClientListComponent'
        );

        this.currentComponentRef = this.dynamicHost.createComponent(
          queryModule.ClientListComponent
        );
      }

      if (screen === 'management') {
        const managementModule = await this.microFrontendService.loadRemoteComponent(
          4202,
          'mfeClientManagement',
          './ClientManagementPageComponent'
        );

        this.currentComponentRef = this.dynamicHost.createComponent(
          managementModule.ClientManagementPageComponent
        );
      }

      this.currentComponentRef?.changeDetectorRef.detectChanges();
      this.activeScreen = screen;
    } catch (error) {
      console.error('Failed to render remote component', error);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.currentComponentRef?.destroy();
  }
}