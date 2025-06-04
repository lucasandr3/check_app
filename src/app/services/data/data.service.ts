import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { Network } from '@capacitor/network';
import {App} from "@capacitor/app";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  syncing$ = new BehaviorSubject<boolean>(false);

  constructor(private storage: Storage, private http: HttpClient) {
    this.init();
    this.listenNetwork();
    this.listenAppResume();
  }

  async init() {
    await this.storage.create();
  }

  async saveLocal(data: any) {
    const list = await this.storage.get('pending') || [];
    list.push(data);
    await this.storage.set('pending', list);
  }

  async getPending() {
    return await this.storage.get('pending') || [];
  }

  async clearPending() {
    await this.storage.set('pending', []);
  }

  async syncWithServer() {
    const pendings = await this.getPending();
    if (pendings.length > 0) {
      this.syncing$.next(true);
      try {
        await this.http.post('https://seu-servidor.com/api/sync', pendings).toPromise();
        await this.clearPending();
        console.log('✅ Dados sincronizados');
      } catch (err) {
        console.error('❌ Falha na sincronização', err);
      } finally {
        this.syncing$.next(false);
      }
    }
  }

  listenNetwork() {
    Network.addListener('networkStatusChange', status => {
      if (status.connected) {
        this.syncWithServer();
      }
    });
  }

  listenAppResume() {
    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        console.log('🔄 App voltou para o primeiro plano. Tentando sincronizar...');
        this.syncWithServer();
      }
    });
  }
}
